
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  // import { push,set,ref } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
  import  { getDatabase,push,ref,get, onValue } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js"
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
  const db = getDatabase()
  const auth = getAuth()


let loginBtn = document.getElementById('login');
let signupBtn = document.getElementById('signup');
let logoutBtn = document.getElementById('logout')  
// let uid;

// let bookNow = () => {
//   window.location.replace('/appointment/appointment.html')
// }
// let doctorsList = document.getElementById('doctorsList')

// doctorsList.innerHTML = `

//   ${doctors.map((items) => {
//     <p>${items}</p>
//   })}

// `

let init = () => {
  let currentUser = null
  
  onAuthStateChanged(auth,(user) =>{
      if (user) {
    currentUser = user;
    logoutBtn.style.display = 'inline-block';
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
  } else {
    logoutBtn.style.display = 'none';
    loginBtn.style.display = 'inline-block';
    signupBtn.style.display = 'inline-block';
  }
});
}  
init()

window.logout = () => {
  signOut(auth).then(() => {
     alert('Logout Succcessful!!')
     window.location.replace('/login/login.html')
  }).
  catch((err) => {
    alert('Something went wrong!!',err)
  })

}
