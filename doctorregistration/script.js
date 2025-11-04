  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  import { getAuth,signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js"

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
  



  let currentUser = null
  let loginBtn = document.getElementById('login');
  let signupBtn = document.getElementById('signup');
  let logoutBtn = document.getElementById('logout')  
  
    
    onAuthStateChanged(auth,(user) =>{
      if(user){
  
        currentUser = user
        
      logoutBtn.style.display = 'inline-block';
      loginBtn.style.display = 'none';
      signupBtn.style.display = 'none';
        // console.log('Uid',user.uid);
        
      }else{
        alert('PLease Login First!!')
      logoutBtn.style.display = 'none';
      loginBtn.style.display = 'inline-block';
      signupBtn.style.display = 'inline-block';
    
        window.location.replace('../login/login.html')
      }
    })
  
  
    
    

    let docId = document.getElementById('id')
    let docName = document.getElementById('name')
    let docAge = document.getElementById('age')
    let docExperience = document.getElementById('experience')
    let docCategory = document.getElementById('category')
    let docTiming = document.getElementById('timing')
    let docDays = document.getElementById('days')

// getting user data values


window.addDoctor = () => {
    const user = auth.currentUser;
    
    
    if(!currentUser){
    alert('Please Login First!!')
    // window.location.replace('../login/login.html')
    return;
  }
  
    let doctorData = {
          id:docId.value,
          name:docName.value,
          age:docAge.value,
          experience:docExperience.value,
          category:docCategory.value,
          timing:docTiming.value,
          days:docDays.value,
      }
  
      console.log(doctorData);
      
  console.log(user.uid);
  const path = ref(db,`/doctors/${currentUser.uid}`)
    push(path,doctorData).
    then(() => {
      alert('Doctor Registered Successfully!!')
      docName.value = ""
      docId.value = ""
      docAge.value =""
      docExperience.value = ""
      docCategory.value = ""
      docTiming.value = ""
      docDays.value = ""
      window.location.replace('../my-appointments/my-appointments.html')
    }).
    catch((err) => {
      alert('Something went wrong',err)
    })
    console.log(doctorData);
    

} 
