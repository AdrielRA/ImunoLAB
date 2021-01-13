import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {User} from '../@types/Auth';

const login = (user: User) =>
  auth().signInWithEmailAndPassword(user.email, user.password);

const createUser = (user: User) =>
  auth().createUserWithEmailAndPassword(user.email, user.password);

const logout = () => {
  return auth().signOut();
};

const onAuthChange = (listener: FirebaseAuthTypes.AuthListenerCallback) =>
  auth().onAuthStateChanged(listener);

export {createUser, login, logout, onAuthChange};
