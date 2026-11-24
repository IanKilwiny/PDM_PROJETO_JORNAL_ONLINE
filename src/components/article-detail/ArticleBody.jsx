import { StyleSheet, useWindowDimensions, View } from 'react-native';
import RenderHtml from 'react-native-render-html';

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function toHtml(value) {
  if (typeof value !== 'string') {
    return '';
  }

  const content = value
    .replace(/<picture\b[^>]*>[\s\S]*?<\/picture>/gi, '')
    .replace(/<img\b[^>]*\/?>/gi, '')
    .trim();
  if (!content) {
    return '';
  }

  return /<\/?[a-z][^>]*>/i.test(content) ?  content : escapeHtml(content);
}

function getBodyHtml(body) {
  const paragraphs = Array.isArray(body) ? body : [body];

  return paragraphs
    .map((paragraph) => toHtml(paragraph))
    .filter(Boolean)
    .map((paragraph) =>
      /<\/?[a-z][^>]*>/i.test(paragraph) ? paragraph : `<p>${paragraph}</p>`
    )
    .join('');
}

const bodyTagsStyles = {
  p: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 0,
    marginBottom: 14,
  },
  h1: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
  },
  h2: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 8,
  },
  a: {
    color: '#075E63',
  },
};

const summaryTagsStyles = {
  p: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 0,
    marginBottom: 0,
  },
};

export function ArticleBody({ article }) {
  const { width } = useWindowDimensions();
  const contentWidth = Math.max(width - 36, 0);
  const summaryHtml = toHtml(article.summary || article.description);
  const bodyHtml = getBodyHtml(article.body);

  return (
    <View>
      {summaryHtml ? (
        <View style={styles.summary}>
          <RenderHtml
            contentWidth={contentWidth}
            source={{ html: summaryHtml }}
            tagsStyles={summaryTagsStyles}
          />
        </View>
      ) : null}

      {bodyHtml ? (
        <RenderHtml
          contentWidth={contentWidth}
          source={{ html: bodyHtml }}
          tagsStyles={bodyTagsStyles}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    marginBottom: 16,
  },
});
