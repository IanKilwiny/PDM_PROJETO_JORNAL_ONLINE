import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Ionicons name="newspaper-outline" size={42} color="#94A3B8" />
      <Text style={styles.title}>Nenhuma notícia encontrada</Text>
      <Text style={styles.description}>
        Tente outra pesquisa ou categoria.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 55,
    gap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
  },
  description: {
    fontSize: 13,
    color: '#64748B',
  },
});
