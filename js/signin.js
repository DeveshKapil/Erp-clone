// js/signin.js
import { auth } from '../firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";

const form = document.getElementById('signin-form');
const captchaSpan = document.getElementById('captcha');
const captchaInput = document.getElementById('captcha_input');
const errorDiv = document.getElementById('signin-error');

let captchaValue = '';

function generateCaptcha() {
  captchaValue = Math.random().toString(36).substring(2, 8);
  captchaSpan.textContent = captchaValue;
}
generateCaptcha();

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (captchaInput.value !== captchaValue) {
    errorDiv.textContent = "Captcha incorrect!";
    generateCaptcha();
    return;
  }
  const studentId = document.getElementById('student_id').value;
  const password = document.getElementById('password').value;
  // Use studentId as email (e.g., studentId@erp.com)
  try {
    await signInWithEmailAndPassword(auth, `${studentId}@erp.com`, password);
    window.location.href = "index.html";
  } catch (err) {
    errorDiv.textContent = err.message;
    generateCaptcha();
  }
});