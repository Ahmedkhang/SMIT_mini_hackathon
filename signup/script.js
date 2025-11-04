  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  // import { push,set,ref } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
  import  { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBqCQBJVTsNMepbaTIwwIKl4Vxd6tDPIMg",
    authDomain: "doctorappointmentapp-ccfd3.firebaseapp.com",
    projectId: "doctorappointmentapp-ccfd3",
    storageBucket: "doctorappointmentapp-ccfd3.firebasestorage.app",
    messagingSenderId: "139597527941",
    appId: "1:139597527941:web:1b7e01fd6a58c3569c62ec",
    measurementId: "G-B2GZG2VG4M"
  };
  

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  
  // getting user email and password

  let email  = document.getElementById('email')
  let password  = document.getElementById('password')
  window.signup = () => {

    
     let user_obj = {
      userEmail:email.value,
      userPassword:password.value,
     }

     createUserWithEmailAndPassword(auth,user_obj.userEmail,user_obj.userPassword).
     then((res) => {
      console.log(res);
      window.location.replace('../login/login.html')
      
     }).
     catch((err) => {
      console.log(err);                                                                                                                                                                                        
      
     })

  }
