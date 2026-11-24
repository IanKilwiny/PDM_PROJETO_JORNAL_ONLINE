import { StyleSheet, Text, View } from 'react-native';

export function ArticleIntro({ article }) {
  return (
    <>
      <View style={styles.tagRow}>
        <View style={styles.categoryPill}>
          <Text style={styles.categoryText}>{article.category}</Text>
        </View>
        <Text style={styles.time}>{article.time}</Text>
      </View>

      <Text style={styles.title}>{article.title}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.source}>{article.source}</Text>
        <Text style={styles.author}>{article.author}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryPill: {
    backgroundColor: '#E0F5F6',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  categoryText: {
    color: '#087F82',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  time: {
    color: '#64748B',
    fontSize: 12,
  },
  title: {
    color: '#0F172A',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 36,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    gap: 8,
  },
  source: {
    color: '#075E63',
    fontWeight: '700',
    fontSize: 13,
  },
  author: {
    color: '#64748B',
    fontSize: 12,
  },
});
