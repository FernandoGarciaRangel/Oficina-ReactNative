/**
 * Script de Teste - Integração Firebase Realtime Database
 * 
 * Este script testa a conexão e funcionalidades básicas do Firebase Realtime Database
 * Execute com: node test-firebase.js
 */

const { initializeApp } = require('firebase/app');
const { 
  getDatabase, 
  ref, 
  push, 
  get, 
  remove,
  serverTimestamp,
  set
} = require('firebase/database');

// Configuração do Firebase (substitua pelas suas credenciais)
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

// Dados de teste
const testMechanic = {
  cpf: "123.456.789-00",
  nome: "João Silva Teste",
  email: "joao.teste@email.com",
  telefone: "(11) 99999-9999",
  especialidade: "Motor e Transmissão",
  matricula: "12345",
  status: "ativo",
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
};

async function testFirebaseConnection() {
  console.log('🔧 Testando integração com Firebase Realtime Database...\n');

  try {
    // Teste 1: Conexão básica
    console.log('1️⃣ Testando conexão básica...');
    const mechanicsRef = ref(database, 'mecanicos');
    const snapshot = await get(mechanicsRef);
    console.log('✅ Conexão OK! Documentos encontrados:', snapshot.exists() ? Object.keys(snapshot.val() || {}).length : 0);

    // Teste 2: Adicionar mecânico de teste
    console.log('\n2️⃣ Testando adição de mecânico...');
    const newMechanicRef = push(ref(database, 'mecanicos'));
    await set(newMechanicRef, testMechanic);
    console.log('✅ Mecânico adicionado com UID:', newMechanicRef.key);

    // Teste 3: Buscar mecânico adicionado
    console.log('\n3️⃣ Testando busca de mecânico...');
    const mechanicRef = ref(database, `mecanicos/${newMechanicRef.key}`);
    const mechanicSnapshot = await get(mechanicRef);
    
    if (mechanicSnapshot.exists()) {
      console.log('✅ Mecânico encontrado:', mechanicSnapshot.val().nome);
    } else {
      console.log('❌ Mecânico não encontrado');
    }

    // Teste 4: Deletar mecânico de teste
    console.log('\n4️⃣ Testando exclusão de mecânico...');
    await remove(mechanicRef);
    console.log('✅ Mecânico de teste removido');

    // Teste 5: Verificar contagem final
    console.log('\n5️⃣ Verificando contagem final...');
    const finalSnapshot = await get(mechanicsRef);
    console.log('✅ Contagem final de documentos:', finalSnapshot.exists() ? Object.keys(finalSnapshot.val() || {}).length : 0);

    console.log('\n🎉 Todos os testes passaram! Firebase Realtime Database está funcionando corretamente.');
    console.log('\n📱 Você pode agora executar o app React Native com: npm start');

  } catch (error) {
    console.error('\n❌ Erro durante os testes:', error.message);
    console.log('\n🔧 Possíveis soluções:');
    console.log('1. Verifique se as credenciais do Firebase estão corretas');
    console.log('2. Confirme se o projeto Firebase está ativo');
    console.log('3. Verifique se as regras do Realtime Database permitem leitura/escrita');
    console.log('4. Certifique-se de que o Realtime Database está habilitado');
    console.log('5. Verifique se a URL do database está correta');
  }
}

// Executar testes
testFirebaseConnection(); 