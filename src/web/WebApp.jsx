import { Ionicons } from '@expo/vector-icons';
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
} from 'react-router';
import { StyleSheet, Text, View } from 'react-native';

import { NewsProvider } from '../context/NewsContext';
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen';
import { FeedScreen } from '../screens/FeedScreen';
import { SavedScreen } from '../screens/SavedScreen';

function TabLayout() {
  return (
    <View style={styles.app}>
      <Outlet />
      <View style={styles.tabBar}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            ...styles.tab,
            ...(isActive ? styles.activeTab : {}),
          })}
        >
          {({ isActive }) => (
            <>
              <Ionicons
                name="home"
                size={23}
                color={isActive ? '#087F82' : '#64748B'}
              />
              <Text style={[styles.tabLabel, isActive && styles.activeLabel]}>
                Feed
              </Text>
            </>
          )}
        </NavLink>

        <NavLink
          to="/saved"
          style={({ isActive }) => ({
            ...styles.tab,
            ...(isActive ? styles.activeTab : {}),
          })}
        >
          {({ isActive }) => (
            <>
              <Ionicons
                name="bookmark-outline"
                size={23}
                color={isActive ? '#087F82' : '#64748B'}
              />
              <Text style={[styles.tabLabel, isActive && styles.activeLabel]}>
                Salvos
              </Text>
            </>
          )}
        </NavLink>
      </View>
    </View>
  );
}

function WebRoutes() {
  return (
    <Routes>
      <Route element={<TabLayout />}>
        <Route index element={<FeedScreen />} />
        <Route path="saved" element={<SavedScreen />} />
      </Route>
      <Route path="news/:id" element={<ArticleDetailScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function WebApp() {
  return (
    <BrowserRouter>
      <NewsProvider>
        <WebRoutes />
      </NewsProvider>
    </BrowserRouter>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  tabBar: {
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
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    textDecorationLine: 'none',
  },
  activeTab: {
    color: '#087F82',
  },
  tabLabel: {
    color: '#64748B',
    fontSize: 11,
  },
  activeLabel: {
    color: '#087F82',
    fontWeight: '700',
  },
});
