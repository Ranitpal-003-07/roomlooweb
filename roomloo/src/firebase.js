import { initializeApp } from "firebase/app";
import { getAnalytics, setDefaultEventParameters } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDA4miIw6R-cD6xmSTrlu_cOis0QcqNrS4",
  authDomain: "roomloo-web.firebaseapp.com",
  projectId: "roomloo-web",
  storageBucket: "roomloo-web.firebasestorage.app", // Changed from firebasestorage.app
  messagingSenderId: "732358793482",
  appId: "1:732358793482:web:1f2b7d4c4e61432a6e42f3",
  measurementId: "G-KJNDCPKHNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics configuration
const analytics = getAnalytics(app);
setDefaultEventParameters({
  hostname: window.location.hostname // Helps with domain tracking
});

// Auth configuration
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence) // Changed to local persistence
  .catch((error) => {
    console.error("Persistence setting error:", error);
  });

// Provider configuration
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// Initialize services
export const db = getFirestore(app);
export const storage = getStorage(app);

export { auth, googleProvider, analytics };
export default app;