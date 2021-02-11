import database from '@react-native-firebase/database';

const getExperiments = () =>
  new Promise<Experiment[]>((resolve, reject) => {
    database()
      .ref()
      .child('experiments')
      .once('value')
      .then((snap) => {
        const res = Object.entries(snap.val()).map(([k, v]) => {
          let val: Experiment = v as Experiment;
          return {...val, id: k};
        });

        resolve(res);
      })
      .catch(reject);
  });

export {getExperiments};
