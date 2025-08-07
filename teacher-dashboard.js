import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    // استدعاء بيانات المعلم من Firestore
    const docRef = doc(db, "teachers", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const teacherData = docSnap.data();
      document.getElementById("teacher-name").textContent = teacherData.name;
      document.getElementById("teacher-image").src = teacherData.profileImage;
      // هنا تكملي تعبئة البيانات حسب التصميم عندك
    } else {
      console.log("لا توجد بيانات للمعلم");
    }
  } else {
    window.location.href = "login.html"; // توجيه إن ما فيه تسجيل دخول
  }
});
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
const db = getFirestore();

const bookBtn = document.getElementById("book-lesson-btn");
bookBtn.addEventListener("click", async () => {
  const studentId = "student-uid-selected";
  const date = document.getElementById("date-input").value;
  const time = document.getElementById("time-input").value;

  await addDoc(collection(db, "bookings"), {
    teacherId: auth.currentUser.uid,
    studentId,
    date,
    time,
    status: "scheduled"
  });

  alert("تم حجز الحصة بنجاح");
});
