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

ARG INSTALLER
RUN \
  if [ "${INSTALLER}" == "yarn" ]; then yarn build; \
  elif [ "${INSTALLER}" == "npm" ]; then npm run build; \
  elif [ "${INSTALLER}" == "pnpm" ]; then pnpm run build; \
  else echo "Valid installer not set." && exit 1; \
  fi

# Production image - use Node.js runtime (not nginx!)
# EmDash requires server-side processing for admin panel, API, and database
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4321

# Copy built application
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create directories for persistent data
RUN mkdir -p /app/data /app/uploads

# Expose the port Astro runs on
EXPOSE 4321

# Start the Node.js server
# Uses the standalone output from @astrojs/node adapter
CMD ["node", "./dist/server/entry.mjs"]
