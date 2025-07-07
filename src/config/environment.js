// Configurações de ambiente
export const ENV = {
  // Configurações do Firebase
  FIREBASE_CONFIG: {
    apiKey: "AIzaSyBFGTnhc92fGQprmO8VrDLTld-2397C2Ic",
    authDomain: "fernando-22bcd.firebaseapp.com",
    databaseURL: "https://fernando-22bcd-default-rtdb.firebaseio.com",
    projectId: "fernando-22bcd",
    storageBucket: "fernando-22bcd.firebasestorage.app",
    messagingSenderId: "213119815234",
    appId: "1:213119815234:web:fddafdf3e98b68b70aa7db",
    measurementId: "G-H9GDCHKWX4"
  },

  // Configurações da aplicação
  APP_CONFIG: {
    name: 'Oficina App',
    version: '1.0.0',
    debug: __DEV__, // true em desenvolvimento, false em produção
    environment: __DEV__ ? 'development' : 'production',
  },

  // Configurações de validação
  VALIDATION: {
    minPasswordLength: 6,
    maxNameLength: 100,
    maxEmailLength: 100,
    maxPhoneLength: 20,
    maxSpecialtyLength: 50,
    maxMatriculaLength: 20,
    maxDescriptionLength: 500,
    maxAddressLength: 200,
  },

  // Configurações de timeout
  TIMEOUT: {
    request: 10000, // 10 segundos
    auth: 30000,    // 30 segundos
    cache: 300000,  // 5 minutos
  },

  // Configurações de cache
  CACHE: {
    mechanics: 5 * 60 * 1000, // 5 minutos
    clients: 5 * 60 * 1000,   // 5 minutos
    products: 5 * 60 * 1000,  // 5 minutos
    os: 5 * 60 * 1000,        // 5 minutos
    user: 10 * 60 * 1000,     // 10 minutos
  },

  // Configurações de paginação
  PAGINATION: {
    defaultPageSize: 20,
    maxPageSize: 100,
  },

  // Configurações de notificação
  NOTIFICATION: {
    enabled: true,
    sound: true,
    vibration: true,
  },

  // Configurações de debug
  DEBUG: {
    enabled: __DEV__,
    logLevel: __DEV__ ? 'debug' : 'error',
    showNetworkRequests: __DEV__,
    showCacheHits: __DEV__,
  }
};

// Função para verificar se está em desenvolvimento
export const isDevelopment = () => __DEV__;

// Função para verificar se está em produção
export const isProduction = () => !__DEV__;

// Função para obter configuração baseada no ambiente
export const getConfig = (key) => {
  return ENV[key] || null;
};

// Função para obter configuração de debug
export const getDebugConfig = (key) => {
  return ENV.DEBUG[key] || false;
};

// Função para verificar se debug está habilitado
export const isDebugEnabled = () => {
  return ENV.DEBUG.enabled;
};

// Função para log condicional
export const debugLog = (message, data = null) => {
  if (isDebugEnabled()) {
    if (data) {
      console.log(`[DEBUG] ${message}`, data);
    } else {
      console.log(`[DEBUG] ${message}`);
    }
  }
}; 