import React /*, {useState, useEffect, useRef} */ from 'react';
import {
  StyleSheet,
  View,
  useColorScheme,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {Text} from '../components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import theme from '../assets/theme.json';

type Props = TouchableOpacityProps & {
  experiment: Experiment;
};

const Item: React.FC<Props> = (props) => {
  const {name, description, difficulty} = props.experiment;

  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.container,
        colorScheme === 'dark' ? styles.borderLight : styles.borderDark,
      ]}>
      <View style={diffStyle(difficulty).indicator} />
      <View style={styles.textArea}>
        <Text weight="black" numberOfLines={1} style={styles.txtTitle}>
          {name}
        </Text>
        <Text style={styles.txtDescription} numberOfLines={3}>
          {description}
        </Text>
      </View>
      <View style={styles.btnsContainer}>
        <Icon name="star" color={theme.colors.primary} size={20} solid />
        <Icon name="info-circle" color={theme.colors.primary} size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    height: 100,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderLight: {
    borderColor: theme.colors.light,
  },
  borderDark: {
    borderColor: theme.colors.dark,
  },
  textArea: {
    padding: 10,
    paddingRight: 0,
    height: '100%',
    maxWidth: '85%',
  },
  txtTitle: {
    textTransform: 'uppercase',
  },
  txtDescription: {
    fontSize: 12,
  },
  btnsContainer: {
    width: '12%',
    height: '60%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const diffStyle = (difficulty: Difficulty) =>
  StyleSheet.create({
    indicator: {
      width: 10,
      height: '100%',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor:
        difficulty === 'easy'
          ? theme.colors.easy
          : difficulty === 'normal'
          ? theme.colors.normal
          : difficulty === 'middle'
          ? theme.colors.middle
          : theme.colors.hard,
    },
  });

export default Item;
