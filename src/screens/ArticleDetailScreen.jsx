import { useMemo } from 'react';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ArticleActions,
  ArticleBody,
  ArticleDetailHeader,
  ArticleHero,
  ArticleIntro,
} from '../components/article-detail';
import { useNews } from '../context/NewsContext';
import { useAppNavigation } from '../navigation/useAppNavigation';
import { shareNews } from '../utils/shareNews';

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
    try {
      await shareNews(article);
    } catch {
      if (Platform.OS === 'web') {
        window.alert('Não foi possível compartilhar a notícia.');
      } else {
        Alert.alert('Não foi possível compartilhar a notícia.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#075E63" />

      <ArticleDetailHeader
        isSaved={saved}
        onBack={goBack}
        onToggleSaved={() => toggleSaved(article.id)}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ArticleHero image={article.image} />

        <View style={styles.content}>
          <ArticleIntro article={article} />
          <ArticleActions
            hasOriginalUrl={Boolean(article.url)}
            onOpenOriginal={async () => {
              try {
                await Linking.openURL(article.url);
              } catch {
                if (Platform.OS === 'web') {
                  window.alert('Não foi possível abrir a notícia original.');
                } else {
                  Alert.alert('Não foi possível abrir a notícia original.');
                }
              }
            }}
            onShare={handleShare}
          />
          <ArticleBody article={article} />
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
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40,
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
