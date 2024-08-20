import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhLu_VHsLLVHNHKKsu98xpjRKz8vU7Wss",  // Usa tu API Key
  authDomain: "home-36cf0.firebaseapp.com",  // auth_domain del proyecto
  projectId: "home-36cf0",  // project_id del proyecto
  storageBucket: "home-36cf0.appspot.com",  // Opcional, solo si usas Firebase Storage
  messagingSenderId: "193604610531",  // messagingSenderId si es necesario
  appId: "1:193604610531:web:60f3d8a2daa3fcc81c18d6",  // app_id del proyecto
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };