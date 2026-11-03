import { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import {
  CategoryFilter,
  EmptyState,
  FeedHeader,
  NewsCard,
  SearchBar,
} from '../components/feed';
import { categories } from '../data/feedData';
import { useNews } from '../context/NewsContext';

export function FeedScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [search, setSearch] = useState('');
  const { news, isSaved, toggleSaved } = useNews();

  const filteredNews = news.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Todas' || item.category === selectedCategory;
    const normalizedSearch = search.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(normalizedSearch) ||
      item.source.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#075E63" />
      <FeedHeader />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <SearchBar
          value={search}
          onChangeText={setSearch}
          onClear={() => setSearch('')}
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <View style={styles.newsList}>
          {filteredNews.map((item) => (
            <NewsCard
              key={item.id}
              item={item}
              isSaved={isSaved(item.id)}
              onToggleSaved={() => toggleSaved(item.id)}
            />
          ))}

          {filteredNews.length === 0 && <EmptyState />}
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
    flex: 1,
  },
  newsList: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    gap: 12,
  },
});
