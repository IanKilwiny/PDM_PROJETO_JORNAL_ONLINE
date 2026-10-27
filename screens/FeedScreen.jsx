
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  'Todas',
  'Tecnologia',
  'Mundo',
  'Brasil',
  'Economia',
];

const news = [
  {
    id: '1',
    source: 'Tecnoblog',
    category: 'Tecnologia',
    time: 'há 2 horas',
    title:
      'Inteligência artificial impulsiona novas ferramentas no mercado de trabalho',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
  },
  {
    id: '2',
    source: 'G1',
    category: 'Mundo',
    time: 'há 3 horas',
    title:
      'Amazônia registra mudanças no desmatamento, aponta novo relatório',
    image:
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600',
  },
  {
    id: '3',
    source: 'Folha de S.Paulo',
    category: 'Brasil',
    time: 'há 5 horas',
    title:
      'Brasil avança em conectividade e amplia o acesso à internet',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600',
  },
  {
    id: '4',
    source: 'InfoMoney',
    category: 'Economia',
    time: 'há 6 horas',
    title:
      'Mercado financeiro acompanha novas tendências da economia',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600',
  },
];

export function FeedScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [search, setSearch] = useState('');
  const [savedNews, setSavedNews] = useState([]);

  const filteredNews = news.filter((item) => {
    const matchesCategory =
      selectedCategory === 'Todas' ||
      item.category === selectedCategory;

    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.source.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function toggleSaved(id) {
    setSavedNews((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#075E63" />

      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Ionicons name="logo-rss" size={25} color="#FFFFFF" />
          <Text style={styles.logo}>Pauta</Text>
        </View>

        <View style={styles.headerActions}>
          <Pressable
            accessibilityLabel="Pesquisar notícias"
            onPress={() => {}}
          >
            <Ionicons name="search-outline" size={24} color="#FFFFFF" />
          </Pressable>

          <Pressable
            accessibilityLabel="Mais opções"
            onPress={() => {}}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={23}
              color="#FFFFFF"
            />
          </Pressable>
        </View>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Pesquisa */}
        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#64748B"
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar notícias..."
            placeholderTextColor="#64748B"
            value={search}
            onChangeText={setSearch}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color="#64748B" />
            </Pressable>
          )}
        </View>

        {/* Categorias */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {categories.map((category) => {
            const selected = selectedCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.category,
                  selected && styles.categorySelected,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selected && styles.categoryTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Lista de notícias */}
        <View style={styles.newsList}>
          {filteredNews.map((item) => {
            const isSaved = savedNews.includes(item.id);

            return (
              <Pressable
                key={item.id}
                style={styles.newsCard}
                onPress={() => {
                  // Depois abriremos a tela de detalhes da notícia.
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.newsImage}
                />

                <View style={styles.newsContent}>
                  <View style={styles.newsMetadata}>
                    <Text style={styles.source}>{item.source}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                  </View>

                  <Text style={styles.newsTitle}>
                    {item.title}
                  </Text>

                  <View style={styles.cardFooter}>
                    <Pressable
                      onPress={() => toggleSaved(item.id)}
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
          })}

          {filteredNews.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons
                name="newspaper-outline"
                size={42}
                color="#94A3B8"
              />
              <Text style={styles.emptyTitle}>
                Nenhuma notícia encontrada
              </Text>
              <Text style={styles.emptyDescription}>
                Tente outra pesquisa ou categoria.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Navegação inferior */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.navItem}>
          <Ionicons name="home" size={23} color="#087F82" />
          <Text style={styles.navSelected}>Feed</Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <Ionicons
            name="bookmark-outline"
            size={23}
            color="#64748B"
          />
          <Text style={styles.navText}>Salvos</Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <Ionicons
            name="share-social-outline"
            size={23}
            color="#64748B"
          />
          <Text style={styles.navText}>Compartilhar</Text>
        </Pressable>
      </View>
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
    minHeight: 62,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  content: {
    flex: 1,
  },
  searchBox: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 16,
    marginTop: 15,
    marginBottom: 13,
    paddingHorizontal: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#17212B',
    paddingVertical: 0,
  },
  categories: {
    paddingHorizontal: 16,
    paddingBottom: 15,
    gap: 8,
  },
  category: {
    backgroundColor: '#E8EEF2',
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 22,
  },
  categorySelected: {
    backgroundColor: '#087F82',
  },
  categoryText: {
    color: '#263746',
    fontSize: 13,
  },
  categoryTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  newsList: {
    paddingHorizontal: 12,
    paddingBottom: 16,
    gap: 12,
  },
  newsCard: {
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
  newsImage: {
    width: 76,
    height: 82,
    borderRadius: 9,
    backgroundColor: '#E2E8F0',
  },
  newsContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  newsMetadata: {
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
  newsTitle: {
    color: '#17212B',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginTop: 7,
  },
  cardFooter: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 55,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  emptyDescription: {
    fontSize: 13,
    color: '#64748B',
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    minHeight: 65,
    paddingTop: 8,
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  navSelected: {
    color: '#087F82',
    fontSize: 11,
    fontWeight: '700',
  },
  navText: {
    color: '#64748B',
    fontSize: 11,
  },
});
