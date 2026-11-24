import {
  Alert,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppNavigation } from '../../navigation/useAppNavigation';
import { shareNews } from '../../utils/shareNews';

export function NewsCard({ item, isSaved, onToggleSaved }) {
  const { openArticle } = useAppNavigation();

  const handleShare = async (event) => {
    event.stopPropagation();
    try {
      await shareNews(item);
    } catch {
      if (Platform.OS === 'web') {
        window.alert('Não foi possível compartilhar a notícia.');
      } else {
        Alert.alert('Não foi possível compartilhar a notícia.');
      }
    }
  };

  return (
    <Pressable
      style={styles.card}
      onPress={() => openArticle(item.id)}
    >
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          style={styles.image}
        />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Ionicons name="newspaper-outline" size={26} color="#94A3B8" />
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.metadata}>
          <Text style={styles.source}>{item.source}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.footer}>
          <Pressable
            onPress={handleShare}
            accessibilityLabel="Compartilhar notícia"
            accessibilityRole="button"
            hitSlop={8}
          >
            <Ionicons
              name="share-social-outline"
              size={20}
              color="#075E63"
            />
          </Pressable>
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              onToggleSaved();
            }}
            accessibilityLabel={
              isSaved ? 'Remover dos salvos' : 'Salvar notícia'
            }
            accessibilityRole="button"
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
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
});
