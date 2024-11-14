import { getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken, isSupported } from "firebase/messaging";

// Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyB80eY30zcb4xJI3reZVsMKib8KFLCniYw",
  authDomain: "fmc-demo-245b0.firebaseapp.com",
  projectId: "fmc-demo-245b0",
  storageBucket: "fmc-demo-245b0.firebasestorage.app",
  messagingSenderId: "552830081094",
  appId: "1:552830081094:web:3931522e3a732fb4a01247",
  measurementId: "G-H6Y6P03MZR"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error("An error occurred while fetching the token:", err);
    return null;
  }
};

export { app, messaging };
