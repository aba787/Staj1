// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "",
  authDomain: "siraj-74f58.firebaseapp.com",
  projectId: "siraj-74f58",
  storageBucket: "siraj-74f58.appspot.com",
  messagingSenderId: "60485496189",
  appId: "1:60485496189:web:10dcae7bd8865f91d47014",
  measurementId: "G-1097R9KTSZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };