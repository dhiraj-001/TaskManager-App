import React, { useContext, useEffect } from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Navigation from './src/screens/Navigation';
import { ThemeContext, ThemeProvider } from './src/Context/MyContext';
import { TaskProvider } from './src/Context/TaskContext';
import SplashScreen from 'react-native-splash-screen';
import notifee from '@notifee/react-native';

const AppContent = () => {
  const {colors, isDarkMode} = useContext(ThemeContext);

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        // Request permission
        const settings = await notifee.requestPermission();
        
        if (settings.authorizationStatus >= 1) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    requestNotificationPermission();
  }, []);

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.bgColor,
    }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.bgColor}
      />
      
      <Navigation />
    </View>
  );
};

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ThemeProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
