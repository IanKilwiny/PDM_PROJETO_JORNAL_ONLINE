import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export function RssFeedCard({ feed }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name="logo-rss" size={19} color="#087F82" />
      </View>
      <View style={styles.details}>
        <Text numberOfLines={1} style={styles.title}>
          {feed.title}
        </Text>
        <Text numberOfLines={1} style={styles.url}>
          {feed.url}
        </Text>
      </View>
      <View style={styles.status}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>Adicionado</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E7EDF2',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 12,
    padding: 14,
  },
  iconWrap: {
    alignItems: 'center',
    backgroundColor: '#E6F5F2',
    borderRadius: 13,
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  details: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#173B3D',
    fontSize: 14,
    fontWeight: '700',
  },
  url: {
    color: '#718096',
    fontSize: 12,
    marginTop: 4,
  },
  status: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  statusDot: {
    backgroundColor: '#22A06B',
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  statusText: {
    color: '#64748B',
    fontSize: 11,
  },
});
