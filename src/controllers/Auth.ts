import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const login = (user: User) =>
  auth().signInWithEmailAndPassword(user.email, user.password);

const createUser = (user: User) =>
  new Promise<FirebaseAuthTypes.User>((resolve, reject) => {
    if (user.email.length > 0 && user.password.length > 0) {
      auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => resolve(res.user))
        .catch((err) => reject(err.code));
    } else if (user.password.length > 1) {
      reject('auth/empty-email');
    } else if (user.email.length > 1) {
      reject('auth/empty-password');
    } else {
      reject('auth/empty-entries');
    }
  });

const logout = () => {
  return auth().signOut();
};

const onAuthChange = (listener: FirebaseAuthTypes.AuthListenerCallback) =>
  auth().onAuthStateChanged(listener);

export {createUser, login, logout, onAuthChange};
