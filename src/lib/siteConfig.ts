import baseConfig from "@/config/config.json";
import baseSocial from "@/config/social.json";

type SocialLink = {
  name: string;
  icon: string;
  link: string;
};

function getEnvString(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function withFallback(value: string | undefined, fallback: string) {
  return getEnvString(value) || fallback;
}

const env = import.meta.env;

const envSiteName = getEnvString(env.PUBLIC_SITE_NAME);
const envSiteUrl = getEnvString(env.PUBLIC_SITE_URL);
const envNavButtonLabel = getEnvString(env.PUBLIC_NAV_BUTTON_LABEL);
const envNavButtonLink = getEnvString(env.PUBLIC_NAV_BUTTON_LINK);

export const siteConfig = {
  ...baseConfig,
  site: {
    ...baseConfig.site,
    title: withFallback(envSiteName, baseConfig.site.title),
    base_url: withFallback(envSiteUrl, baseConfig.site.base_url),
    favicon: withFallback(env.PUBLIC_SITE_FAVICON, baseConfig.site.favicon),
    logo: withFallback(env.PUBLIC_SITE_LOGO, baseConfig.site.logo),
    logo_darkmode: withFallback(
      env.PUBLIC_SITE_LOGO_DARKMODE,
      baseConfig.site.logo_darkmode,
    ),
    logo_text: withFallback(
      env.PUBLIC_SITE_LOGO_TEXT || envSiteName,
      baseConfig.site.logo_text,
    ),
  },
  params: {
    ...baseConfig.params,
    contact_form_action: withFallback(
      env.PUBLIC_CONTACT_FORM_ACTION,
      baseConfig.params.contact_form_action,
    ),
    copyright: withFallback(
      env.PUBLIC_COPYRIGHT,
      baseConfig.params.copyright,
    ),
  },
  navigation_button: {
    ...baseConfig.navigation_button,
    label: withFallback(
      envNavButtonLabel,
      baseConfig.navigation_button.label,
    ),
    link: withFallback(envNavButtonLink, baseConfig.navigation_button.link),
    enable:
      (Boolean(envNavButtonLabel) && Boolean(envNavButtonLink)) ||
      baseConfig.navigation_button.enable,
  },
  metadata: {
    ...baseConfig.metadata,
    meta_author: withFallback(
      env.PUBLIC_SITE_AUTHOR,
      baseConfig.metadata.meta_author,
    ),
    meta_image: withFallback(
      env.PUBLIC_DEFAULT_OG_IMAGE,
      baseConfig.metadata.meta_image,
    ),
    meta_description: withFallback(
      env.PUBLIC_SITE_DESCRIPTION,
      baseConfig.metadata.meta_description,
    ),
  },
};

const socialEnvByName: Record<string, string | undefined> = {
  facebook: getEnvString(env.PUBLIC_SOCIAL_FACEBOOK_URL),
  x: getEnvString(env.PUBLIC_SOCIAL_X_URL),
  github: getEnvString(env.PUBLIC_SOCIAL_GITHUB_URL),
  linkedin: getEnvString(env.PUBLIC_SOCIAL_LINKEDIN_URL),
};

export const socialConfig = {
  main: baseSocial.main.map((item) => {
    const social = item as SocialLink;
    return {
      ...social,
      link: socialEnvByName[social.name] || social.link,
    };
  }),
};
