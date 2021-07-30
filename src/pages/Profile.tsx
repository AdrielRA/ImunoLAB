import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native';
import {Logo, Input, Text, Button} from '../components';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';

import {Profile} from '../controllers';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const {params} = useRoute<RouteProp<RouteParamsList, 'Profile'>>();

  const [profileInfo, setProfileInfo] = useState<Profile>();

  const courseRef = useRef<InputProps>(null);
  const periodRef = useRef<InputProps>(null);

  useEffect(() => {
    Profile.getInfo(params.uid).then(setProfileInfo);
  }, [params.uid]);

  const handleSave = () => {
    if (profileInfo) {
      Profile.updateInfo(params.uid, profileInfo)
        .then(() => {
          if (params.isNew) {
            navigation.reset({
              index: 0,
              routes: [{name: 'Home', params: {uid: params.uid}}],
            });
          } else {
            navigation.goBack();
          }
        })
        .catch((err: Error) => {
          Alert.alert('Algo deu errado:', err.message);
        });
    } else {
      Alert.alert('Atenção:', 'Informe todos os campos!');
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <Logo />
        <Text style={styles.subtitle}>Simulador de Laboratório</Text>
        <Text style={styles.subtitle} weight="black">
          IMUNOLOGIA
        </Text>
      </View>
      <Text style={styles.info} weight="bold">
        Projeto de Iniciação Científica
      </Text>
      <View>
        <Text weight="extra-bold">AUTORES</Text>
        <Text>Aluno: Adriel Ricardo Azevedo</Text>
        <Text>Agradecimentos: Prof. Dr. Bruno Salles</Text>
        <Text>Orientadora: Profª. Dra. Flávia Aparecida Oliveira Santos</Text>
      </View>
      <View>
        <Input
          icon="user-alt"
          returnKeyType="next"
          placeholder="Seu nome"
          value={profileInfo?.name}
          onEndEditing={() => {
            if (courseRef?.current?.focus) {
              courseRef.current.focus();
            }
          }}
          onChangeText={(name) => setProfileInfo({...profileInfo, name})}
        />
        <View style={styles.inlineInputs}>
          <Input
            ref={courseRef}
            icon="graduation-cap"
            placeholder="Curso"
            returnKeyType="next"
            style={styles.inputCurse}
            value={profileInfo?.course}
            onEndEditing={() => {
              if (periodRef?.current?.focus) {
                periodRef.current.focus();
              }
            }}
            onChangeText={(course) => setProfileInfo({...profileInfo, course})}
          />
          <Input
            ref={periodRef}
            icon="user-graduate"
            placeholder="Período"
            style={styles.inputPeriod}
            keyboardType="number-pad"
            value={profileInfo?.period?.toString()}
            onChangeText={(period) =>
              setProfileInfo({...profileInfo, period: +period})
            }
          />
        </View>
        <Button text="Salvar" onPress={handleSave} />
        {!params.isNew && (
          <Button
            text="Cancelar"
            type="outline"
            style={styles.btnCancel}
            onPress={handleCancel}
          />
        )}
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
  page: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 15,
    paddingBottom: 30,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 25,
  },
  info: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
  inlineInputs: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 15,
  },
  inputCurse: {
    width: '57.5%',
    marginRight: '2%',
  },
  inputPeriod: {
    width: '40%',
  },
  btnCancel: {
    marginTop: 10,
  },
  btnUnifenas: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unifenas: {
    height: 50,
    resizeMode: 'contain',
  },
});

export default Home;
