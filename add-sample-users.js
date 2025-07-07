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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Dados do cliente
const CLIENT_UID = "cCgzVDSqoxRexvBxnkVt0a2NAI43";
const clientData = {
  nome: "Cliente Teste",
  email: "cliente@oficina.com",
  cpf: "11122233344",
  telefone: "(11) 90000-0001",
  funcao: "cliente",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Dados do mecânico
const MECANICO_UID = "pLvv6jMX9sUckr9BnULV6MjmzDp1";
const mecanicoData = {
  nome: "Mecânico Teste",
  email: "mecanico@oficiona.com",
  cpf: "55566677788",
  telefone: "(11) 90000-0002",
  especialidade: "Motor",
  status: "ativo",
  funcao: "mecanico",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

async function addSampleUsers() {
  try {
    // Adicionar cliente
    const clientRef = ref(database, `clientes/${CLIENT_UID}`);
    await set(clientRef, clientData);
    console.log('✅ Cliente adicionado com sucesso!');
    console.log('Email:', clientData.email);
    console.log('Senha: 123456');
    console.log('UID:', CLIENT_UID);

    // Adicionar mecânico
    const mecanicoRef = ref(database, `mecanicos/${MECANICO_UID}`);
    await set(mecanicoRef, mecanicoData);
    console.log('✅ Mecânico adicionado com sucesso!');
    console.log('Email:', mecanicoData.email);
    console.log('Senha: 123456');
    console.log('UID:', MECANICO_UID);

    console.log('\nPronto! Agora você pode fazer login como cliente ou mecânico.');
  } catch (error) {
    console.error('❌ Erro ao adicionar usuários:', error);
  }
}

addSampleUsers(); 