import { ref, push, get, update, remove, serverTimestamp, set } from 'firebase/database';
import { database } from '../config/firebase';

const COLLECTION_NAME = 'oss';

export const osService = {
  // Buscar todas as OS
  async getAllOS() {
    try {
      const osRef = ref(database, COLLECTION_NAME);
      const snapshot = await get(osRef);
      if (snapshot.exists()) {
        const osList = [];
        snapshot.forEach((childSnapshot) => {
          osList.push({
            uid: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        // Ordenar por dataInicio decrescente
        return osList.sort((a, b) => (b.dataInicio || '').localeCompare(a.dataInicio || ''));
      }
      return [];
    } catch (error) {
      throw new Error('Erro ao carregar ordens de serviço');
    }
  },

  // Buscar OS por ID
  async getOSById(uid) {
    try {
      const osRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      const snapshot = await get(osRef);
      if (snapshot.exists()) {
        return {
          uid: snapshot.key,
          ...snapshot.val()
        };
      } else {
        throw new Error('OS não encontrada');
      }
    } catch (error) {
      throw new Error('Erro ao carregar ordem de serviço');
    }
  },

  // Adicionar nova OS
  async addOS(osData) {
    try {
      // Validação básica
      if (!osData.preco || !osData.dataInicio || !osData.dataFim || !osData.descricao) {
        throw new Error('Preencha todos os campos obrigatórios');
      }
      
      const osRef = ref(database, COLLECTION_NAME);
      const newOSRef = push(osRef);
      
      const osToAdd = {
        preco: Number(osData.preco),
        dataInicio: osData.dataInicio,
        dataFim: osData.dataFim,
        descricao: osData.descricao.trim(),
        idVeiculo: osData.idVeiculo || null,
        idCliente: osData.idCliente || null,
        idMecanico: osData.idMecanico || null,
        status: osData.status || 'Pendente',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await set(newOSRef, osToAdd);
      
      const result = {
        uid: newOSRef.key,
        ...osToAdd
      };
      
      return result;
    } catch (error) {
      throw new Error('Erro ao cadastrar ordem de serviço: ' + error.message);
    }
  },

  // Atualizar OS (merge)
  async updateOS(uid, osData) {
    try {
      const osRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      // Buscar dados atuais
      const snapshot = await get(osRef);
      let currentData = {};
      if (snapshot.exists()) {
        currentData = snapshot.val();
      }
      const updateData = {
        ...currentData,
        ...osData,
        updatedAt: serverTimestamp()
      };
      await update(osRef, updateData);
      return {
        uid,
        ...updateData
      };
    } catch (error) {
      throw new Error('Erro ao atualizar ordem de serviço');
    }
  },

  // Deletar OS
  async deleteOS(uid) {
    try {
      const osRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      await remove(osRef);
      return { success: true };
    } catch (error) {
      throw new Error('Erro ao excluir ordem de serviço');
    }
  },

  // Buscar OS por mecânico
  async getOSByMechanic(mechanicUid) {
    try {
      const osRef = ref(database, COLLECTION_NAME);
      const snapshot = await get(osRef);
      if (snapshot.exists()) {
        const osList = [];
        snapshot.forEach((childSnapshot) => {
          const os = { uid: childSnapshot.key, ...childSnapshot.val() };
          if (os.idMecanico === mechanicUid) {
            osList.push(os);
          }
        });
        return osList;
      }
      return [];
    } catch (error) {
      throw new Error('Erro ao carregar ordens de serviço do mecânico');
    }
  }
}; 