import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../config/environment';

class CacheManager {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = ENV.CACHE.mechanics; // 5 minutos
  }

  // Gerar chave de cache
  generateKey(prefix, identifier) {
    return `${prefix}_${identifier}`;
  }

  // Verificar se cache é válido
  isCacheValid(timestamp) {
    return Date.now() - timestamp < this.defaultTTL;
  }

  // Salvar no cache
  async set(key, data) {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      
      // Cache em memória
      this.cache.set(key, cacheData);
      
      // Cache persistente
      await AsyncStorage.setItem(key, JSON.stringify(cacheData));
      
      console.log(`Cache set: ${key}`);
    } catch (error) {
      console.error('Erro ao salvar cache:', error);
    }
  }

  // Buscar do cache
  async get(key) {
    try {
      // Verificar cache em memória primeiro
      if (this.cache.has(key)) {
        const cacheData = this.cache.get(key);
        if (this.isCacheValid(cacheData.timestamp)) {
          console.log(`Cache hit (memory): ${key}`);
          return cacheData.data;
        } else {
          this.cache.delete(key);
        }
      }

      // Verificar cache persistente
      const storedData = await AsyncStorage.getItem(key);
      if (storedData) {
        const cacheData = JSON.parse(storedData);
        if (this.isCacheValid(cacheData.timestamp)) {
          // Atualizar cache em memória
          this.cache.set(key, cacheData);
          console.log(`Cache hit (storage): ${key}`);
          return cacheData.data;
        } else {
          // Cache expirado
          await AsyncStorage.removeItem(key);
        }
      }

      console.log(`Cache miss: ${key}`);
      return null;
    } catch (error) {
      console.error('Erro ao buscar cache:', error);
      return null;
    }
  }

  // Limpar cache específico
  async clear(key) {
    try {
      this.cache.delete(key);
      await AsyncStorage.removeItem(key);
      console.log(`Cache cleared: ${key}`);
    } catch (error) {
      console.error('Erro ao limpar cache:', error);
    }
  }

  // Limpar todo o cache
  async clearAll() {
    try {
      this.cache.clear();
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.includes('cache_'));
      await AsyncStorage.multiRemove(cacheKeys);
      console.log('All cache cleared');
    } catch (error) {
      console.error('Erro ao limpar todo cache:', error);
    }
  }

  // Invalidar cache por prefixo
  async invalidateByPrefix(prefix) {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const keysToRemove = keys.filter(key => key.startsWith(prefix));
      
      // Limpar da memória
      for (const key of this.cache.keys()) {
        if (key.startsWith(prefix)) {
          this.cache.delete(key);
        }
      }
      
      // Limpar do storage
      await AsyncStorage.multiRemove(keysToRemove);
      console.log(`Cache invalidated for prefix: ${prefix}`);
    } catch (error) {
      console.error('Erro ao invalidar cache:', error);
    }
  }
}

// Instância singleton
export const cacheManager = new CacheManager();

// Helpers para tipos específicos
export const cacheHelpers = {
  // Cache de mecânicos
  async getMechanics() {
    return await cacheManager.get('cache_mechanics_all');
  },

  async setMechanics(data) {
    await cacheManager.set('cache_mechanics_all', data);
  },

  async invalidateMechanics() {
    await cacheManager.invalidateByPrefix('cache_mechanics');
  },

  // Cache de clientes
  async getClients() {
    return await cacheManager.get('cache_clients_all');
  },

  async setClients(data) {
    await cacheManager.set('cache_clients_all', data);
  },

  async invalidateClients() {
    await cacheManager.invalidateByPrefix('cache_clients');
  },

  // Cache de produtos
  async getProducts() {
    return await cacheManager.get('cache_products_all');
  },

  async setProducts(data) {
    await cacheManager.set('cache_products_all', data);
  },

  async invalidateProducts() {
    await cacheManager.invalidateByPrefix('cache_products');
  },

  // Cache de OS
  async getOS() {
    return await cacheManager.get('cache_os_all');
  },

  async setOS(data) {
    await cacheManager.set('cache_os_all', data);
  },

  async invalidateOS() {
    await cacheManager.invalidateByPrefix('cache_os');
  }
}; 