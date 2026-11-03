import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  const { registerRootComponent } = require('expo');
  const WebApp = require('./src/web/WebApp').default;

  registerRootComponent(WebApp);
} else {
  require('expo-router/entry');
}
