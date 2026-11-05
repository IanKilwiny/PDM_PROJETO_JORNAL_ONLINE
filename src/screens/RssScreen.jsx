import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AddRssFeedModal } from '../components/rss/AddRssFeedModal';
import { RssFeedCard } from '../components/rss/RssFeedCard';
import { RssHero } from '../components/rss/RssHero';
import { FeedHeader } from '../components/feed/FeedHeader';
import { useNews } from '../context/NewsContext';

export function RssScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [feedUrl, setFeedUrl] = useState('');
  const [error, setError] = useState('');
  const { rssFeeds, addRssFeed } = useNews();

  const closeModal = () => {
    setIsModalVisible(false);
    setFeedUrl('');
    setError('');
  };

  const handleChangeUrl = (value) => {
    setFeedUrl(value);
    if (error) setError('');
  };

  const handleAddFeed = () => {
    const trimmedUrl = feedUrl.trim();
    let parsedUrl;

    try {
      parsedUrl = new URL(trimmedUrl);
    } catch {
      setError('Digite um link válido, como https://exemplo.com/feed.xml.');
      return;
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      setError('O link precisa começar com http:// ou https://.');
      return;
    }

    const normalizedUrl = parsedUrl.toString();
    const alreadyAdded = rssFeeds.some(
      (feed) => feed.url.toLowerCase() === normalizedUrl.toLowerCase()
    );

    if (alreadyAdded) {
      setError('Esse feed já foi adicionado.');
      return;
    }

    addRssFeed({
      id: `${Date.now()}-${normalizedUrl}`,
      title: parsedUrl.hostname.replace(/^www\./, ''),
      url: normalizedUrl,
    });
    closeModal();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#075E63" />
      <FeedHeader />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heading}>
          <Text style={styles.pageTitle}>Seus feeds RSS</Text>
          <Text style={styles.pageSubtitle}>
            Todas as fontes que você acompanha, em um só lugar.
          </Text>
        </View>

        <RssHero onAddFeed={() => setIsModalVisible(true)} />

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>Fontes adicionadas</Text>
            <Text style={styles.sectionSubtitle}>
              {rssFeeds.length === 1
                ? '1 feed na sua lista'
                : `${rssFeeds.length} feeds na sua lista`}
            </Text>
          </View>
          <View style={styles.countBadge}>
            <Ionicons name="logo-rss" size={15} color="#087F82" />
            <Text style={styles.countText}>{rssFeeds.length}</Text>
          </View>
        </View>

        {rssFeeds.length ? (
          <View style={styles.feedList}>
            {rssFeeds.map((feed) => (
              <RssFeedCard key={feed.id} feed={feed} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="newspaper-outline" size={23} color="#94A3B8" />
            <Text style={styles.emptyTitle}>Sua lista começa aqui</Text>
            <Text style={styles.emptyDescription}>
              Adicione um feed para acompanhar as publicações da sua fonte
              favorita.
            </Text>
          </View>
        )}
      </ScrollView>

      <AddRssFeedModal
        visible={isModalVisible}
        value={feedUrl}
        error={error}
        onChangeText={handleChangeUrl}
        onClose={closeModal}
        onSubmit={handleAddFeed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F7FA',
    flex: 1,
  },
  content: {
    paddingBottom: 28,
  },
  heading: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  pageTitle: {
    color: '#173B3D',
    fontSize: 25,
    fontWeight: '700',
  },
  pageSubtitle: {
    color: '#718096',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  sectionHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 27,
    marginBottom: 13,
  },
  sectionTitle: {
    color: '#173B3D',
    fontSize: 17,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 3,
  },
  countBadge: {
    alignItems: 'center',
    backgroundColor: '#E6F5F2',
    borderRadius: 12,
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  countText: {
    color: '#087F82',
    fontSize: 13,
    fontWeight: '700',
  },
  feedList: {
    gap: 10,
    paddingHorizontal: 18,
  },
  emptyState: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E7EDF2',
    borderRadius: 16,
    borderWidth: 1,
    marginHorizontal: 18,
    paddingHorizontal: 24,
    paddingVertical: 23,
  },
  emptyTitle: {
    color: '#334155',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 9,
  },
  emptyDescription: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    maxWidth: 280,
    textAlign: 'center',
  },
});
