import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ScrollView,
  useColorScheme,
  Alert,
  TouchableOpacity as TouchableOpacityRN,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, Button} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../assets/theme.json';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import UnityView, {MessageHandler} from 'react-native-unity-view';
import {Experiment} from '../controllers';

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
  const [theEnd, setTheEnd] = useState(false);
  const [step, setStep] = useState<ExStep>();
  const [stepKey, setStepKey] = useState<string>();
  const [stepInfo, setStepInfo] = useState<Step>();
  const [loadStepInfo, setLoadStepInfo] = useState(false);
  const handleModal = () => setShowModal(!showModal);
  const handleCancel = () => {
    setShowModal(false);
    navigation.goBack();
  };

  useEffect(() => {
    setExperiment(params.experiment);
  }, [params]);

  useEffect(() => {
    if (experiment) {
      setStepKey(experiment.start);
    }
  }, [experiment]);

  useEffect(() => {
    if (stepKey) {
      console.log(stepKey);
      setStep(experiment?.steps[stepKey]);
      setLoadStepInfo(true);
      Experiment.getStepInfo(stepKey).then(setStepInfo);
    }
  }, [experiment, stepKey]);

  useEffect(() => {
    setLoadStepInfo(false);
  }, [stepInfo]);

  useEffect(() => {
    if (theEnd) {
      Alert.alert('Parabéns', 'Você concluiu o experimento');
      navigation.goBack();
    }
  }, [theEnd, navigation]);

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

  const [loops, setLoops] = useState<any>({});

  const handleNext = (option?: number) => {
    console.log(step?.type);
    switch (step?.type) {
      case 'queue':
        if (step.next.length > 0) {
          let next = step.next;
          setStepKey(next.shift());
          setStep({...step, next} as ExStep);
        }
        break;
      case 'choice':
        setStepKey(step.next[option || 0].key);
        break;
      case 'loop':
        if (stepKey && step.next.length > 0) {
          let nextIndex = loops[stepKey] ? loops[stepKey] : 0;
          console.log(nextIndex);
          setStepKey(step.next[nextIndex]);
          let index = (loops[stepKey] || 0) + 1;
          index = index > step.next.length ? 0 : index;
          setLoops((prev: any) => ({
            ...prev,
            [stepKey]: index,
          }));
        }
        break;

      default:
        if (step?.next && step?.next?.length > 0) {
          setStepKey(step?.next[0]);
        } else {
          setTheEnd(true);
        }
        break;
    }
  };

  return (
    <View style={styles.page}>
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
        {!showModal && (
          <>
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
            <Text style={styles.txtStepTitle}>
              {stepInfo?.title || 'TAREFA'}
            </Text>
            <Icon
              name={`chevron-${showStepDetail ? 'down' : 'up'}`}
              color={theme.colors.primary}
              size={30}
              onPress={() => setShowStepDetail(!showStepDetail)}
            />
            {showStepDetail && (
              <ScrollView style={styles.stepDetailArea}>
                <Text style={styles.txtStepDetail}>{stepInfo?.detail}</Text>
                {step?.type !== 'choice' ? (
                  <Button
                    style={styles.btnNext}
                    text="Proximo"
                    loading={loadStepInfo}
                    type="outline"
                    onPress={() => handleNext()}
                  />
                ) : (
                  <View>
                    {step.next.map((option, index) => (
                      <Button
                        style={styles.btnNext}
                        key={option + index}
                        text={option.value}
                        type="outline"
                        onPress={() => handleNext(index)}
                      />
                    ))}
                  </View>
                )}
              </ScrollView>
            )}
          </>
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
  txtStepTitle: {
    fontWeight: '700',
    fontSize: 15,
    textTransform: 'uppercase',
  },
  stepDetail: {
    height: 240,
  },
  txtStepDetail: {textAlign: 'center', paddingVertical: 15},
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
  btnNext: {
    marginTop: 15,
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
