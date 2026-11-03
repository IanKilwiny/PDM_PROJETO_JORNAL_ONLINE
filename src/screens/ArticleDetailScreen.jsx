import { useMemo } from 'react';
import {
  Alert,
  Image,
  Pressable,
  Platform,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useNews } from '../context/NewsContext';
import { useAppNavigation } from '../navigation/useAppNavigation';

export function ArticleDetailScreen() {
  const { id, goBack } = useAppNavigation();
  const { news, isSaved, toggleSaved } = useNews();

  const article = useMemo(
    () => news.find((item) => item.id === String(id)),
    [id, news]
  );

  if (!article) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>Notícia não encontrada.</Text>
      </View>
    );
  }

  const saved = isSaved(article.id);

  const handleShare = async () => {
    const message = `Veja esta notícia: ${article.title} - ${article.source}`;

    if (Platform.OS === 'web') {
      try {
        if (typeof navigator.share === 'function') {
          await navigator.share({ text: message });
        } else if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(message);
          window.alert('Texto da notícia copiado para compartilhar.');
        } else {
          window.prompt('Copie o texto para compartilhar:', message);
        }
      } catch {
        window.alert('Não foi possível compartilhar a notícia.');
      }
      return;
    }

    try {
      await Share.share({ message });
    } catch {
      Alert.alert('Não foi possível compartilhar a notícia.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#075E63" />

      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Voltar"
          onPress={goBack}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.headerTitle}>Pauta</Text>

        <Pressable
          accessibilityLabel={saved ? 'Remover dos salvos' : 'Salvar notícia'}
          onPress={() => toggleSaved(article.id)}
          style={styles.iconButton}
        >
          <Ionicons
            name={saved ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color="#FFFFFF"
          />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: article.image }} style={styles.image} />

        <View style={styles.content}>
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

          <View style={styles.actionRow}>
            <Pressable style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-social-outline" size={18} color="#075E63" />
              <Text style={styles.shareButtonText}>Compartilhar</Text>
            </Pressable>
          </View>

          <Text style={styles.summary}>{article.summary}</Text>

          {article.body.map((paragraph) => (
            <Text key={paragraph} style={styles.bodyText}>
              {paragraph}
            </Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  header: {
    backgroundColor: '#075E63',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    minHeight: 64,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 230,
    backgroundColor: '#D9E4EA',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40,
  },
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
  actionRow: {
    marginBottom: 20,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E6F7F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    gap: 8,
  },
  shareButtonText: {
    color: '#075E63',
    fontWeight: '600',
    fontSize: 13,
  },
  summary: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  bodyText: {
    color: '#334155',
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 14,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F7FA',
  },
  emptyText: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '600',
  },
});
