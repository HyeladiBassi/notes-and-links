import helmet from "helmet";

export const cspDirectives = {
  "default-src":
    helmet.contentSecurityPolicy.getDefaultDirectives()["default-src"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "https://embeddable-sandbox.cdn.apollographql.com",
  ],
  "manifest-src": [
    "'self'",
    "https://apollo-server-landing-page.cdn.apollographql.com",
  ],
  "img-src": [
    "'self'",
    "data:",
    "https://apollo-server-landing-page.cdn.apollographql.com",
  ],
  "frame-src": ["'self'", "https://sandbox.embed.apollographql.com"],
};
