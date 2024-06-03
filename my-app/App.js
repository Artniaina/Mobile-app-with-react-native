import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './utils/AuthContext'; 
import { AnimalProvider } from './utils/AnimalContext';
import MainNavigator from './navigations/MainNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider> 
       <AnimalProvider > 
        <View style={styles.container}>
          <MainNavigator />
        </View>
        </ AnimalProvider > 
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
