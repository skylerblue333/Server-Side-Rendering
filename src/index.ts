export type PageModel = {
  title: string;
  heading: string;
  body: string;
  requestId?: string;
};

const MAX_TEXT = 8_192;
const MAX_REQUEST_ID = 128;

function bounded(value: string, field: string, max = MAX_TEXT): string {
  const trimmed = value.trim();
  if (trimmed.length === 0 || trimmed.length > max) {
    throw new RangeError(`${field} must contain 1-${max} characters`);
  }
  return trimmed;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function renderPage(input: PageModel): string {
  const title = escapeHtml(bounded(input.title, 'title', 200));
  const heading = escapeHtml(bounded(input.heading, 'heading', 300));
  const body = escapeHtml(bounded(input.body, 'body'));
  const requestId = input.requestId
    ? escapeHtml(bounded(input.requestId, 'requestId', MAX_REQUEST_ID))
    : 'not-provided';

  return `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>${title}</title>\n</head>\n<body>\n<main>\n<h1>${heading}</h1>\n<p>${body}</p>\n</main>\n<footer data-request-id="${requestId}">Rendered by Sky SSR Core</footer>\n</body>\n</html>\n`;
}

export function homePage(requestId?: string): string {
  return renderPage({
    title: 'Sky SSR Core',
    heading: 'Server-rendered HTML, without a browser runtime',
    body: 'A small deterministic rendering boundary for SKYCOIN4444 engineering services.',
    ...(requestId ? { requestId } : {}),
  });
}
