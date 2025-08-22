// index.js
import { db, auth, registerUser, loginUser, logoutUser } from './firebase.js';

// مثال: إضافة حدث للزر لتسجيل مستخدم جديد
const registerBtn = document.getElementById('registerBtn');
if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    registerUser(email, password)
      .then((userCredential) => {
        alert("تم التسجيل بنجاح!");
        console.log(userCredential.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// مثال: تسجيل دخول
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    loginUser(email, password)
      .then((userCredential) => {
        alert("تم تسجيل الدخول!");
        console.log(userCredential.user);
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// مثال: تسجيل الخروج
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logoutUser()
      .then(() => {
        alert("تم تسجيل الخروج!");
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// مثال: رصد حالة تسجيل الدخول
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("المستخدم مسجل دخول:", user.email);
    // هنا ممكن تغير واجهة الصفحة لعرض اسم المستخدم أو إخفاء أزرار التسجيل/الدخول
  } else {
    console.log("لا يوجد مستخدم مسجل دخول");
  }
});
