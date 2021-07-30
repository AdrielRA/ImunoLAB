import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {Input, Button, Logo} from '../components';
import {Auth} from '../controllers';
import strings from '../assets/strings.json';

type Loading = 'login' | 'register' | 'none';

const Login: React.FC<Props<'Login'>> = ({navigation}) => {
  const [user, setUser] = useState<User>({email: '', password: ''});
  const [loading, setLoading] = useState<Loading>('none');

  const passwordRef = useRef<InputProps>(null);

  const updateUser = (prop: {[key: string]: string}) => {
    setUser({...user, ...prop});
  };

  const handleLogin = () => {
    setLoading('login');
    Auth.login(user)
      .then((res) =>
        navigation.reset({
          index: 0,
          routes: [{name: 'Home', params: {uid: res.user.uid}}],
        }),
      )
      .catch(() => {
        setLoading('none');
        Alert.alert('Falha:', 'Não foi possível realizar o login.');
      });
  };

  const handleRegister = () => {
    setLoading('register');
    Auth.createUser(user)
      .then((User) => {
        navigation.reset({
          index: 0,
          routes: [{name: 'Profile', params: {uid: User.uid, isNew: true}}],
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading('none');
        Alert.alert('Falha:', strings.errors[error] || strings.errors.default);
      });
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
          returnKeyType="next"
          onEndEditing={() => {
            if (passwordRef?.current?.focus) {
              passwordRef.current.focus();
            }
          }}
          onChangeText={(email) => updateUser({email})}
          style={styles.input}
        />
        <Input
          ref={passwordRef}
          icon="lock"
          placeholder="Senha"
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          secureTextEntry={true}
          maxLength={20}
          value={user?.password || ''}
          onChangeText={(password) => updateUser({password})}
        />
        <Button
          style={[styles.button, styles.formPad]}
          text="Entrar"
          loading={loading === 'login'}
          onPress={handleLogin}
        />
        <Button
          style={styles.button}
          text="Cadastrar"
          type="outline"
          loading={loading === 'register'}
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
