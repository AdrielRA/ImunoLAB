import React from 'react';
import {
  Text as TextRN,
  StyleSheet,
  useColorScheme,
  TextProps,
} from 'react-native';
import theme from '../assets/theme.json';

type Props = TextProps & {
  color?: 'primary' | 'dark' | 'light';
  weight?:
    | 'regular'
    | 'black'
    | 'bold'
    | 'extra-bold'
    | 'semi-bold'
    | 'light'
    | 'extra-light'
    | 'medium'
    | 'thin';
};

const Text: React.FC<Props> = (props) => {
  const colorScheme = useColorScheme();

  const {children, weight, color, style} = props;

  let style_ = {
    color: {},
    weight: {},
  };

  switch (weight) {
    case 'black':
      style_.weight = fontFamily.black;
      break;
    case 'bold':
      style_.weight = fontFamily.bold;
      break;
    case 'extra-bold':
      style_.weight = fontFamily['extra-bold'];
      break;
    case 'extra-light':
      style_.weight = fontFamily['extra-light'];
      break;
    case 'light':
      style_.weight = fontFamily.light;
      break;
    case 'medium':
      style_.weight = fontFamily.medium;
      break;
    case 'regular':
      style_.weight = fontFamily.regular;
      break;
    case 'semi-bold':
      style_.weight = fontFamily['semi-bold'];
      break;
    case 'thin':
      style_.weight = fontFamily.thin;
      break;
    default:
      style_.weight = fontFamily.regular;
      break;
  }

  switch (color) {
    case 'primary':
      style_.color = colors.primary;
      break;
    case 'dark':
      style_.color = colors.dark;
      break;
    case 'light':
      style_.color = colors.light;
      break;
    default:
      style_.color = colorScheme === 'light' ? colors.dark : colors.light;
      break;
  }

  return (
    <TextRN {...props} style={[style, style_.weight, style_.color]}>
      {children}
    </TextRN>
  );
};

const fontFamily = StyleSheet.create({
  black: {
    fontFamily: 'Catamaran-Black',
  },
  bold: {
    fontFamily: 'Catamaran-Bold',
  },
  'extra-bold': {
    fontFamily: 'Catamaran-ExtraBold',
  },
  'extra-light': {
    fontFamily: 'Catamaran-ExtraLight',
  },
  light: {
    fontFamily: 'Catamaran-Light',
  },
  medium: {
    fontFamily: 'Catamaran-Medium',
  },
  regular: {
    fontFamily: 'Catamaran-Regular',
  },
  'semi-bold': {
    fontFamily: 'Catamaran-SemiBold',
  },
  thin: {
    fontFamily: 'Catamaran-Thin',
  },
});

const colors = StyleSheet.create({
  primary: {
    color: theme.colors.primary,
  },
  dark: {
    color: theme.colors.dark,
  },
  light: {
    color: theme.colors.light,
  },
});

export default Text;
