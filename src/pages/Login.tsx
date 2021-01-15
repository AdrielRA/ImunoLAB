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
        .then((res) =>
          navigation.reset({
            index: 0,
            routes: [{name: 'Home', params: {uid: res.user.uid}}],
          }),
        )
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
        .then((res) => {
          navigation.reset({
            index: 0,
            routes: [
              {name: 'Profile', params: {uid: res.user.uid, isNew: true}},
            ],
          });
        })
        .catch((err: Error) => Alert.alert('Falha:', err.message));
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
          autoCapitalize="none"
          keyboardType="email-address"
          value={user?.email || ''}
          onChangeText={handleEmailChange}
          style={styles.input}
        />
        <Input
          icon="lock"
          placeholder="Senha"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
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
