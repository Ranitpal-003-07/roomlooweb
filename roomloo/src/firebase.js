/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
import { getAnalytics, setDefaultEventParameters } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDA4miIw6R-cD6xmSTrlu_cOis0QcqNrS4",
  authDomain: "roomloo-web.firebaseapp.com",
  projectId: "roomloo-web",
  storageBucket: "roomloo-web.appspot.com", // Changed from firebasestorage.app
  messagingSenderId: "732358793482",
  appId: "1:732358793482:web:1f2b7d4c4e61432a6e42f3",
  measurementId: "G-KJNDCPKHNS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics configuration
// In your firebase.js
const analytics = getAnalytics(app);
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('config', 'G-KJNDCPKHNS', {
    cookie_domain: window.location.hostname,
    cookie_flags: 'SameSite=None; Secure',
    cookie_expires: 63072000 // 2 years in seconds
  });
}
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