import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { ENV } from './environment';

// Inicializa o Firebase com configurações do ambiente
const app = initializeApp(ENV.FIREBASE_CONFIG);

// Inicializa os serviços
export const auth = getAuth(app);
export const database = getDatabase(app);

// Exportações padronizadas para compatibilidade
export const db = database; // Alias para compatibilidade com firebaseService

export default app; 