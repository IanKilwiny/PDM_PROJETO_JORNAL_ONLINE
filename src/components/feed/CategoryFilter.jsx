import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
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
            onPress={() => onSelectCategory(category)}
            style={[styles.category, selected && styles.categorySelected]}
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
  );
}

const styles = StyleSheet.create({
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
});
