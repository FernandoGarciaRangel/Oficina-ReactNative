/**
 * Script para Adicionar Mecânicos de Exemplo
 * 
 * Este script adiciona mecânicos de teste ao Firebase Realtime Database
 * Execute com: node add-sample-mechanics.js
 */

const { initializeApp } = require('firebase/app');
const { 
  getDatabase, 
  ref, 
  push, 
  set,
  serverTimestamp
} = require('firebase/database');

// Configuração do Firebase
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

// Dados dos mecânicos de exemplo
const sampleMechanics = [
  {
    cpf: "123.456.789-01",
    nome: "João Silva",
    email: "joao.silva@oficina.com",
    telefone: "(11) 99999-1111",
    especialidade: "Motor e Transmissão",
    matricula: "M001",
    status: "ativo"
  },
  {
    cpf: "987.654.321-02",
    nome: "Maria Santos",
    email: "maria.santos@oficina.com",
    telefone: "(11) 88888-2222",
    especialidade: "Sistema Elétrico",
    matricula: "M002",
    status: "ativo"
  },
  {
    cpf: "456.789.123-03",
    nome: "Pedro Oliveira",
    email: "pedro.oliveira@oficina.com",
    telefone: "(11) 77777-3333",
    especialidade: "Suspensão e Freios",
    matricula: "M003",
    status: "ativo"
  },
  {
    cpf: "789.123.456-04",
    nome: "Ana Costa",
    email: "ana.costa@oficina.com",
    telefone: "(11) 66666-4444",
    especialidade: "Ar Condicionado",
    matricula: "M004",
    status: "ativo"
  },
  {
    cpf: "321.654.987-05",
    nome: "Carlos Ferreira",
    email: "carlos.ferreira@oficina.com",
    telefone: "(11) 55555-5555",
    especialidade: "Injeção Eletrônica",
    matricula: "M005",
    status: "inativo"
  },
  {
    cpf: "654.987.321-06",
    nome: "Lucia Rodrigues",
    email: "lucia.rodrigues@oficina.com",
    telefone: "(11) 44444-6666",
    especialidade: "Funilaria e Pintura",
    matricula: "M006",
    status: "ativo"
  },
  {
    cpf: "987.321.654-07",
    nome: "Roberto Almeida",
    email: "roberto.almeida@oficina.com",
    telefone: "(11) 33333-7777",
    especialidade: "Motor e Transmissão",
    matricula: "M007",
    status: "ativo"
  },
  {
    cpf: "321.987.654-08",
    nome: "Fernanda Lima",
    email: "fernanda.lima@oficina.com",
    telefone: "(11) 22222-8888",
    especialidade: "Sistema Elétrico",
    matricula: "M008",
    status: "ativo"
  }
];

async function addSampleMechanics() {
  console.log('🔧 Adicionando mecânicos de exemplo...\n');

  try {
    const mechanicsRef = ref(database, 'mecanicos');
    const addedMechanics = [];

    for (const mechanic of sampleMechanics) {
      const newMechanicRef = push(mechanicsRef);
      
      const mechanicToAdd = {
        ...mechanic,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await set(newMechanicRef, mechanicToAdd);
      
      addedMechanics.push({
        uid: newMechanicRef.key,
        ...mechanicToAdd
      });

      console.log(`✅ Adicionado: ${mechanic.nome} (${mechanic.especialidade})`);
    }

    console.log(`\n🎉 Sucesso! ${addedMechanics.length} mecânicos foram adicionados.`);
    console.log('\n📱 Agora você pode executar o app e ver os mecânicos na listagem:');
    console.log('   npm start');

    throw new Error('TESTE DE ERRO - PARA DIAGNÓSTICO');

    return addedMechanics;

  } catch (error) {
    console.error('\n❌ Erro ao adicionar mecânicos:', error.message);
    throw error;
  }
}

// Executar a adição
addSampleMechanics(); 