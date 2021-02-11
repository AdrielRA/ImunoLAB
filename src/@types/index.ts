type RouteParamsList = {
  Home: {uid: string};
  Lab: {uid: string; experiment: Experiment};
  Login: undefined;
  Profile: {uid: string; isNew: boolean};
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

type Experiment = {
  banner: string;
  description: string;
  difficulty: 'easy' | 'normal' | 'middle' | 'hard';
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
  id: string;
  bot?: string[];
  choice?: string[];
  next?: string;
  queue?: string[];
};

type Step = {
  [id: string]: {
    detail: string;
    title: string;
  };
};
