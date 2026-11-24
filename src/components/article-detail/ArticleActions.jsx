import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ArticleActions({ hasOriginalUrl, onOpenOriginal, onShare }) {
  return (
    <View style={styles.actionRow}>
      <Pressable style={styles.actionButton} onPress={onShare}>
        <Ionicons name="share-social-outline" size={18} color="#075E63" />
        <Text style={styles.actionButtonText}>Compartilhar</Text>
      </Pressable>
      {hasOriginalUrl ? (
        <Pressable style={styles.actionButton} onPress={onOpenOriginal}>
          <Ionicons name="open-outline" size={18} color="#075E63" />
          <Text style={styles.actionButtonText}>Ler notícia completa</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E6F7F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    gap: 8,
  },
  actionButtonText: {
    color: '#075E63',
    fontWeight: '600',
    fontSize: 13,
  },
});
