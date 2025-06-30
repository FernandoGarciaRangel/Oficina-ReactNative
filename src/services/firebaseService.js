import { auth, db } from '../config/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';

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

// Serviços do Firestore
export const firestoreService = {
  // Adicionar documento
  async addDocument(collectionName, data) {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef;
    } catch (error) {
      throw error;
    }
  },

  // Buscar todos os documentos
  async getDocuments(collectionName) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  // Atualizar documento
  async updateDocument(collectionName, docId, data) {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data);
    } catch (error) {
      throw error;
    }
  },

  // Deletar documento
  async deleteDocument(collectionName, docId) {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
    } catch (error) {
      throw error;
    }
  }
}; 