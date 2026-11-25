import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useNews } from '../context/NewsContext';
import { rssFeeds } from '../data/rssFeeds';
import { parseRssFeed } from '../utils/rss';
import { FeedHeader } from '../components/feed/FeedHeader';
import { NewsCard } from '../components/feed/NewsCard';

const requestTimeoutMs = 15000;
const maxArticlesPerFeed = 4;

function getFeedError(reason) {
  if (reason?.name === 'AbortError') {
    return 'A solicitação excedeu o tempo limite.';
  }
  if (reason?.message?.startsWith('HTTP ')) {
    return reason.message;
  }
  if (Platform.OS === 'web' && reason instanceof TypeError) {
    return 'A fonte pode bloquear requisições do navegador (CORS).';
  }

  return 'Não foi possível acessar a fonte. Verifique a conexão.';
}

export function RssScreen() {
  const { rssNews, setRssNews, isSaved, toggleSaved } = useNews();
  const [loading, setLoading] = useState(false);
  const [failures, setFailures] = useState([]);
  const controllerRef = useRef(null);

  const loadFeeds = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, requestTimeoutMs);

    setLoading(true);
    setFailures([]);

    try {
      const feeds = rssFeeds.filter(
        (feed) => !feed.nativeOnly || Platform.OS !== 'web'
      );
      const results = await Promise.allSettled(
        feeds.map(async (feed) => {
          const response = await fetch(feed.url, { signal: controller.signal });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const articles = parseRssFeed(await response.text(), feed).slice(
            0,
            maxArticlesPerFeed
          );

          if (articles.length === 0) {
            throw new Error('A fonte não retornou notícias válidas.');
          }

          return { feed, articles };
        })
      );

      if (controller.signal.aborted && !timedOut) {
        return;
      }

      const updatedFeeds = results.flatMap((result) =>
        result.status === 'fulfilled' ? [result.value] : []
      );
      const failedFeeds = results.flatMap((result, index) =>
        result.status === 'rejected'
          ? [{ name: feeds[index].name, message: getFeedError(result.reason) }]
          : []
      );

      setRssNews((current) => {
        const refreshedIds = new Set(updatedFeeds.map(({ feed }) => feed.id));
        return [
          ...current.filter((article) => !refreshedIds.has(article.sourceId)),
          ...updatedFeeds.flatMap(({ articles }) => articles),
        ];
      });
      setFailures(
        timedOut
          ? [
              ...failedFeeds,
              ...(failedFeeds.length === 0
                ? [{ name: 'Fontes RSS', message: getFeedError({ name: 'AbortError' }) }]
                : []),
            ]
          : failedFeeds
      );
    } finally {
      clearTimeout(timeout);
      if (!controller.signal.aborted || timedOut) {
        setLoading(false);
      }
    }
  }, [setRssNews]);

  useEffect(() => {
    const request = setTimeout(loadFeeds, 0);
    return () => {
      clearTimeout(request);
      controllerRef.current?.abort();
    };
  }, [loadFeeds]);

  const listHeader = (
    <View style={styles.listHeader}>
      <View style={styles.titleRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.title}>Notícias por RSS</Text>
          <Text style={styles.description}>
            Últimas notícias de fontes externas.
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Atualizar fontes RSS"
          disabled={loading}
          onPress={loadFeeds}
          style={({ pressed }) => [
            styles.refreshButton,
            pressed && styles.refreshButtonPressed,
            loading && styles.refreshButtonDisabled,
          ]}
        >
          <Ionicons
            name="refresh"
            size={20}
            color={loading ? '#94A3B8' : '#075E63'}
          />
        </Pressable>
      </View>

      {failures.length > 0 && (
        <View accessibilityRole="alert" style={styles.errorBanner}>
          <Text style={styles.errorTitle}>
            Algumas fontes não puderam ser atualizadas.
          </Text>
          {failures.map((failure) => (
            <Text key={failure.name} style={styles.errorText}>
              {failure.name}: {failure.message}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  const emptyList = (
    <View style={styles.emptyState}>
      <Ionicons
        name={loading ? 'sync-outline' : 'newspaper-outline'}
        size={40}
        color="#94A3B8"
      />
      <Text style={styles.emptyTitle}>
        {loading ? 'Carregando fontes RSS...' : 'Nenhuma notícia RSS disponível'}
      </Text>
      {!loading && (
        <Text style={styles.emptyDescription}>
          Tente atualizar as fontes novamente.
        </Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#075E63" />
      <FeedHeader />
      <FlatList
        data={rssNews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsCard
            item={item}
            isSaved={isSaved(item.id)}
            onToggleSaved={() => toggleSaved(item.id)}
          />
        )}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={emptyList}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadFeeds} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FA',
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  listHeader: {
    paddingTop: 18,
    paddingBottom: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  titleGroup: {
    flex: 1,
  },
  title: {
    color: '#17212B',
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 4,
  },
  refreshButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    backgroundColor: '#E6F7F7',
  },
  refreshButtonPressed: {
    opacity: 0.7,
  },
  refreshButtonDisabled: {
    opacity: 0.7,
  },
  errorBanner: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FED7AA',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    gap: 5,
  },
  errorTitle: {
    color: '#9A3412',
    fontWeight: '700',
    fontSize: 13,
  },
  errorText: {
    color: '#9A3412',
    fontSize: 12,
    lineHeight: 18,
  },
  separator: {
    height: 12,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    gap: 10,
  },
  emptyTitle: {
    color: '#334155',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyDescription: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
  },
});
