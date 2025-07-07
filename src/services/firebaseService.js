import { auth, database } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { 
  ref, 
  push, 
  get, 
  set, 
  update, 
  remove,
  serverTimestamp
} from 'firebase/database';

// Serviços de Autenticação
export const authService = {
  // Cadastrar novo usuário
  async registerUser(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Fazer login
  async loginUser(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Fazer logout
  async logoutUser() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  },

  // Obter usuário atual
  getCurrentUser() {
    return auth.currentUser;
  }
};

// Serviços do Realtime Database
export const databaseService = {
  // Adicionar documento
  async addDocument(path, data) {
    try {
      const docRef = ref(database, path);
      const newDocRef = push(docRef);
      const dataWithTimestamp = {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await set(newDocRef, dataWithTimestamp);
      return newDocRef.key;
    } catch (error) {
      throw error;
    }
  },

  // Buscar todos os documentos
  async getDocuments(path) {
    try {
      const docRef = ref(database, path);
      const snapshot = await get(docRef);
      
      if (snapshot.exists()) {
        const documents = [];
        snapshot.forEach((childSnapshot) => {
          documents.push({
            uid: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        return documents;
      }
      
      return [];
    } catch (error) {
      throw error;
    }
  },

  // Atualizar documento
  async updateDocument(path, uid, data) {
    try {
      const docRef = ref(database, `${path}/${uid}`);
      const updateData = {
        ...data,
        updatedAt: serverTimestamp()
      };
      await update(docRef, updateData);
    } catch (error) {
      throw error;
    }
  },

  // Deletar documento
  async deleteDocument(path) {
    try {
      const docRef = ref(database, path);
      await remove(docRef);
    } catch (error) {
      throw error;
    }
  }
}; 