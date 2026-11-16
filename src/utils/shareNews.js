import { Platform, Share } from 'react-native';

export async function shareNews(article) {
  const message = `Veja esta notícia: ${article.title} - ${article.source}${
    article.url ? `\n${article.url}` : ''
  }`;

  if (Platform.OS === 'web') {
    if (typeof navigator.share === 'function') {
      await navigator.share(
        article.url ? { text: message, url: article.url } : { text: message }
      );
    } else if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(message);
      window.alert('Texto da notícia copiado para compartilhar.');
    } else {
      window.prompt('Copie o texto para compartilhar:', message);
    }
    return;
  }

  await Share.share({ message });
}
