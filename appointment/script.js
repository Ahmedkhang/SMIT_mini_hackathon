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


  
// getting user data values

let patientName = document.getElementById('name')
let selectedDoctor = document.getElementById('select')
let datetime = document.getElementById('datetime')
let reason = document.getElementById('reason')
let isFormVisible = document.getElementById('form')
let doctorsList = document.getElementById('doctorsList')



// let editId = localStorage.getItem("editId");

// if (editId) {
//   const path = ref(db, `/appointments/${currentUser.uid}/${editId}`);
//   get(path).then((snapshot) => {
//     if(snapshot.exists()){
//       let data = snapshot.val();

//       patientName.value = data.name;
//       selectedDoctor.value = data.doctor;
//       datetime.value = data.bookingTime;
//       reason.value = data.visitReason;
//     }
//   });
// }


window.bookAppointment = () => {
  const user = auth.currentUser;
  
  
  if(!currentUser){
    alert('Please Login First!!')
    // window.location.replace('../login/login.html')
    return;
  }
  
  let patientData = {
    name:patientName.value,
    doctor:selectedDoctor.value,
    bookingTime:datetime.value,
    visitReason:reason.value,
    status:'pending',
    createdAt:new Date().toString()
  }
  console.log(user.uid);
  const path = ref(db,`/appointments/${currentUser.uid}`)
    push(path,patientData).
    then(() => {
      alert('Appoinment booked Successfully!!')
      patientName.value = ""
      reason.value = ""
      selectedDoctor.value =""
      datetime.value = ""
      window.location.replace('../my-appointments/my-appointments.html')
    }).
    catch((err) => {
      alert('Something went wrong',err)
    })
    console.log(patientData);

    
  }
    
//   let editId = localStorage.getItem("editId");

//   if (editId) {
//     // Update existing appointment
//     const path = ref(db, `/appointments/${currentUser.uid}/${editId}`);
//     set(path, patientData).then(() => {
//       alert("Appointment Updated");
//       localStorage.removeItem("editId");
//       window.location.href = "../my-appointments/my-appointments.html";
//     });
//   } else {
//     // Create new appointment
//     const path = ref(db, `/appointments/${currentUser.uid}`);
//     push(path, patientData).then(() => {
//       alert("Appointment Booked ");
//       window.location.href = "../my-appointments/my-appointments.html";
//     });
//   }
// } 


// window.onload = () => {
//   if (!window.location.href.includes("appointment.html")) {
//     localStorage.removeItem("editId");
//   }
// };


// let doctorsList = document.getElementById('doctorsList')


let renderDoctors = () => {
   
          const path = ref(db,`/doctors`)
          onValue(path,(snapshot) => {
            
            doctorsList.innerHTML = ""
            snapshot.forEach((items) => {
              console.log(items);
              
              let d = items.val()
              // let data = d.doctorData
      Object.values(d).forEach((doctorData) => {
        doctorsList.innerHTML += `
          <div class="border p-3 rounded mb-3 bg-gray-50 shadow-md">
            <h2 class="font-bold text-lg">${doctorData.name}</h2>
            <p>Age: ${doctorData.age}</p>
            <p>Experience: ${doctorData.experience} years</p>
            <p>Specialist: ${doctorData.category}</p>
            <p>Timing: ${doctorData.timing}</p>
            <p>Days: ${doctorData.days}</p>
            <button onclick="formVisibility()" class="bg-[#2FB5A3] p-1 md:p-2 text-white font-bold cursor-pointer hover:bg-[#2F95A8] duration-300">Book Now</button>
                
          </div>
        `;
      });
    //           doctorsList.innerHTML += `
    //               <div class="w-100" h-40>
    //                 <h1>Name:<strong>${data.name}</strong></h1>

    //               </div>
    // `;
              
            })
          })
       } 
   
renderDoctors()

window.formVisibility = () => {
   doctorsList.style.display = 'none'
   isFormVisible.style.display = 'flex'

}
window.cancelBtn = () => {
   doctorsList.style.display = 'flex'
   isFormVisible.style.display = 'none'

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
