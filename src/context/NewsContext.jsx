
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { news as initialNews } from '../data/feedData';
import { fetchRssFeed } from '../services/rssService';

const NewsContext = createContext(null);

export function NewsProvider({ children }) {
  const [savedNewsIds, setSavedNewsIds] = useState([]);
  const [rssFeeds, setRssFeeds] = useState([]);
  const [rssNews, setRssNews] = useState([]);

  // Adiciona uma fonte RSS
  const addRssFeed = useCallback((feed) => {
    setRssFeeds((currentFeeds) => [feed, ...currentFeeds]);
  }, []);

  // Busca notícias de todas as fontes cadastradas
  useEffect(() => {
    let cancelled = false;

    async function loadRssNews() {
      if (rssFeeds.length === 0) {
        setRssNews([]);
        return;
      }

      const results = await Promise.allSettled(
        rssFeeds.map((feed) => fetchRssFeed(feed))
      );

      if (cancelled) return;

      const articles = results
        .filter((result) => result.status === 'fulfilled')
        .flatMap((result) => result.value);

      setRssNews(articles);
    }

    loadRssNews();

    return () => {
      cancelled = true;
    };
  }, [rssFeeds]);

  const allNews = useMemo(
    () => [...rssNews, ...initialNews],
    [rssNews]
  );

  const toggleSaved = useCallback((id) => {
    setSavedNewsIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  }, []);

  const isSaved = useCallback(
    (id) => savedNewsIds.includes(id),
    [savedNewsIds]
  );

  const value = useMemo(
    () => ({
      news: allNews,
      rssNews,
      rssFeeds,
      addRssFeed,
      savedNewsIds,
      savedNews: allNews.filter((item) =>
        savedNewsIds.includes(item.id)
      ),
      toggleSaved,
      isSaved,
    }),
    [
      allNews,
      rssNews,
      rssFeeds,
      addRssFeed,
      savedNewsIds,
      toggleSaved,
      isSaved,
    ]
  );

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);

  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }

  return context;
}
