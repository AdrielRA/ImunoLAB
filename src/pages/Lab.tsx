import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ScrollView,
  useColorScheme,
  Alert,
  StatusBar,
  TouchableOpacity as TouchableOpacityRN,
  Dimensions,
  Linking,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, Button} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../assets/theme.json';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import UnityView, {
  MessageHandler,
  UnityModule,
  UnityViewMessage,
} from 'react-native-unity-view';
import {Experiment} from '../controllers';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const {params} = useRoute<RouteProp<RouteParamsList, 'Lab'>>();
  const [experiment, setExperiment] = useState<Experiment>();
  const colorScheme = useColorScheme();
  const [showCarousel, setShowCarousel] = useState(true);
  const [showStepDetail, setShowStepDetail] = useState(false);
  const [theEnd, setTheEnd] = useState(false);
  const [step, setStep] = useState<ExStep>();
  const [cursor, setCursor] = useState(0);
  const [stepKey, setStepKey] = useState<string>();
  const [stepInfo, setStepInfo] = useState<Step>();
  const [loadStepInfo, setLoadStepInfo] = useState(false);
  const [paused, setPaused] = useState(false);

  const handleModal = () => setPaused(!paused);
  const handleCancel = () => {
    setPaused(false);
    navigation.goBack();
  };

  useEffect(() => {
    if (paused) {
      UnityModule.pause();
    } else {
      UnityModule.resume();
    }
  }, [paused]);

  useEffect(() => {
    setExperiment(params.experiment);
  }, [params]);

  useEffect(() => {
    if (experiment) {
      setStep(experiment?.steps[cursor]);
      setStepKey(experiment.steps[cursor].key);
    }
  }, [experiment, cursor]);

  useEffect(() => {
    if (stepKey) {
      postToUnity({
        name: 'nextStep',
        data: {stepKey},
      });
    }
  }, [stepKey]);

  useEffect(() => {
    if (stepKey) {
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

  const unity = useRef(null);

  const postToUnity = ({name, data, callBack}: UnityViewMessage) => {
    if (unity) {
      UnityModule.postMessageToUnityManager({
        name,
        data,
        callBack,
      });
    }
  };

  const handleUnityMessage = (handler: MessageHandler) => {
    console.log(handler.data);
    switch (handler.name) {
      case 'progress':
        console.log('Progresso:', handler.data);
        break;
      case 'stepLoad':
        console.log('Carregamento:', handler.data);
        break;
      default:
        break;
    }

    setTimeout(() => handler.send({status: 'ok'}), 500);
  };

  const handleBot = () => {
    if (step?.bot) {
      let index = Math.floor(Math.random() * (step.bot.length - 0) + 0);
      Alert.alert('🤖 ImunoBOT: Dica', step.bot[index]);
    }
  };

  const handleNext = (option?: number) => {
    if (loadStepInfo) {
      return;
    }
    switch (step?.type) {
      // case 'queue':
      //   if (step.next.length > 0) {
      //     let next = step.next;
      //     setStepKey(next.shift());
      //     setStep({...step, next} as ExStep);
      //   }
      //   break;
      case 'choice':
        setCursor(
          (prev) => prev + (step?.next as NextType[])[option || 0]?.index || 0,
        );
        break;
      case 'end':
        setTheEnd(true);
        break;
      case 'jump':
        setCursor((prev) => prev + (step?.next as number));
        break;
      // case 'loop':
      //   if (stepKey && step.next.length > 0) {
      //     let nextIndex = loops[stepKey] ? loops[stepKey] : 0;
      //     console.log(nextIndex);
      //     setStepKey(step.next[nextIndex]);
      //     let index = (loops[stepKey] || 0) + 1;
      //     index = index > step.next.length ? 0 : index;
      //     setLoops((prev: any) => ({
      //       ...prev,
      //       [stepKey]: index,
      //     }));
      //   }
      //   break;

      default:
        setCursor((prev) => prev + 1);
        break;
    }
  };

  const carouselPage = ({item, index}) => {
    return (
      <View style={stylesCarousel.slide}>
        <Icon
          name={item.icon}
          color={theme.colors.primary}
          size={150}
          onPress={handleModal}
        />
        <Text style={stylesCarousel.title}>{item.title}</Text>
        {item.key !== 'guide' ? (
          <Text>{(experiment as any)[item.key] || item.text}</Text>
        ) : (
          <Button
            text="Baixar o material"
            style={stylesCarousel.btn}
            onPress={() => Linking.openURL((experiment as any)[item.key])}
          />
        )}

        {index === carouselData.length - 1 && (
          <Button
            text="Começar"
            style={stylesCarousel.btn}
            onPress={() => setShowCarousel(false)}
          />
        )}
      </View>
    );
  };

  const [activeSlide, setActiveSlide] = useState(0);

  const carouselData = [
    {key: 'objetive', title: 'Objetivos do experimento', icon: 'bullseye'},
    {key: 'principleOfAction', title: 'Principio Ativo', icon: 'atom'},
    {key: 'supplies', title: 'Materiais necessários', icon: 'vials'},
    {key: 'guide', title: 'Material complementar', icon: 'file-pdf'},
    {
      key: 'start',
      title: 'Hora de começar!',
      icon: 'play',
      text: 'Prepare-se, e bom experimento!',
    },
  ];

  return (
    <View style={styles.page}>
      <StatusBar backgroundColor={theme.colors.primary} />
      {showCarousel ? (
        <>
          <Carousel
            data={carouselData}
            renderItem={carouselPage}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            onSnapToItem={(index: number) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={carouselData.length}
            activeDotIndex={activeSlide}
            containerStyle={stylesCarousel.pagination}
            dotStyle={stylesCarousel.dotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </>
      ) : (
        <>
          <Modal visible={paused} animationType="fade" transparent={true}>
            <TouchableOpacityRN onPress={handleModal} style={stylesModal.bg}>
              <View
                style={[
                  stylesModal.container,
                  colorScheme === 'light'
                    ? stylesModal.light
                    : stylesModal.dark,
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

          <View
            style={[styles.stepContainer, showStepDetail && styles.stepDetail]}>
            {!paused && (
              <>
                {step?.bot && (
                  <View style={styles.btnBotContainer}>
                    <TouchableOpacity style={styles.btnBot} onPress={handleBot}>
                      <Icon name="robot" color={theme.colors.light} size={15} />
                      <Text weight="black" color="light">
                        DICA
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
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
                        {(step.next as NextType[]).map((option, index) => (
                          <Button
                            style={styles.btnNext}
                            key={option.index}
                            text={option.text}
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
        </>
      )}
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
    textAlign: 'center',
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

const stylesCarousel = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontWeight: '700',
    fontSize: 25,
    textTransform: 'uppercase',
    marginTop: 30,
    marginBottom: 15,
  },
  btn: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
  pagination: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
});

export default Home;
