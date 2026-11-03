import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function SearchBar({ value, onChangeText, onClear }) {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color="#64748B" />
      <TextInput
        style={styles.input}
        placeholder="Buscar notícias..."
        placeholderTextColor="#64748B"
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <Pressable
          accessibilityLabel="Limpar pesquisa"
          onPress={onClear}
          hitSlop={8}
        >
          <Ionicons name="close-circle" size={20} color="#64748B" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  input: {
    flex: 1,
    fontSize: 14,
    color: '#17212B',
    paddingVertical: 0,
  },
});
