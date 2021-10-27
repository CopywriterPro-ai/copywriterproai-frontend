import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN =
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_APP_SENTRY_DNS;

Sentry.init({
  dsn: SENTRY_DSN,
});
