import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ScrollView,
  useColorScheme,
  TouchableOpacity as TouchableOpacityRN,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, Button} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../assets/theme.json';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import UnityView, {MessageHandler} from 'react-native-unity-view';

type Params = {
  experiment: Experiment;
};

const Home: React.FC = () => {
  const navigation = useNavigation();
  const {params} = useRoute<RouteProp<RouteParamsList, 'Lab'>>();
  const [experiment, setExperiment] = useState<Experiment>();
  const colorScheme = useColorScheme();
  const [showModal, setShowModal] = useState(false);
  const [showStepDetail, setShowStepDetail] = useState(false);
  const handleModal = () => setShowModal(!showModal);
  const handleCancel = () => {
    setShowModal(false);
    navigation.goBack();
  };

  useEffect(() => {
    setExperiment(params.experiment);
  }, [params]);

  //const [active, setActive] = useState(true);
  //const [loading, setLoading] = useState(true);
  //const [paused, setPaused] = useState(false);
  //const [rotate, setRotate] = useState(true);
  const [counter, setCounter] = useState(0);

  const unity = useRef(null);

  /*useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);*/

  /*useEffect(() => {
    if (paused) {
      UnityModule.pause();
    } else {
      UnityModule.resume();
    }
  }, [paused]);*/

  /*const handleActive = () => {
    setActive(!active);
  };*/

  /*const handlePause = () => {
    setPaused(!paused);
  };*/

  /*const onToggleRotate = () => {
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
  };*/

  const handleUnityMessage = (handler: MessageHandler) => {
    setCounter(counter + 1);
    setTimeout(() => {
      handler.send('Sou um callback!');
    }, 2000);
  };

  return (
    <View style={styles.page}>
      {/*<View style={styles.page}>
      {active && (
        <UnityView
          ref={unity}
          onUnityMessage={handleUnityMessage}
          style={[styles.unity /*{opacity: loading ? 0 : 1}]}
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
      </View>*/}
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <TouchableOpacityRN onPress={handleModal} style={stylesModal.bg}>
          <View
            style={[
              stylesModal.container,
              colorScheme === 'light' ? stylesModal.light : stylesModal.dark,
            ]}>
            <Text weight="extra-bold" style={stylesModal.title}>
              MENU
            </Text>
            <Button
              text="Voltar para início"
              type="outline"
              onPress={handleCancel}
            />
          </View>
        </TouchableOpacityRN>
      </Modal>
      <View style={styles.header}>
        <Text weight="black" numberOfLines={1}>
          {experiment?.name.toUpperCase()}
        </Text>
        <Icon
          name="bars"
          color={theme.colors.primary}
          size={25}
          onPress={handleModal}
        />
      </View>
      <UnityView
        ref={unity}
        onUnityMessage={handleUnityMessage}
        style={[styles.unityView]}
      />

      <View style={[styles.stepContainer, showStepDetail && styles.stepDetail]}>
        <View style={styles.btnBotContainer}>
          <TouchableOpacity
            style={styles.btnBot}
            onPress={() => console.log('pressionou')}>
            <Icon name="robot" color={theme.colors.light} size={15} />
            <Text weight="black" color="light">
              DICA
            </Text>
          </TouchableOpacity>
        </View>
        <Text>ATIVIDADE A EXECUTAR</Text>
        <Icon
          name={`chevron-${showStepDetail ? 'down' : 'up'}`}
          color={theme.colors.primary}
          size={30}
          onPress={() => setShowStepDetail(!showStepDetail)}
        />
        {showStepDetail && (
          <ScrollView style={styles.stepDetailArea}>
            <Text>Detalhes</Text>
            <Text>Detalhes</Text>
            <Text>Detalhes</Text>
            <Text>Detalhes</Text>
            <Text>Detalhes</Text>
            <Text>Detalhes</Text>
            <Text>Detalhes</Text>
            <Text>Detalhes</Text>
            <Text>Detalhes</Text>
            <Text>Detalhes</Text>
            <Text>Detalhes</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  unityView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#89d',
  },
  stepContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.2)',
    height: 80,
    position: 'relative',
  },
  stepDetail: {
    height: 240,
  },
  stepDetailArea: {
    width: '100%',
  },
  btnBotContainer: {
    position: 'absolute',
    top: -31,
    right: 0,
    paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    backgroundColor: theme.colors.primary,
    width: '30%',
  },
  btnBot: {
    flexDirection: 'row',
    height: 30,

    justifyContent: 'space-between',

    alignItems: 'center',
  },
});

const stylesModal = StyleSheet.create({
  bg: {
    flex: 1,
    paddingTop: 60,
  },
  container: {
    padding: 15,
    flex: 1,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 10,
  },
  light: {
    backgroundColor: theme.colors.light,
  },
  dark: {
    backgroundColor: theme.colors.dark,
  },
});

export default Home;
