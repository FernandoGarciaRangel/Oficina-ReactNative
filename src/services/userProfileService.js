import { 
  ref, 
  get, 
  query, 
  orderByChild, 
  equalTo 
} from 'firebase/database';
import { database } from '../config/firebase';

export const userProfileService = {
  // Buscar perfil do usuário pelo UID
  async getUserProfile(uid) {
    try {
      // Buscar em clientes
      const clientProfile = await this.findInCollection('clientes', uid);
      if (clientProfile) {
        return {
          ...clientProfile,
          funcao: 'cliente'
        };
      }

      // Buscar em mecânicos
      const mechanicProfile = await this.findInCollection('mecanicos', uid);
      if (mechanicProfile) {
        return {
          ...mechanicProfile,
          funcao: 'mecanico'
        };
      }

      // Buscar em admins
      const adminProfile = await this.findInCollection('admins', uid);
      if (adminProfile) {
        return {
          ...adminProfile,
          funcao: 'admin'
        };
      }

      return null;
    } catch (error) {
      throw new Error('Erro ao buscar perfil do usuário');
    }
  },

  // Buscar perfil por email (alternativa)
  async getUserProfileByEmail(email) {
    try {
      // Buscar em clientes
      const clientProfile = await this.findByEmailInCollection('clientes', email);
      if (clientProfile) {
        return {
          ...clientProfile,
          funcao: 'cliente'
        };
      }

      // Buscar em mecânicos
      const mechanicProfile = await this.findByEmailInCollection('mecanicos', email);
      if (mechanicProfile) {
        return {
          ...mechanicProfile,
          funcao: 'mecanico'
        };
      }

      // Buscar em admins
      const adminProfile = await this.findByEmailInCollection('admins', email);
      if (adminProfile) {
        return {
          ...adminProfile,
          funcao: 'admin'
        };
      }

      return null;
    } catch (error) {
      throw new Error('Erro ao buscar perfil do usuário');
    }
  },

  // Buscar por UID em uma coleção específica
  async findInCollection(collectionName, uid) {
    try {
      const docRef = ref(database, `${collectionName}/${uid}`);
      const snapshot = await get(docRef);
      
      if (snapshot.exists()) {
        return {
          uid: snapshot.key,
          ...snapshot.val()
        };
      }
      
      return null;
    } catch (error) {
      return null;
    }
  },

  // Buscar por email em uma coleção específica
  async findByEmailInCollection(collectionName, email) {
    try {
      const collectionRef = ref(database, collectionName);
      const emailQuery = query(collectionRef, orderByChild('email'), equalTo(email));
      const snapshot = await get(emailQuery);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const uid = Object.keys(data)[0];
        return {
          uid,
          ...data[uid]
        };
      }
      
      return null;
    } catch (error) {
      return null;
    }
  }
}; 