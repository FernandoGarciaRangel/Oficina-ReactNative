import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// Configuração do Firebase (mesma do projeto)
const firebaseConfig = {
  apiKey: "AIzaSyBFGTnhc92fGQprmO8VrDLTld-2397C2Ic",
  authDomain: "fernando-22bcd.firebaseapp.com",
  databaseURL: "https://fernando-22bcd-default-rtdb.firebaseio.com",
  projectId: "fernando-22bcd",
  storageBucket: "fernando-22bcd.firebasestorage.app",
  messagingSenderId: "213119815234",
  appId: "1:213119815234:web:fddafdf3e98b68b70aa7db",
  measurementId: "G-H9GDCHKWX4"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// UID do admin autenticado (pegue do console do login)
const ADMIN_UID = "Oa2oOT4IOYQJWQGndMVySpCnxUs2";

// Dados do administrador padrão
const adminData = {
  nome: "Administrador Padrão",
  email: "admin@oficina.com",
  cpf: "12345678901",
  telefone: "(11) 99999-9999",
  funcao: "admin",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Função para adicionar administrador
async function addDefaultAdmin() {
  try {
    console.log('Adicionando administrador padrão...');
    console.log('UID do admin:', ADMIN_UID);
    
    // Usar o UID correto do admin autenticado
    const adminRef = ref(database, `admins/${ADMIN_UID}`);
    
    await set(adminRef, adminData);
    
    console.log('✅ Administrador padrão adicionado com sucesso!');
    console.log('📧 Email: admin@oficina.com');
    console.log('🔑 Senha: 123456');
    console.log('🆔 UID: ' + ADMIN_UID);
    console.log('');
    console.log('📝 Agora você pode:');
    console.log('1. Fazer login com admin@oficina.com / 123456');
    console.log('2. O sistema deve redirecionar para a área administrativa');
    
  } catch (error) {
    console.error('❌ Erro ao adicionar administrador:', error);
    console.error('Detalhes do erro:', error.message);
  }
}

// Executar
addDefaultAdmin(); 