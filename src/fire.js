import firebase from 'firebase'

var config = {
   apiKey: "AIzaSyC7Sx6bxi_Ztfos3_XX6jNhXY8OkjQ6ROE",
   authDomain: "meditation-app-bc657.firebaseapp.com",
   databaseURL: "https://meditation-app-bc657.firebaseio.com",
   projectId: "meditation-app-bc657",
   storageBucket: "meditation-app-bc657.appspot.com",
   messagingSenderId: "709294975139"
 };
 const fire = firebase.initializeApp(config)
 export default fire
