// js/main.js
import { auth, db } from '../firebase.js';
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const root = document.getElementById('dashboard-root');

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "signin.html";
    return;
  }
  // Fetch user data from Firestore
  const studentId = user.email.split('@')[0];
  const docRef = doc(db, "students", studentId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    root.innerHTML = "User data not found!";
    return;
  }
  const data = docSnap.data();
  // Render dashboard using data (see below for structure)
  root.innerHTML = renderDashboard(data);
});

function renderDashboard(data) {
  return `
    <div class="profile-card">
      <img src="${data.photoUrl}" class="profile-pic" alt="Profile">
      <h2>${data.name}</h2>
      <p>${data.studentId}</p>
      <p>${data.email}</p>
      <p>${data.phone}</p>
      <p>Father: ${data.fatherName}</p>
      <p>Mother: ${data.motherName}</p>
      <p>DOB: ${data.dob}</p>
      <p>College: ${data.college}</p>
      <p>Course: ${data.course}</p>
      <p>Year/Sem: ${data.yearSem}</p>
      <p>Class Roll No: ${data.classRollNo}</p>
      <p>Enroll No: ${data.enrollNo}</p>
      <p>University Roll No: ${data.universityRollNo}</p>
      <p>HighSchool %: ${data.highSchoolPercent}</p>
      <p>Intermediate %: ${data.intermediatePercent}</p>
    </div>
  `;
}