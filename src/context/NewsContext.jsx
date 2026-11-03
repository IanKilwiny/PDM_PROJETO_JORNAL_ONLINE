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
      news: initialNews,
      savedNewsIds,
      savedNews: initialNews.filter((item) => savedNewsIds.includes(item.id)),
      toggleSaved,
      isSaved,
    }),
    [isSaved, savedNewsIds, toggleSaved]
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
