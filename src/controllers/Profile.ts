import database from '@react-native-firebase/database';

const updateInfo = (uid: string, info: Profile) =>
  database().ref().child(`users/${uid}`).set(info);

const getInfo = (uid: string) =>
  new Promise<Profile>((resolve, reject) => {
    database()
      .ref()
      .child(`users/${uid}`)
      .once('value')
      .then((res) => resolve(res.val()))
      .catch(reject);
  });

export {getInfo, updateInfo};
