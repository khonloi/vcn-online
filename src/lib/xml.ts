/**
 * Utilities for escaping and sanitizing XML content in feeds and sitemaps.
 */

/**
 * Escapes special XML characters (<, >, &, ', ") to their safe entity equivalents.
 */
export function escapeXml(unsafe?: string | null): string {
  if (!unsafe) return '';
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });
}

/**
 * Safely wraps text in CDATA, neutralizing any closing ]]> occurrences.
 */
export function wrapCdata(text?: string | null): string {
  if (!text) return '<![CDATA[]]>';
  const sanitized = text.replace(/]]>/g, ']]&gt;');
  return `<![CDATA[${sanitized}]]>`;
}
