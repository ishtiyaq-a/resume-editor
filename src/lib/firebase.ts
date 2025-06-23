import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDqKrheaxKhz7IkZ8lKhzUc9RakiOSQ2k",
  authDomain: "resume-editor-230625.firebaseapp.com",
  projectId: "resume-editor-230625",
  storageBucket: "resume-editor-230625.firebasestorage.app",
  messagingSenderId: "62284318983",
  appId: "1:62284318983:web:c463d907ecca07df879da2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
