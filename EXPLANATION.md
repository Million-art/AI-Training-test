
What was the bug?

When oauth2Token was a plain object (e.g. from JSON) instead of an OAuth2Token instance, API requests were sent without an Authorization header.

Why did it happen?

The code only refreshed when !this.oauth2Token or when (this.oauth2Token instanceof OAuth2Token && this.oauth2Token.expired). A plain object is truthy and not an OAuth2Token instance, so neither condition ran no refresh. The header was set only when instanceof OAuth2Token, so plain objects never got a header. This commonly happens when the token is stored in a database, Redis, or localStorage, or received from an API, JSON does not preserve class information.

Why does My  fix solve it?

We now refresh when the token is missing, not an OAuth2Token instance, or expired. Any plain object triggers a refresh. the new instance is then used for the header.

One realistic case my  tests still don't cover

Reusing the same opts.headers object across multiple request() calls. The tests do not check that the caller's object is left unchanged (i.e. that we do not mutate opts.headers).
