import firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyBgqfWC92TY8nGB_Et_VEH5rMZ9-YLAh1E",
  authDomain: "labworks-527db.firebaseapp.com",
  databaseURL: "https://labworks-527db.firebaseio.com",
  projectId: "labworks-527db",
  storageBucket: "labworks-527db.appspot.com",
  messagingSenderId: "625665516072",
  appId: "1:625665516072:web:bc64f4af8dfa19eb350b1d"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;

export const db = firebaseApp.database();
