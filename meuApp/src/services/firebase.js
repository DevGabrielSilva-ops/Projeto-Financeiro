import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCdTLz7YeCDHbiAlZ894UnrG1yoV8LIoiU",
  authDomain: "projeto-financeiro-70404.firebaseapp.com",
  projectId: "projeto-financeiro-70404",
  storageBucket: "projeto-financeiro-70404.firebasestorage.app",
  messagingSenderId: "781467551383",
  appId: "1:781467551383:web:f3cf5e161734f0fd4a0bd2"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
