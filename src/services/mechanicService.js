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
      console.log('mechanicService.addMechanic - Iniciando...');
      const mechanicsRef = ref(database, COLLECTION_NAME);
      const newMechanicRef = push(mechanicsRef);
      
      const mechanicToAdd = {
        ...mechanicData,
        status: 'ativo',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      console.log('mechanicService.addMechanic - Dados para adicionar:', mechanicToAdd);
      console.log('mechanicService.addMechanic - Referência:', newMechanicRef.toString());

      await set(newMechanicRef, mechanicToAdd);
      
      const result = {
        uid: newMechanicRef.key,
        ...mechanicToAdd
      };
      
      console.log('mechanicService.addMechanic - Sucesso:', result);
      return result;
    } catch (error) {
      console.error('mechanicService.addMechanic - Erro:', error);
      throw new Error(`Erro ao cadastrar mecânico: ${error.message}`);
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
      console.log('deleteMechanic - Iniciando exclusão do UID:', uid);
      const mechanicRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      console.log('deleteMechanic - Caminho do nó:', mechanicRef.toString());
      await remove(mechanicRef);
      console.log('deleteMechanic - Exclusão concluída com sucesso');
      return { success: true };
    } catch (error) {
      console.error('deleteMechanic - Erro ao deletar mecânico:', error);
      throw new Error('Erro ao excluir mecânico: ' + error.message);
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
      console.log('mechanicService.checkCpfExists - Verificando CPF:', cpf);
      const mechanicsRef = ref(database, COLLECTION_NAME);
      const cpfQuery = query(mechanicsRef, orderByChild('cpf'), equalTo(cpf));
      const snapshot = await get(cpfQuery);
      
      if (snapshot.exists()) {
        const existingMechanic = snapshot.val();
        const mechanicUid = Object.keys(existingMechanic)[0];
        const exists = mechanicUid !== excludeUid;
        console.log('mechanicService.checkCpfExists - CPF existe:', exists, 'UID:', mechanicUid);
        return exists;
      }
      
      console.log('mechanicService.checkCpfExists - CPF não existe');
      return false;
    } catch (error) {
      console.error('mechanicService.checkCpfExists - Erro:', error);
      return false;
    }
  },

  // Verificar se email já existe
  async checkEmailExists(email, excludeUid = null) {
    try {
      console.log('mechanicService.checkEmailExists - Verificando email:', email);
      const mechanicsRef = ref(database, COLLECTION_NAME);
      const emailQuery = query(mechanicsRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);
      
      if (snapshot.exists()) {
        const existingMechanic = snapshot.val();
        const mechanicUid = Object.keys(existingMechanic)[0];
        const exists = mechanicUid !== excludeUid;
        console.log('mechanicService.checkEmailExists - Email existe:', exists, 'UID:', mechanicUid);
        return exists;
      }
      
      console.log('mechanicService.checkEmailExists - Email não existe');
      return false;
    } catch (error) {
      console.error('mechanicService.checkEmailExists - Erro:', error);
      return false;
    }
  },

  // Verificar se matrícula já existe
  async checkMatriculaExists(matricula, excludeUid = null) {
    try {
      console.log('mechanicService.checkMatriculaExists - Verificando matrícula:', matricula);
      const mechanicsRef = ref(database, COLLECTION_NAME);
      const matriculaQuery = query(mechanicsRef, orderByChild('matricula'), equalTo(matricula));
      const snapshot = await get(matriculaQuery);
      
      if (snapshot.exists()) {
        const existingMechanic = snapshot.val();
        const mechanicUid = Object.keys(existingMechanic)[0];
        const exists = mechanicUid !== excludeUid;
        console.log('mechanicService.checkMatriculaExists - Matrícula existe:', exists, 'UID:', mechanicUid);
        return exists;
      }
      
      console.log('mechanicService.checkMatriculaExists - Matrícula não existe');
      return false;
    } catch (error) {
      console.error('mechanicService.checkMatriculaExists - Erro:', error);
      return false;
    }
  }
}; 