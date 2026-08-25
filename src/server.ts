import { createServer, type IncomingMessage, type ServerResponse } from 'node:http';
import { randomUUID } from 'node:crypto';
import { homePage } from './index.js';

const port = Number.parseInt(process.env.PORT ?? '3000', 10);
if (!Number.isInteger(port) || port < 1 || port > 65_535) {
  throw new Error('PORT must be an integer between 1 and 65535');
}

function securityHeaders(response: ServerResponse): void {
  response.setHeader('x-content-type-options', 'nosniff');
  response.setHeader('x-frame-options', 'DENY');
  response.setHeader('referrer-policy', 'no-referrer');
  response.setHeader(
    'content-security-policy',
    "default-src 'none'; style-src 'none'; img-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'",
  );
}

export function handleRequest(request: IncomingMessage, response: ServerResponse): void {
  const requestId = request.headers['x-request-id']?.toString().slice(0, 128) || randomUUID();
  response.setHeader('x-request-id', requestId);
  securityHeaders(response);

  if (request.method === 'GET' && request.url === '/healthz') {
    response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ status: 'ok', service: 'sky-ssr-core' }));
    return;
  }

  if (request.method === 'GET' && request.url === '/') {
    response.writeHead(200, {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
    });
    response.end(homePage(requestId));
    return;
  }

  response.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify({ error: 'not_found', requestId }));
}

const server = createServer(handleRequest);
server.listen(port, '0.0.0.0', () => {
  console.log(JSON.stringify({ event: 'listening', port, service: 'sky-ssr-core' }));
});
