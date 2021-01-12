import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Input, Button, Logo} from '../components';
import {useNavigation} from '@react-navigation/native';

const Login: React.FC = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.reset({index: 0, routes: [{name: 'Home'}]});
  };

  return (
    <View style={styles.page}>
      <Logo style={styles.logo} />
      <View>
        <Input
          icon="user-circle"
          placeholder="seu.email@aqui.com"
          style={styles.input}
        />
        <Input icon="lock" placeholder="Senha" secureTextEntry={true} />
        <Button
          style={[styles.button, styles.formPad]}
          text="Entrar"
          onPress={handleLogin}
        />
        <Button style={styles.button} text="Cadastrar" type="outline" />
      </View>

      <TouchableOpacity style={styles.btnUnifenas}>
        <Image
          source={require('../assets/images/UNIFENAS.png')}
          style={styles.unifenas}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {padding: 15},
  logo: {
    marginVertical: '22%',
  },
  input: {
    marginVertical: 10,
  },
  formPad: {
    marginTop: 25,
  },
  button: {
    marginVertical: 5,
  },
  btnUnifenas: {
    marginVertical: '22%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unifenas: {
    height: 50,
    resizeMode: 'contain',
  },
});

export default Login;
