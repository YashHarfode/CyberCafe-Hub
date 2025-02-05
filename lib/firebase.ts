import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyAaPdcKBqJdgzInKMwebZ_x0x4VScvH1ac",
  authDomain: "cybercafe-hub.firebaseapp.com",
  databaseURL: "https://cybercafe-hub-default-rtdb.firebaseio.com",
  projectId: "cybercafe-hub",
  storageBucket: "cybercafe-hub.firebasestorage.app",
  messagingSenderId: "474850172562",
  appId: "1:474850172562:web:6269569650150d6dff504b",
  measurementId: "G-Y0YY5BZHDS",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Initialize Analytics only on the client-side
if (typeof window !== "undefined") {
  const analytics = getAnalytics(app)
}

