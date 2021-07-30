declare module '*.json' {
  const value: any;
  export default value;
}

type RouteParamsList = {
  Home: {uid: string};
  Lab: {uid: string; experiment: Experiment};
  Login: undefined;
  Profile: {uid: string; isNew: boolean};
};

type Props<T extends keyof RouteParamsList> = {
  navigation: import('@react-navigation/stack').StackNavigationProp<
    RouteParamsList,
    T
  >;
  route: import('@react-navigation/native').RouteProp<RouteParamsList, T>;
};

// ========== componentes ========== \\
type InputProps = import('react-native').TextInputProps & {
  color?: 'primary' | 'dark' | 'light';
  type?: 'text' | 'email' | 'password' | 'number';
  icon: string;
  ref?: React.Ref<InputProps>;
  focus?: () => void;
};

type User = {
  uid?: string;
  email: string;
  password: string;
};

type Profile = {
  name?: string;
  course?: string;
  period?: number;
};

declare enum Difficulty {
  easy = 'easy',
  normal = 'normal',
  middle = 'middle',
  hard = 'hard',
}

type Experiment = {
  banner: string;
  description: string;
  difficulty: Difficulty;
  guide: string;
  id: string;
  meaning: string;
  name: string;
  objetive: string;
  principleOfAction: string;
  ref: string;
  referenceValue: string;
  resources: string[];
  results: Result[];
  sample: string;
  start: string;
  steps: any;
  supplies: string;
  technique: Technique[];
};

type Result = {
  info: string;
  result: string;
};

type Technique = {
  description: string;
  name: string;
};

type ExStep = {
  bot?: string[];
  next: string[] | any[];
  type: StepType;
};

type StepType = 'next' | 'queue' | 'choice' | 'loop';

type Step = {id: string; detail: string; title: string};
