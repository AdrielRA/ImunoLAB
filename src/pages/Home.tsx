import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import {Logo, Input, ExperimentItem, Recommended, Text} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../assets/theme.json';
import {useNavigation} from '@react-navigation/native';

type Experiment = {
  title: string;
  description: string;
  difficulty: 'easy' | 'normal' | 'middle' | 'hard';
};

const Home: React.FC = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => setShowModal(!showModal);

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleLogout = () => {
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  const experiments: Experiment[] = [
    {
      title: 'Procedimento laboratorial',
      description:
        'Finalidade e detalhes do procedimento em questão etc etc alguma coisa importante sobre o procedimento e coisas que despertam interesse do aluno em realizar o procedimento no laboratório virtual de imunologia, treinando suas habilidades.',
      difficulty: 'easy',
    },
    {
      title: 'Procedimento imunológico 1',
      description:
        'Finalidade e detalhes do procedimento em questão etc etc alguma coisa importante sobre o procedimento e coisas que despertam interesse do aluno.',
      difficulty: 'easy',
    },
    {
      title: 'Procedimento imunológico 2',
      description: 'Finalidade e detalhes do procedimento em questão etc.',
      difficulty: 'normal',
    },
    {
      title: 'Procedimento imunológico 3',
      description: 'Finalidade e detalhes do procedimento 3 em questão etc.',
      difficulty: 'middle',
    },
    {
      title: 'Procedimento imunológico 4',
      description: 'Finalidade e detalhes do procedimento 4 em questão etc.',
      difficulty: 'hard',
    },
  ];

  const onPress = () => {
    navigation.navigate('Lab');
  };

  return (
    <View style={styles.page}>
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <TouchableOpacity onPress={handleModal} style={stylesModal.bg}>
          <View
            style={[
              stylesModal.container,
              colorScheme === 'light' ? stylesModal.light : stylesModal.dark,
            ]}>
            <Text weight="extra-bold">Notificações</Text>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.header}>
        <Logo size={30} />
        <View style={[styles.header, styles.headerBtnContainer]}>
          <Icon
            name="bell"
            style={styles.headerBtn}
            solid
            onPress={handleModal}
          />
          <Icon
            name="user"
            style={styles.headerBtn}
            solid
            onPress={handleProfile}
          />
          <Icon
            name="power-off"
            style={styles.headerBtn}
            onPress={handleLogout}
          />
        </View>
      </View>
      <Recommended experiment={experiments[0]} onPress={onPress} />
      <Input icon="search" placeholder="Pesquisar" style={styles.search} />
      <FlatList
        data={experiments.filter((_, i) => i !== 0)}
        keyExtractor={(item) => JSON.stringify(item)}
        renderItem={({item}) => (
          <ExperimentItem experiment={item} onPress={onPress} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {paddingHorizontal: 15, maxHeight: '100%'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  headerBtnContainer: {
    width: '35%',
  },
  headerBtn: {
    width: 30,
    height: 30,
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 30,
    color: theme.colors.light,
    backgroundColor: theme.colors.primary,
  },
  search: {
    marginVertical: 15,
  },
});

const stylesModal = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    margin: 15,
    padding: 10,
    borderRadius: 10,
    marginTop: 60,
    flex: 1,
  },
  light: {
    backgroundColor: theme.colors.light,
  },
  dark: {
    backgroundColor: theme.colors.dark,
  },
});

export default Home;
