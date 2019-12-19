import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCt25Yk8yBwFIdY1-pAY7gVZ92MXnocrCs',
  authDomain: 'wikicrawler-native.firebaseapp.com',
  databaseURL: 'https://wikicrawler-native.firebaseio.com',
  projectId: 'wikicrawler-native',
  storageBucket: 'wikicrawler-native.appspot.com',
  messagingSenderId: '417364865734',
  appId: '1:417364865734:web:71b4cab27608824a0c9dc7',
  measurementId: 'G-L69JJHSNKT',
};
// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

export default Firebase;
