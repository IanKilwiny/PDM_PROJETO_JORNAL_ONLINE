import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function BottomNavigation() {
  return (
    <View style={styles.container}>
      <Pressable style={styles.item}>
        <Ionicons name="home" size={23} color="#087F82" />
        <Text style={styles.selected}>Feed</Text>
      </Pressable>

      <Pressable style={styles.item}>
        <Ionicons name="bookmark-outline" size={23} color="#64748B" />
        <Text style={styles.label}>Salvos</Text>
      </Pressable>

      <Pressable style={styles.item}>
        <Ionicons name="share-social-outline" size={23} color="#64748B" />
        <Text style={styles.label}>Compartilhar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  selected: {
    color: '#087F82',
    fontSize: 11,
    fontWeight: '700',
  },
  label: {
    color: '#64748B',
    fontSize: 11,
  },
});
