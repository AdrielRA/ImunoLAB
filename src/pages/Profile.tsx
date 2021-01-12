import React /*, {useState, useEffect, useRef} */ from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Logo, Input, Text, Button} from '../components';
import {useNavigation} from '@react-navigation/native';

const Home: React.FC = () => {
  const navigation = useNavigation();

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
        <Input icon="user-alt" placeholder="Seu nome" />
        <View style={styles.inlineInputs}>
          <Input
            icon="graduation-cap"
            placeholder="Curso"
            style={styles.inputCurse}
          />
          <Input
            icon="user-graduate"
            placeholder="Período"
            keyboardType="number-pad"
          />
        </View>
        <Button text="Salvar" />
        <Button
          text="Cancelar"
          type="outline"
          style={styles.btnCancel}
          onPress={handleCancel}
        />
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
