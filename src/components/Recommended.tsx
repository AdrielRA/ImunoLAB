import React /*, {useState, useEffect, useRef} */ from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacityProps,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text} from '../components';
import theme from '../assets/theme.json';

type Difficulty = 'easy' | 'normal' | 'middle' | 'hard';

type Experiment = {
  title: string;
  description: string;
  difficulty: Difficulty;
};

type Props = TouchableOpacityProps & {
  experiment: Experiment;
};

const Recommended: React.FC<Props> = (props) => {
  const {title, description} = props.experiment;

  return (
    <TouchableOpacity {...props} style={styles.trendingTop}>
      <View style={styles.trendingTopGrid}>
        <Text
          weight="black"
          color="light"
          numberOfLines={1}
          style={styles.txtTitle}>
          {title}
        </Text>
        <Text color="light" numberOfLines={5}>
          {description}
        </Text>
      </View>
      <Image
        style={[styles.trendingTopImg]}
        resizeMode="cover"
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/f/f0/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006_edit_1.jpg',
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trendingTop: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: theme.colors.primary,
    width: '100%',
    height: 150,
    flexDirection: 'row',
  },
  trendingTopGrid: {
    maxWidth: '50%',
  },
  trendingTopImg: {
    marginLeft: '2%',
    height: '100%',
    width: '48%',
    backgroundColor: '#8c3',
  },
  txtTitle: {
    textTransform: 'uppercase',
  },
});

export default Recommended;
