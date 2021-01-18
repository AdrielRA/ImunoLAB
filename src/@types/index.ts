import * as TAuth from './Auth';

export {TAuth};

export type ProfileInfo = {
  name?: string;
  course?: string;
  period?: number;
};

type result = {
  info: string;
  result: string;
};

type technique = {
  description: string;
  name: string;
};

export type Experiment = {
  banner: string;
  description: string;
  difficulty: 'easy' | 'normal' | 'middle' | 'hard';
  guide: string;
  key?: stirng;
  meaning: string;
  name: string;
  objetive: string;
  principleOfAction: string;
  ref: string;
  referenceValue: string;
  resources: string[];
  results: result[];
  sample: string;
  supplies: string;
  technique: technique[];
};
