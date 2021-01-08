import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, LogBox} from 'react-native';
import Routes from './routes';
import theme from './assets/theme.json';

LogBox.ignoreLogs(['Warning: componentWillMount has been renamed']);

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.colors.primary}
      />
      <SafeAreaView style={styles.page}>
        <Routes />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

export default App;
