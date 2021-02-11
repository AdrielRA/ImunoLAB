import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TextInputProps} from 'react-native';

export type Props<T extends keyof RouteParamsList> = {
  navigation: StackNavigationProp<RouteParamsList, T>;
  route: RouteProp<RouteParamsList, T>;
};

// ========== componentes ========== \\
export type InputProps = TextInputProps & {
  color?: 'primary' | 'dark' | 'light';
  type?: 'text' | 'email' | 'password' | 'number';
  icon: string;
};
