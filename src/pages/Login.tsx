import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text, Input, Button} from '../components';

const Login: React.FC = () => {
  const handleText = (text: string) => {
    console.log(text);
  };

  return (
    <View style={styles.page}>
      <View style={styles.inlineTxt}>
        <Text weight="black" style={styles.title}>
          IMUNO
        </Text>
        <Text weight="black" color="primary" style={styles.title}>
          LAB
        </Text>
      </View>

      <View>
        <Input
          icon="user-circle"
          placeholder="seu.email@aqui.com"
          style={styles.input}
          onChangeText={handleText}
        />
        <Input
          icon="lock"
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={handleText}
        />
        <Button style={[styles.button, styles.formPad]} text="Entrar" />
        <Button style={styles.button} text="Cadastrar" type="outline" />
        <View style={styles.inlineTxt}>
          <Image
            source={require('../assets/images/UNIFENAS.png')}
            style={styles.unifenas}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {padding: 15},
  inlineTxt: {
    marginVertical: '22%',
    flexDirection: 'row',
    justifyContent: 'center',
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
  title: {
    fontSize: 50,
  },
  unifenas: {
    width: 200,
    aspectRatio: 4,
  },
});

export default Login;
