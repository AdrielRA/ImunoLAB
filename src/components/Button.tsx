import React from 'react';
import {
  TouchableOpacity as TouchableOpacityRN,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import theme from '../assets/theme.json';
import Text from './Text';

type Props = TouchableOpacityProps & {
  type?: 'contained' | 'outline';
  text: string;
  loading?: boolean;
};

const Button: React.FC<Props> = (props) => {
  const {style, type, text, loading} = props;

  return (
    <TouchableOpacityRN
      {...props}
      style={[
        style,
        styles.button,
        type === 'outline' ? styles.outline : styles.container,
      ]}>
      <Text
        weight="black"
        color={type === 'outline' ? 'primary' : 'light'}
        style={styles.txt}>
        {text.toUpperCase()}
      </Text>
      {loading && (
        <ActivityIndicator
          style={styles.load}
          color={type === 'outline' ? theme.colors.primary : theme.colors.light}
        />
      )}
    </TouchableOpacityRN>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  container: {
    backgroundColor: theme.colors.primary,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  txt: {
    fontSize: 20,
  },
  load: {
    marginLeft: 10,
  },
});

export default Button;
