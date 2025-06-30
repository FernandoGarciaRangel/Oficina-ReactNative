import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// IMPORTANTE: Substitua estas configurações pelas suas credenciais reais do Firebase
// Você pode encontrá-las no console do Firebase: https://console.firebase.google.com
const firebaseConfig = {
  apiKey: "AIzaSyBFGTnhc92fGQprmO8VrDLTld-2397C2Ic",
  authDomain: "fernando-22bcd.firebaseapp.com",
  databaseURL: "https://fernando-22bcd-default-rtdb.firebaseio.com",
  projectId: "fernando-22bcd",
  storageBucket: "fernando-22bcd.firebasestorage.app",
  messagingSenderId: "213119815234",
  appId: "1:213119815234:web:fddafdf3e98b68b70aa7db",
  measurementId: "G-H9GDCHKWX4"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa os serviços
export const auth = getAuth(app);
export const database = getDatabase(app);

export default app; 