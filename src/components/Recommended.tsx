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
type Props = TouchableOpacityProps & {
  experiment: Experiment;
};

const Recommended: React.FC<Props> = (props) => {
  const {name, description, banner} = props.experiment;

  return (
    <TouchableOpacity {...props} style={styles.trendingTop}>
      <View style={styles.trendingTopGrid}>
        <Text
          weight="black"
          color="light"
          numberOfLines={1}
          style={styles.txtTitle}>
          {name}
        </Text>
        <Text color="light" numberOfLines={5}>
          {description}
        </Text>
      </View>
      <Image
        style={[styles.trendingTopImg]}
        resizeMode="cover"
        source={{
          uri: banner,
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
  },
  txtTitle: {
    textTransform: 'uppercase',
  },
});

export default Recommended;
