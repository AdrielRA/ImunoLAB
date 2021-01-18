import database from '@react-native-firebase/database';
import {Experiment} from '../@types';

const getExperiments = () =>
  new Promise<Experiment[]>((resolve, reject) => {
    database()
      .ref()
      .child('experiments')
      .once('value')
      .then((snap) => {
        const res = Object.entries(snap.val()).map(([k, v]) => {
          let val: Experiment = v as Experiment;
          return {...val, key: k};
        });

        resolve(res);
      })
      .catch(reject);
  });

export {getExperiments};
