import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function NewsCard({ item, isSaved, onToggleSaved }) {
  return (
    <Pressable style={styles.card} onPress={() => {}}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.metadata}>
          <Text style={styles.source}>{item.source}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.footer}>
          <Pressable
            onPress={onToggleSaved}
            accessibilityLabel={
              isSaved ? 'Remover dos salvos' : 'Salvar notícia'
            }
            hitSlop={8}
          >
            <Ionicons
              name={isSaved ? 'bookmark' : 'bookmark-outline'}
              size={21}
              color="#075E63"
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#EDF1F5',
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 76,
    height: 82,
    borderRadius: 9,
    backgroundColor: '#E2E8F0',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  source: {
    color: '#075E63',
    fontSize: 12,
    fontWeight: '700',
  },
  time: {
    color: '#94A3B8',
    fontSize: 10,
  },
  title: {
    color: '#17212B',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 7,
  },
  footer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
});
