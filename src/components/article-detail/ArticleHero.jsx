import { Image, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ArticleHero({ image }) {
  if (image) {
    return (
      <Image
        source={{ uri: image }}
        resizeMode="cover"
        style={styles.image}
      />
    );
  }

  return (
    <View style={[styles.image, styles.placeholder]}>
      <Ionicons name="newspaper-outline" size={48} color="#94A3B8" />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 230,
    backgroundColor: '#D9E4EA',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
