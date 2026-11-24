
import { XMLParser } from 'fast-xml-parser';
import { formatDateTime } from '../utils/date';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  trimValues: true,
});

function getText(value) {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (value && typeof value === 'object') {
    return value['#text'] ?? '';
  }
  return '';
}

function getImage(item, fallback) {
  const mediaSources = [
    item.enclosure,
    item['media:content'],
    item['media:thumbnail'],
  ];

  for (const source of mediaSources) {
    const media = Array.isArray(source) ? source[0] : source;
    const url = media?.['@_url'] ?? media?.url;

    if (url) {
      return getText(url);
    }
  }

  const htmlContent = [
    item['content:encoded'],
    item.description,
    item.summary,
  ]
    .map(getText)
    .find((content) => content.includes('<img'));
  const imageMatch = htmlContent?.match(
    /<img\b[^>]*\bsrc=["']([^"']+)["']/i
  );

  return imageMatch?.[1]?.replace(/&amp;/g, '&') ?? fallback ?? null;
}

export async function fetchRssFeed(feed) {
  const response = await fetch(feed.url);

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status}`);
  }

  const xml = await response.text();
  const data = parser.parse(xml);

  const channel = data.rss?.channel ?? data.feed;

  if (!channel) {
    throw new Error('Formato RSS/Atom não reconhecido');
  }

  let items = channel.item ?? channel.entry ?? [];

  if (!Array.isArray(items)) {
    items = [items];
  }

  return items.map((item, index) => {
    const rawLink = item.link;
    const pubDate = getText(item.pubDate ?? item.published ?? item.updated);

    const link = typeof rawLink === 'string'
      ? rawLink
      : Array.isArray(rawLink)
        ? rawLink[0]?.['@_href'] ?? ''
        : rawLink?.['@_href'] ?? '';

    return {
        id: `${feed.id}-${link || index}`,
        title: getText(item.title) || 'Sem título',
        summary: getText(
          item.description ??
          item.summary ??
          item['content:encoded']
        ),
        description: getText(
          item.description ?? item.summary ?? ''
        ),
        body: [],
        source: feed.title,
        author: getText(item.author ?? item.creator),
        category: 'RSS',
        url: link,
        pubDate,
        time: formatDateTime(pubDate),
        image: getImage(item, feed.image),
};
  });
}
