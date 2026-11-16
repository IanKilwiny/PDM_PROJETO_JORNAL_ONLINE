import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { news as initialNews } from '../data/feedData';

const NewsContext = createContext(null);

export function NewsProvider({ children }) {
  const [savedNewsIds, setSavedNewsIds] = useState([]);
  const [rssNews, setRssNews] = useState([]);

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
  const news = useMemo(() => [...initialNews, ...rssNews], [rssNews]);
  const value = useMemo(
    () => ({
      news,
      rssNews,
      setRssNews,
      savedNewsIds,
      savedNews: news.filter((item) => savedNewsIds.includes(item.id)),
      toggleSaved,
      isSaved,
    }),
    [isSaved, news, rssNews, savedNewsIds, toggleSaved]
  );

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export function useNews() {
  const context = useContext(NewsContext);

  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }

  return context;
}
