/**
 * @format
 */

import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, Alert, View} from 'react-native';
import UnityView, {UnityModule, MessageHandler} from 'react-native-unity-view';

const Home: React.FC = () => {
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [rotate, setRotate] = useState(true);
  const [counter, setCounter] = useState(0);

  const unity = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if (paused) {
      UnityModule.pause();
    } else {
      UnityModule.resume();
    }
  }, [paused]);

  const handleActive = () => {
    setActive(!active);
  };

  const handlePause = () => {
    setPaused(!paused);
  };

  const onToggleRotate = () => {
    if (unity) {
      setRotate(!rotate);
      UnityModule.postMessageToUnityManager({
        name: 'ToggleRotate',
        data: '',
        callBack: (data) => {
          console.log('Tip', JSON.stringify(data));
        },
      });
    } else {
      Alert.alert('Falhou');
    }
  };

  const handleUnityMessage = (handler: MessageHandler) => {
    setCounter(counter + 1);
    setTimeout(() => {
      handler.send('Sou um callback!');
    }, 2000);
  };

  return (
    <View style={styles.page}>
      {active && (
        <UnityView
          ref={unity}
          onUnityMessage={handleUnityMessage}
          style={[styles.unity, {opacity: loading ? 0 : 1}]}
        />
      )}

      <Text style={styles.txt}>Bem vindo ao React Native com UNITY!</Text>
      <Text style={styles.txt}>Contador de Clicks: {counter}</Text>
      <TouchableOpacity style={styles.btn} onPress={handleActive}>
        <Text style={styles.btnTxt}>
          {active ? 'Desativar' : loading ? 'Carregando' : 'Ativar'} UNITY
        </Text>
      </TouchableOpacity>
      {active && !loading && (
        <>
          <TouchableOpacity style={styles.btn} onPress={onToggleRotate}>
            <Text style={styles.btnTxt}>
              {rotate ? 'Desativar' : 'Ativar'} Rotação
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handlePause}>
            <Text style={styles.btnTxt}>{paused ? 'Continuar' : 'Pausar'}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: '#212125',
  },
  btn: {
    backgroundColor: '#239D60',
    borderRadius: 5,
    paddingVertical: 10,
    width: '50%',
    alignItems: 'center',
    marginVertical: 5,
  },
  btnTxt: {
    color: '#fff',
  },
  unity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default Home;
