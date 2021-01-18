import {ProfileInfo} from '../@types';
import database from '@react-native-firebase/database';

const updateInfo = (uid: string, info: ProfileInfo) =>
  database().ref().child(`users/${uid}`).set(info);

const getInfo = (uid: string) =>
  new Promise<ProfileInfo>((resolve, reject) => {
    database()
      .ref()
      .child(`users/${uid}`)
      .once('value')
      .then((res) => resolve(res.val()))
      .catch(reject);
  });

export {getInfo, updateInfo};
