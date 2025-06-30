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

const COLLECTION_NAME = 'mecanicos';

export const mechanicService = {
  // Buscar todos os mecânicos
  async getAllMechanics() {
    try {
      const mechanicsRef = ref(database, COLLECTION_NAME);
      const snapshot = await get(mechanicsRef);
      
      if (snapshot.exists()) {
        const mechanics = [];
        snapshot.forEach((childSnapshot) => {
          mechanics.push({
            uid: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        // Ordenar por nome
        return mechanics.sort((a, b) => a.nome.localeCompare(b.nome));
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao buscar mecânicos:', error);
      throw new Error('Erro ao carregar mecânicos');
    }
  },

  // Buscar mecânico por ID
  async getMechanicById(uid) {
    try {
      const mechanicRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      const snapshot = await get(mechanicRef);
      
      if (snapshot.exists()) {
        return {
          uid: snapshot.key,
          ...snapshot.val()
        };
      } else {
        throw new Error('Mecânico não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar mecânico:', error);
      throw new Error('Erro ao carregar mecânico');
    }
  },

  // Buscar mecânicos por status
  async getMechanicsByStatus(status) {
    try {
      const mechanicsRef = ref(database, COLLECTION_NAME);
      const statusQuery = query(mechanicsRef, orderByChild('status'), equalTo(status));
      const snapshot = await get(statusQuery);
      
      if (snapshot.exists()) {
        const mechanics = [];
        snapshot.forEach((childSnapshot) => {
          mechanics.push({
            uid: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        return mechanics.sort((a, b) => a.nome.localeCompare(b.nome));
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao buscar mecânicos por status:', error);
      throw new Error('Erro ao carregar mecânicos');
    }
  },

  // Buscar mecânicos por especialidade
  async getMechanicsBySpecialty(especialidade) {
    try {
      const mechanicsRef = ref(database, COLLECTION_NAME);
      const specialtyQuery = query(mechanicsRef, orderByChild('especialidade'), equalTo(especialidade));
      const snapshot = await get(specialtyQuery);
      
      if (snapshot.exists()) {
        const mechanics = [];
        snapshot.forEach((childSnapshot) => {
          mechanics.push({
            uid: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        
        return mechanics.sort((a, b) => a.nome.localeCompare(b.nome));
      }
      
      return [];
    } catch (error) {
      console.error('Erro ao buscar mecânicos por especialidade:', error);
      throw new Error('Erro ao carregar mecânicos');
    }
  },

  // Adicionar novo mecânico
  async addMechanic(mechanicData) {
    try {
      const mechanicsRef = ref(database, COLLECTION_NAME);
      const newMechanicRef = push(mechanicsRef);
      
      const mechanicToAdd = {
        ...mechanicData,
        status: 'ativo',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await set(newMechanicRef, mechanicToAdd);
      
      return {
        uid: newMechanicRef.key,
        ...mechanicToAdd
      };
    } catch (error) {
      console.error('Erro ao adicionar mecânico:', error);
      throw new Error('Erro ao cadastrar mecânico');
    }
  },

  // Atualizar mecânico
  async updateMechanic(uid, mechanicData) {
    try {
      const mechanicRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      const updateData = {
        ...mechanicData,
        updatedAt: serverTimestamp()
      };

      await update(mechanicRef, updateData);
      
      return {
        uid,
        ...updateData
      };
    } catch (error) {
      console.error('Erro ao atualizar mecânico:', error);
      throw new Error('Erro ao atualizar mecânico');
    }
  },

  // Deletar mecânico
  async deleteMechanic(uid) {
    try {
      const mechanicRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      await remove(mechanicRef);
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao deletar mecânico:', error);
      throw new Error('Erro ao excluir mecânico');
    }
  },

  // Atualizar status do mecânico
  async updateMechanicStatus(uid, status) {
    try {
      const mechanicRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      await update(mechanicRef, {
        status,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao atualizar status do mecânico:', error);
      throw new Error('Erro ao atualizar status');
    }
  },

  // Verificar se CPF já existe
  async checkCpfExists(cpf, excludeUid = null) {
    try {
      const mechanicsRef = ref(database, COLLECTION_NAME);
      const cpfQuery = query(mechanicsRef, orderByChild('cpf'), equalTo(cpf));
      const snapshot = await get(cpfQuery);
      
      if (snapshot.exists()) {
        const existingMechanic = snapshot.val();
        const mechanicUid = Object.keys(existingMechanic)[0];
        return mechanicUid !== excludeUid;
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
      const mechanicsRef = ref(database, COLLECTION_NAME);
      const emailQuery = query(mechanicsRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);
      
      if (snapshot.exists()) {
        const existingMechanic = snapshot.val();
        const mechanicUid = Object.keys(existingMechanic)[0];
        return mechanicUid !== excludeUid;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  },

  // Verificar se matrícula já existe
  async checkMatriculaExists(matricula, excludeUid = null) {
    try {
      const mechanicsRef = ref(database, COLLECTION_NAME);
      const matriculaQuery = query(mechanicsRef, orderByChild('matricula'), equalTo(matricula));
      const snapshot = await get(matriculaQuery);
      
      if (snapshot.exists()) {
        const existingMechanic = snapshot.val();
        const mechanicUid = Object.keys(existingMechanic)[0];
        return mechanicUid !== excludeUid;
      }
      
      return false;
    } catch (error) {
      console.error('Erro ao verificar matrícula:', error);
      return false;
    }
  }
}; 