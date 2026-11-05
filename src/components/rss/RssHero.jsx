import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export function RssHero({ onAddFeed }) {
  return (
    <View style={styles.card}>
      <View style={styles.artwork}>
        <View style={styles.artworkCircle}>
          <Ionicons name="cloud-upload" size={42} color="#087F82" />
        </View>
        <View style={styles.rssBadge}>
          <Ionicons name="logo-rss" size={17} color="#FFFFFF" />
        </View>
      </View>

      <Text style={styles.eyebrow}>SEU JORNAL, DO SEU JEITO</Text>
      <Text style={styles.title}>Acompanhe suas fontes favoritas</Text>

      <Pressable
        accessibilityRole="button"
        onPress={onAddFeed}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Ionicons name="cloud-upload-outline" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Adicionar link RSS</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginHorizontal: 18,
    marginTop: 20,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 22,
    shadowColor: '#164E51',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  artwork: {
    height: 106,
    width: 118,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  artworkCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E6F5F2',
  },
  rssBadge: {
    position: 'absolute',
    right: 7,
    bottom: 3,
    height: 34,
    width: 34,
    borderRadius: 17,
    backgroundColor: '#F59E0B',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: {
    color: '#087F82',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    marginBottom: 8,
  },
  title: {
    color: '#173B3D',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 29,
    textAlign: 'center',
  },
  description: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 9,
    maxWidth: 310,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#087F82',
    borderRadius: 14,
    flexDirection: 'row',
    gap: 9,
    justifyContent: 'center',
    marginTop: 21,
    minHeight: 52,
    paddingHorizontal: 22,
    width: '100%',
  },
  buttonPressed: {
    backgroundColor: '#06696C',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  hint: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 11,
  },
});
