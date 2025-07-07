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

const COLLECTION_NAME = 'clientes';

export const clientService = {
  // Buscar todos os clientes
  async getAllClients() {
    try {
      const clientsRef = ref(database, COLLECTION_NAME);
      const snapshot = await get(clientsRef);
      if (snapshot.exists()) {
        const clients = [];
        snapshot.forEach((childSnapshot) => {
          clients.push({
            uid: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        return clients.sort((a, b) => a.nome.localeCompare(b.nome));
      }
      return [];
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw new Error('Erro ao carregar clientes');
    }
  },

  // Buscar cliente por ID
  async getClientById(uid) {
    try {
      const clientRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      const snapshot = await get(clientRef);
      if (snapshot.exists()) {
        return {
          uid: snapshot.key,
          ...snapshot.val()
        };
      } else {
        throw new Error('Cliente não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      throw new Error('Erro ao carregar cliente');
    }
  },

  // Adicionar novo cliente
  async addClient(clientData) {
    try {
      const clientsRef = ref(database, COLLECTION_NAME);
      const newClientRef = push(clientsRef);
      const clientToAdd = {
        ...clientData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await set(newClientRef, clientToAdd);
      return {
        uid: newClientRef.key,
        ...clientToAdd
      };
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      throw new Error('Erro ao cadastrar cliente');
    }
  },

  // Atualizar cliente
  async updateClient(uid, clientData) {
    try {
      const clientRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      const updateData = {
        ...clientData,
        updatedAt: serverTimestamp()
      };
      await update(clientRef, updateData);
      return {
        uid,
        ...updateData
      };
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw new Error('Erro ao atualizar cliente');
    }
  },

  // Deletar cliente
  async deleteClient(uid) {
    try {
      const clientRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      await remove(clientRef);
      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      throw new Error('Erro ao excluir cliente');
    }
  },

  // Verificar se CPF já existe
  async checkCpfExists(cpf, excludeUid = null) {
    try {
      const clientsRef = ref(database, COLLECTION_NAME);
      const cpfQuery = query(clientsRef, orderByChild('cpf'), equalTo(cpf));
      const snapshot = await get(cpfQuery);
      if (snapshot.exists()) {
        const existingClient = snapshot.val();
        const clientUid = Object.keys(existingClient)[0];
        return clientUid !== excludeUid;
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
      const clientsRef = ref(database, COLLECTION_NAME);
      const emailQuery = query(clientsRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);
      if (snapshot.exists()) {
        const existingClient = snapshot.val();
        const clientUid = Object.keys(existingClient)[0];
        return clientUid !== excludeUid;
      }
      return false;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  }
}; 