// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBAgXJF_458hSknaMQuxJt1StId9f4zMw4',
  authDomain: 'uploadimg-1a951.firebaseapp.com',
  projectId: 'uploadimg-1a951',
  storageBucket: 'uploadimg-1a951.appspot.com',
  messagingSenderId: '136257458222',
  appId: '1:136257458222:web:3e6fcc05c93adc05104fbf',
  measurementId: 'G-S825EJBV32'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const storage = getStorage(app)

export { storage }
