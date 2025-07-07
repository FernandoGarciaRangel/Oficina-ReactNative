import { 
  ref, 
  push, 
  get, 
  update, 
  remove, 
  query, 
  orderByChild, 
  equalTo, 
  serverTimestamp, 
  set 
} from 'firebase/database';
import { database } from '../config/firebase';

const COLLECTION_NAME = 'admins';

export const adminService = {
  // Buscar todos os administradores
  async getAllAdmins() {
    try {
      const adminsRef = ref(database, COLLECTION_NAME);
      const snapshot = await get(adminsRef);
      if (snapshot.exists()) {
        const admins = [];
        snapshot.forEach((childSnapshot) => {
          admins.push({
            uid: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        return admins.sort((a, b) => a.nome.localeCompare(b.nome));
      }
      return [];
    } catch (error) {
      console.error('Erro ao buscar administradores:', error);
      throw new Error('Erro ao carregar administradores');
    }
  },

  // Buscar administrador por ID
  async getAdminById(uid) {
    try {
      const adminRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      const snapshot = await get(adminRef);
      if (snapshot.exists()) {
        return {
          uid: snapshot.key,
          ...snapshot.val()
        };
      } else {
        throw new Error('Administrador não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar administrador:', error);
      throw new Error('Erro ao carregar administrador');
    }
  },

  // Adicionar novo administrador
  async addAdmin(adminData) {
    try {
      const adminsRef = ref(database, COLLECTION_NAME);
      const newAdminRef = push(adminsRef);
      const adminToAdd = {
        ...adminData,
        funcao: 'admin',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await set(newAdminRef, adminToAdd);
      return {
        uid: newAdminRef.key,
        ...adminToAdd
      };
    } catch (error) {
      console.error('Erro ao adicionar administrador:', error);
      throw new Error('Erro ao cadastrar administrador');
    }
  },

  // Atualizar administrador
  async updateAdmin(uid, adminData) {
    try {
      const adminRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      const updateData = {
        ...adminData,
        updatedAt: serverTimestamp()
      };
      await update(adminRef, updateData);
      return {
        uid,
        ...updateData
      };
    } catch (error) {
      console.error('Erro ao atualizar administrador:', error);
      throw new Error('Erro ao atualizar administrador');
    }
  },

  // Deletar administrador
  async deleteAdmin(uid) {
    try {
      const adminRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      await remove(adminRef);
      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar administrador:', error);
      throw new Error('Erro ao excluir administrador');
    }
  },

  // Verificar se CPF já existe
  async checkCpfExists(cpf, excludeUid = null) {
    try {
      const adminsRef = ref(database, COLLECTION_NAME);
      const cpfQuery = query(adminsRef, orderByChild('cpf'), equalTo(cpf));
      const snapshot = await get(cpfQuery);
      if (snapshot.exists()) {
        const existingAdmin = snapshot.val();
        const adminUid = Object.keys(existingAdmin)[0];
        return adminUid !== excludeUid;
      }
      return false;
    } catch (error) {
      console.error('Erro ao verificar CPF:', error);
      return false;
    }
  },

  // Verificar se email já existe
  async checkEmailExists(email, excludeUid = null) {
    try {
      const adminsRef = ref(database, COLLECTION_NAME);
      const emailQuery = query(adminsRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);
      if (snapshot.exists()) {
        const existingAdmin = snapshot.val();
        const adminUid = Object.keys(existingAdmin)[0];
        return adminUid !== excludeUid;
      }
      return false;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  }
}; 