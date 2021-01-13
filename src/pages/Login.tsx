import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {Input, Button, Logo} from '../components';
import {useNavigation} from '@react-navigation/native';
import {Auth} from '../controllers';
import {TAuth} from '../@types';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<TAuth.User>();

  const handleEmailChange = (email: string) => {
    setUser({email: email || '', password: user?.password || ''});
  };

  const handlePasswordChange = (password: string) => {
    setUser({email: user?.email || '', password: password || ''});
  };

  const handleLogin = () => {
    if (user?.email && user?.password) {
      Auth.login(user)
        .then(() => navigation.reset({index: 0, routes: [{name: 'Home'}]}))
        .catch(() =>
          Alert.alert('Falha:', 'Não foi possível realizar o login.'),
        );
    } else {
      Alert.alert('Falha:', 'Informe os dados de acesso antes!');
    }
  };

  const handleRegister = () => {
    if (user?.email && user?.password) {
      Auth.createUser(user)
        .then(() =>
          Alert.alert('Sucesso!', 'Usuário cadastrado.\nRealize seu login!'),
        )
        .catch(() =>
          Alert.alert('Falha:', 'Não foi possível realizar o cadastro.'),
        );
    } else {
      Alert.alert('Falha:', 'Informe os dados de cadastro antes!');
    }
  };

  return (
    <View style={styles.page}>
      <Logo style={styles.logo} />
      <View>
        <Input
          icon="user-circle"
          placeholder="seu.email@aqui.com"
          value={user?.email || ''}
          onChangeText={handleEmailChange}
          style={styles.input}
        />
        <Input
          icon="lock"
          placeholder="Senha"
          secureTextEntry={true}
          value={user?.password || ''}
          onChangeText={handlePasswordChange}
        />
        <Button
          style={[styles.button, styles.formPad]}
          text="Entrar"
          onPress={handleLogin}
        />
        <Button
          style={styles.button}
          text="Cadastrar"
          type="outline"
          onPress={handleRegister}
        />
      </View>

      <TouchableOpacity
        style={styles.btnUnifenas}
        onPress={() => Linking.openURL('https://www.unifenas.br/')}>
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
