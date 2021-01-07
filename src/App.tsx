/**
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, LogBox} from 'react-native';
import Routes from './routes';

LogBox.ignoreLogs(['Warning: componentWillMount has been renamed']);

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.page}>
        <Routes />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default App;
