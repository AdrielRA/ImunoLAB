import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {User} from '../@types/Auth';

const login = (user: User) => {
  return auth().signInWithEmailAndPassword(user.email, user.password);
};

const createUser = (user: User) => {
  return auth().createUserWithEmailAndPassword(user.email, user.password);
};

const logout = () => {
  return auth().signOut();
};

const onAuthChange = (listener: FirebaseAuthTypes.AuthListenerCallback) =>
  auth().onAuthStateChanged(listener);

export {createUser, login, logout, onAuthChange};
