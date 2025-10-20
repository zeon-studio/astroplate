ARG INSTALLER=yarn

FROM node:22.20.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
ARG INSTALLER

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ "${INSTALLER}" == "yarn" ]; then yarn --frozen-lockfile; \
  elif [ "${INSTALLER}" == "npm" ]; then npm ci; \
  elif [ "${INSTALLER}" == "pnpm" ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Valid installer not set." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# RUN chmod u+x ./installer && ./installer
ARG INSTALLER
RUN \
  if [ "${INSTALLER}" == "yarn" ]; then yarn build; \
  elif [ "${INSTALLER}" == "npm" ]; then npm run build; \
  elif [ "${INSTALLER}" == "pnpm" ]; then pnpm run build; \
  else echo "Valid installer not set." && exit 1; \
  fi

# Production image, copy all the files and run nginx
FROM nginx:alpine AS runner
COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
