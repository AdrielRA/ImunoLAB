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
  focus?: () => void;
  icon: string;
  ref?: React.Ref<InputProps>;
  type?: 'text' | 'email' | 'password' | 'number';
};

type User = {
  email: string;
  password: string;
  uid?: string;
};

type Profile = {
  course?: string;
  name?: string;
  period?: number;
};

declare enum Difficulty {
  easy = 'easy',
  hard = 'hard',
  middle = 'middle',
  normal = 'normal',
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
  steps: ExStep[];
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
  key: string;
  next?: NextType[] | number;
  type: StepType;
};

type StepType = 'choice' | 'end' | 'jump' | 'next';
type NextType = {index: number; text: string};

type Step = {detail: string; id: string; title: string};
