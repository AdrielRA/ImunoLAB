/**
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Login: React.FC = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.txt}>Login!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  txt: {
    color: '#212125',
  },
});

export default Login;
