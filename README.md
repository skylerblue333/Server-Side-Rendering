# Sky SSR Core

A small server-side rendering boundary for the SKYCOIN4444 engineering portfolio.

## Status

**Engineering beta.** The repository contains a real TypeScript renderer and Node.js HTTP service, with deterministic tests and container verification. It is intentionally narrow rather than claiming a full web framework.

## What it does

- renders bounded page models to complete HTML documents on the server;
- escapes active HTML characters in dynamic title, heading, body, and request identifiers;
- serves a server-rendered home page at `GET /`;
- exposes `GET /healthz` for liveness checks;
- emits CSP, clickjacking, MIME-sniffing, and referrer-policy headers;
- propagates or creates a bounded request ID;
- runs without runtime npm dependencies.

## Local use

```bash
npm install --ignore-scripts
npm test
npm start
curl -i http://127.0.0.1:3000/
curl -i http://127.0.0.1:3000/healthz
```

Set `PORT` to an integer from 1 through 65535 to change the listener port.

## API boundary

This product renders fixed application-owned templates. It does **not** accept executable templates, arbitrary JavaScript, filesystem paths, remote URLs, or shell commands from callers.

The exported `renderPage()` function accepts a page title, heading, body, and optional request ID. Fields are length-bounded and escaped before interpolation.

## Verification

CI uses Node 22 to compile strict TypeScript, execute the Node test suite, audit production dependencies, smoke-test the HTTP service, build the container, and verify the final image runs as a non-root user.

## Security and product boundaries

Sky SSR Core is not a replacement for Next.js, Nuxt, Remix, a CDN, a reverse proxy, authentication, authorization, WAF, distributed caching, HTML sanitization for intentionally allowed markup, or a production deployment platform. It renders plain escaped text into an application-owned template.

There is no production deployment, HA, TLS termination, persistence, tenant isolation, session management, or dynamic template engine in this repository. See `SECURITY.md` for the supported threat boundary.

## SKYCOIN4444 integration

The renderer can serve small server-generated surfaces or act as a reference boundary for larger SKYCOIN4444 web services. Integrations should place an authenticated application/reverse proxy in front when protected content is involved and should retain output escaping for all untrusted text.

## License

See `LICENSE`.
