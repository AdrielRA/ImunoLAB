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

        /*
        const res = Object.entries(snap.val()).map(([k, v]) => {
          let item = v as any;
          item.steps = Object.entries(item.steps).map(([k2, v2]) => {
            return {id: k2, ...(v2 as any)} as ExStep;
          });

          let val: Experiment = item as Experiment;
          return {...val, id: k};
        });
        */

        resolve(res);
      })
      .catch(reject);
  });

const getStepInfo = (id: string) =>
  new Promise<Step>((resolve, reject) => {
    database()
      .ref()
      .child('steps')
      .child(id)
      .once('value')
      .then((snap) => resolve({id: snap.key, ...snap.val()} as Step))
      .catch(reject);
  });

export {getExperiments, getStepInfo};
