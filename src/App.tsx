import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, LogBox} from 'react-native';
import Routes from './routes';
import theme from './assets/theme.json';

LogBox.ignoreLogs(['Warning: componentWillMount has been renamed']);

const App = () => {
  return (
    <SafeAreaView style={styles.page}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <Routes />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

export default App;
