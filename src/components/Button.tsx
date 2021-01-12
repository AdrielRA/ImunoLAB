import React from 'react';
import {
  TouchableOpacity as TouchableOpacityRN,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import theme from '../assets/theme.json';
import Text from './Text';

type Props = TouchableOpacityProps & {
  type?: 'contained' | 'outline';
  text: string;
};

const Button: React.FC<Props> = (props) => {
  const {style, type, text} = props;

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
    </TouchableOpacityRN>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 45,
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
});

export default Button;
