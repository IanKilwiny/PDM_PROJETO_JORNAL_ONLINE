import { Stack } from 'expo-router';

import { NewsProvider } from '../context/NewsContext';

export default function RootLayout() {
  return (
    <NewsProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="news/[id]" options={{ headerShown: false }} />
      </Stack>
    </NewsProvider>
  );
}
