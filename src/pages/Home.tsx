import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import {Logo, Input, ExperimentItem, Recommended, Text} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../assets/theme.json';
import type {Props} from '../@types/Props';

import {Auth, Experiment} from '../controllers';

const Home: React.FC<Props<'Home'>> = ({navigation, route}) => {
  const colorScheme = useColorScheme();
  const {params} = route;

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => setShowModal(!showModal);

  const handleProfile = () => {
    navigation.navigate('Profile', {uid: params.uid, isNew: false});
  };

  const handleLogout = () => {
    Auth.logout().then(() =>
      navigation.reset({index: 0, routes: [{name: 'Login'}]}),
    );
  };

  const [experiments, setExperiments] = useState<Experiment[]>();

  useEffect(() => {
    Experiment.getExperiments().then(setExperiments);
  }, []);

  const onPress = () => {
    if (experiments)
      navigation.navigate('Lab', {experiment: experiments[0], uid: params.uid});
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
      {experiments ? (
        <>
          <Recommended experiment={experiments[0]} onPress={onPress} />
          {experiments.length > 1 && (
            <>
              <Input
                icon="search"
                placeholder="Pesquisar"
                style={styles.search}
              />
              <FlatList
                data={experiments.filter((_, i) => i !== 0)}
                keyExtractor={(item) => JSON.stringify(item)}
                renderItem={({item}) => (
                  <ExperimentItem experiment={item} onPress={onPress} />
                )}
              />
            </>
          )}
        </>
      ) : (
        <ActivityIndicator color={theme.colors.primary} size="large" />
      )}
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
