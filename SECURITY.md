# Security Policy

## Supported scope

Sky SSR Core is an engineering-beta, application-owned HTML renderer. Security fixes are accepted for the current `main` line and active productization branch.

## Threat boundary

The renderer treats page text and request IDs as untrusted text. It length-bounds those values and HTML-escapes them before interpolation. The HTTP service also sends a restrictive Content-Security-Policy plus common browser hardening headers.

The service does not execute caller-provided templates, JavaScript, shell commands, filesystem paths, or remote URLs. It has no database, credentials, session state, authentication, or authorization subsystem.

Do not expose sensitive application data through this service without a separately reviewed authentication/authorization boundary. TLS, rate limiting, DDoS controls, access logging, reverse-proxy configuration, and deployment isolation are responsibilities of the deployment environment.

## Reporting

Report security issues privately through GitHub's supported security-reporting mechanism when available. Do not include production secrets, personal data, or exploit traffic in public issues.
