function decodeXml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, 16))
    )
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCodePoint(parseInt(code, 10))
    )
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function getTagValue(xml, tagNames) {
  for (const tagName of tagNames) {
    const tagPattern = new RegExp(
      `<(?:[\\w.-]+:)?${tagName}\\b[^>]*>([\\s\\S]*?)<\\/(?:[\\w.-]+:)?${tagName}\\s*>`,
      'i'
    );
    const match = xml.match(tagPattern);

    if (match) {
      return decodeXml(match[1]).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    }
  }

  return '';
}

function getLink(item) {
  const link = getTagValue(item, ['link']);

  if (link) {
    return link;
  }

  const atomLink = item.match(
    /<(?:[\w.-]+:)?link\b[^>]*href=["']([^"']+)["'][^>]*\/?>/i
  );
  return atomLink ? decodeXml(atomLink[1]).trim() : '';
}

function getImage(item, fallback) {
  const match = item.match(
    /<(?:[\w.-]+:)?(?:content|thumbnail|enclosure)\b[^>]*url=["']([^"']+)["']/i
  );
  return match ? decodeXml(match[1]).trim() : fallback;
}

function createArticleId(feedId, url) {
  let hash = 0;

  for (let index = 0; index < url.length; index += 1) {
    hash = (hash * 31 + url.charCodeAt(index)) | 0;
  }

  return `rss-${feedId}-${Math.abs(hash)}`;
}

function formatDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? 'Fonte RSS'
    : date.toLocaleDateString('pt-BR');
}

function limitSummary(summary) {
  if (summary.length <= 280) {
    return summary;
  }

  return `${summary.slice(0, 277).trimEnd()}...`;
}

export function parseRssFeed(xml, feed) {
  const items = [...xml.matchAll(/<(item|entry)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi)];

  return items
    .map(([, , item]) => {
      const title = getTagValue(item, ['title']);
      const url = getLink(item);
      const summary = limitSummary(
        getTagValue(item, [
          'description',
          'summary',
          'content:encoded',
          'content',
        ]) || `Leia a notícia original em ${feed.name}.`
      );

      if (!title || !url) {
        return null;
      }

      return {
        id: createArticleId(feed.id, url),
        sourceId: feed.id,
        source: feed.name,
        category: feed.category,
        time: formatDate(
          getTagValue(item, ['pubDate', 'published', 'updated', 'date'])
        ),
        author: feed.name,
        title,
        image: getImage(item, feed.image),
        summary,
        body: [],
        url,
      };
    })
    .filter(Boolean);
}
