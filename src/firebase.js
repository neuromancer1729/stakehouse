import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCxJNcStq_J5eMLbyyxdaHCHd_HNkMraF4",
    authDomain: "stakehouse-fefe8.firebaseapp.com",
    databaseURL: "https://stakehouse-fefe8.firebaseio.com",
    projectId: "stakehouse-fefe8",
    storageBucket: "stakehouse-fefe8.appspot.com",
    messagingSenderId: "147211157095",
    appId: "1:147211157095:web:a766ece2ec0924e3445ec2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;