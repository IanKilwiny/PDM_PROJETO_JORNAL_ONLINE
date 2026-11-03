import { useLocalSearchParams, useRouter } from 'expo-router';

export function useAppNavigation() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return {
    id,
    goBack: () => router.back(),
    openArticle: (articleId) =>
      router.push({ pathname: '/news/[id]', params: { id: articleId } }),
  };
}
