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
import { auth } from '../config/firebase';
import { database } from '../config/firebase';

const COLLECTION_NAME = 'produtos';

export const productService = {
  // Verificar se o usuário está autenticado
  checkAuth() {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado. Faça login novamente.');
    }
    return user;
  },

  // Testar conectividade com o Firebase
  async testConnection() {
    try {
      const testRef = ref(database, 'test');
      await get(testRef);
      return true;
    } catch (error) {
      return false;
    }
  },

  // Verificar estrutura do banco
  async checkDatabaseStructure() {
    try {
      const rootRef = ref(database, '/');
      const snapshot = await get(rootRef);
      return true;
    } catch (error) {
      return false;
    }
  },

  // Buscar todos os produtos
  async getAllProducts() {
    try {
      const productsRef = ref(database, COLLECTION_NAME);
      const snapshot = await get(productsRef);
      if (snapshot.exists()) {
        const products = [];
        snapshot.forEach((childSnapshot) => {
          products.push({
            uid: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        return products.sort((a, b) => a.nome.localeCompare(b.nome));
      }
      return [];
    } catch (error) {
      throw new Error('Erro ao carregar produtos');
    }
  },

  // Buscar produto por ID
  async getProductById(uid) {
    try {
      const productRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      const snapshot = await get(productRef);
      if (snapshot.exists()) {
        return {
          uid: snapshot.key,
          ...snapshot.val()
        };
      } else {
        throw new Error('Produto não encontrado');
      }
    } catch (error) {
      throw new Error('Erro ao carregar produto');
    }
  },

  // Adicionar novo produto
  async addProduct(productData) {
    try {
      // Validar dados obrigatórios
      if (!productData.codigo || !productData.nome || productData.quantidade === undefined || productData.preco === undefined) {
        throw new Error('Dados obrigatórios não fornecidos');
      }

      // Validar que os campos correspondem às regras do Firebase
      const requiredFields = ['codigo', 'nome', 'quantidade', 'precoAtual'];
      const missingFields = requiredFields.filter(field => {
        if (field === 'precoAtual') {
          return productData.preco === undefined;
        }
        return !productData[field];
      });
      
      if (missingFields.length > 0) {
        throw new Error(`Campos obrigatórios ausentes: ${missingFields.join(', ')}`);
      }

      const productsRef = ref(database, COLLECTION_NAME);
      
      const newProductRef = push(productsRef);
      
      const productToAdd = {
        codigo: productData.codigo.trim(),
        nome: productData.nome.trim(),
        quantidade: Number(productData.quantidade),
        precoAtual: Number(productData.preco),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      await set(newProductRef, productToAdd);
      
      return {
        uid: newProductRef.key,
        ...productToAdd
      };
    } catch (error) {
      // Mensagens de erro mais específicas
      if (error.code === 'PERMISSION_DENIED') {
        throw new Error('Sem permissão para adicionar produtos. Verifique as regras do Firebase.');
      } else if (error.code === 'UNAVAILABLE') {
        throw new Error('Serviço temporariamente indisponível. Tente novamente.');
      } else if (error.message.includes('Dados obrigatórios') || error.message.includes('não autenticado')) {
        throw error;
      } else {
        throw new Error(`Erro ao cadastrar produto: ${error.message}`);
      }
    }
  },

  // Atualizar produto
  async updateProduct(uid, productData) {
    try {
      const productRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      const updateData = {
        codigo: productData.codigo.trim(),
        nome: productData.nome.trim(),
        quantidade: Number(productData.quantidade),
        precoAtual: Number(productData.preco),
        updatedAt: serverTimestamp()
      };
      
      await update(productRef, updateData);
      
      return {
        uid,
        ...updateData
      };
    } catch (error) {
      if (error.code === 'PERMISSION_DENIED') {
        throw new Error('Sem permissão para atualizar produtos. Verifique as regras do Firebase.');
      } else if (error.code === 'UNAVAILABLE') {
        throw new Error('Serviço temporariamente indisponível. Tente novamente.');
      } else {
        throw new Error(`Erro ao atualizar produto: ${error.message}`);
      }
    }
  },

  // Deletar produto
  async deleteProduct(uid) {
    try {
      const productRef = ref(database, `${COLLECTION_NAME}/${uid}`);
      await remove(productRef);
      return { success: true };
    } catch (error) {
      throw new Error('Erro ao excluir produto');
    }
  },

  // Verificar se código já existe
  async checkCodigoExists(codigo, excludeUid = null) {
    try {
      const productsRef = ref(database, COLLECTION_NAME);
      const codigoQuery = query(productsRef, orderByChild('codigo'), equalTo(codigo));
      const snapshot = await get(codigoQuery);
      if (snapshot.exists()) {
        const existingProduct = snapshot.val();
        const productUid = Object.keys(existingProduct)[0];
        return productUid !== excludeUid;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}; 