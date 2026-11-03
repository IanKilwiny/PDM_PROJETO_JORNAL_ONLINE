import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function FeedHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.title}>
        <Ionicons name="logo-rss" size={25} color="#FFFFFF" />
        <Text style={styles.logo}>Pauta</Text>
      </View>

      <View style={styles.actions}>
        <Pressable accessibilityLabel="Pesquisar notícias" onPress={() => {}}>
          <Ionicons name="search-outline" size={24} color="#FFFFFF" />
        </Pressable>
        <Pressable accessibilityLabel="Mais opções" onPress={() => {}}>
          <Ionicons name="ellipsis-vertical" size={23} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#075E63',
    minHeight: 62,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
});
