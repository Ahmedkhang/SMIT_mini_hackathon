  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"

  // import { push,set,ref } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"
  import  { getDatabase,push,ref,get,onValue } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js"
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
  
init()
}

window.logout = () => {
  signOut(auth).then(() => {
     alert('Logout Succcessful!!')
     window.location.replace('/login/login.html')
  }).
  catch((err) => {
    alert('Something went wrong!!',err)
  })
}



window.getUserAppointment = () => {

  let currentUser = null
  
  onAuthStateChanged(auth,(user) =>{
    if(user){

    currentUser = user
    logoutBtn.style.display = 'inline-block';
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
      // console.log('Uid',user.uid);
      
        let appointment_container = document.getElementById('appointment-container')
        let path = ref(db,`/appointments/${currentUser.uid}`)
        
        onValue(path,(snapshot) => {
          appointment_container.innerHTML = ""
          snapshot.forEach((items) => {
              let data = items.val()
      
              appointment_container.innerHTML += `
              <tr class="hover:bg-gray-100 transition">
  <td class="py-2 px-2 md:px-4">${data.doctor}</td>
  <td class="py-2 px-2 md:px-4">${data.bookingTime}</td>
  <td class="py-2 px-2 md:px-4">${data.visitReason}</td>
  <td class="py-2 px-2 md:px-4 font-semibold text-blue-600">${data.status}</td>
   <td>
        <button class="bg-blue-500 text-white px-2 py-1 rounded" onclick="editAppointment('${items.key}')">Edit</button>
      </td>
</tr>
     `         
          })
        })
      
    }else{
      alert('PLease Login First!!')
         logoutBtn.style.display = 'none';
    loginBtn.style.display = 'inline-block';
    signupBtn.style.display = 'inline-block';
 
      window.location.replace('../login/login.html')
    }
  })


}
getUserAppointment()

window.editAppointment = (id) => {
  localStorage.setItem("editId", id);
  window.location.href = "../appointment/appointment.html"; // go to booking page
}