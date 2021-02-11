import React from 'react';
import {
  TextInput as TextInputRN,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import theme from '../assets/theme.json';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {InputProps} from '../@types/Props';

const Input: React.FC<InputProps> = React.forwardRef((props, ref) => {
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
      <Icon
        name={icon}
        size={30}
        color={theme.colors.primary}
        style={styles.icon}
      />
      <TextInputRN
        {...props}
        ref={ref}
        style={styles.input}
        placeholderTextColor={theme.colors.primary}>
        {children}
      </TextInputRN>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    width: '12%',
  },
  input: {
    fontSize: 20,
    fontFamily: 'Catamaran-Bold',
    color: theme.colors.primary,
    width: '91%',
  },
  borderLight: {
    borderColor: theme.colors.light,
  },
  borderDark: {
    borderColor: theme.colors.dark,
  },
});

export default Input;
