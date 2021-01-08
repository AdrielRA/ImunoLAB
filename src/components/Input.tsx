import React from 'react';
import {
  TextInput as TextInputRN,
  TextInputProps,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import theme from '../assets/theme.json';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = TextInputProps & {
  color?: 'primary' | 'dark' | 'light';
  type?: 'text' | 'email' | 'password' | 'number';
  icon: string;
};

const Input: React.FC<Props> = (props) => {
  const colorScheme = useColorScheme();

  const {children, type, style, icon} = props;

  switch (type) {
    case 'email':
      break;
    case 'number':
      break;
    case 'password':
      break;
    default:
      break;
  }

  return (
    <View
      style={[
        style,
        styles.container,
        colorScheme === 'dark' ? styles.borderLight : styles.borderDark,
      ]}>
      <Icon name={icon} size={30} color={theme.colors.primary} />
      <TextInputRN
        {...props}
        style={styles.input}
        placeholderTextColor={theme.colors.primary}>
        {children}
      </TextInputRN>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    paddingLeft: 10,
    fontSize: 20,
    fontFamily: 'Catamaran-Bold',
    color: theme.colors.primary,
  },
  borderLight: {
    borderColor: theme.colors.light,
  },
  borderDark: {
    borderColor: theme.colors.dark,
  },
});

export default Input;
