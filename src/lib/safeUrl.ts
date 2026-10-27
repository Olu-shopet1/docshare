const ALLOWED_PROTOCOLS = ['http:', 'https:'];

// Returns a normalized URL if it is an absolute http(s) link, otherwise null.
// Blocks javascript:, data:, vbscript: and other schemes that can run code.
export function getSafeUrl(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url.trim());
    return ALLOWED_PROTOCOLS.includes(parsed.protocol) ? parsed.href : null;
  } catch {
    return null;
  }
}

export function openSafeUrl(url: string | undefined) {
  const safeUrl = getSafeUrl(url);
  if (safeUrl) {
    window.open(safeUrl, '_blank', 'noopener,noreferrer');
  }
}
