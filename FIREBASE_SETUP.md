# Configuração do Firebase - Sistema de Oficina

Este documento explica como configurar e usar o Firebase Realtime Database no projeto da Oficina React Native.

## 📋 Pré-requisitos

1. Conta no Google Firebase Console
2. Projeto Firebase criado
3. Realtime Database habilitado
4. Autenticação configurada (opcional, mas recomendada)

## 🔧 Configuração do Firebase

### 1. Criar Projeto no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique em "Adicionar projeto"
3. Digite o nome do projeto (ex: "oficina-reactnative")
4. Siga os passos de configuração

### 2. Configurar Realtime Database

1. No console do Firebase, vá para "Realtime Database"
2. Clique em "Criar banco de dados"
3. Escolha "Iniciar no modo de teste" (para desenvolvimento)
4. Selecione a localização do servidor (recomendado: us-central1)

### 3. Configurar Regras de Segurança

1. No Realtime Database, vá para a aba "Regras"
2. Substitua as regras existentes pelo conteúdo do arquivo `database.rules.json`
3. Clique em "Publicar"

### 4. Obter Configurações do Projeto

1. No console do Firebase, clique na engrenagem (⚙️) ao lado de "Visão geral do projeto"
2. Selecione "Configurações do projeto"
3. Role até "Seus aplicativos" e clique em "Adicionar app"
4. Escolha "Web" e registre o app
5. Copie as configurações do Firebase

### 5. Atualizar Configurações no Código

Edite o arquivo `src/config/firebase.js` e substitua as configurações pelas suas:

```javascript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  databaseURL: "https://seu-projeto-default-rtdb.firebaseio.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};
```

## 🗄️ Estrutura do Banco de Dados

### Nó: `mecanicos`

Cada nó representa um mecânico com os seguintes campos:

```javascript
{
  "uid": "auto-generated", // UID do nó
  "cpf": "123.456.789-00",
  "nome": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "(11) 99999-9999",
  "especialidade": "Motor e Transmissão",
  "matricula": "12345",
  "status": "ativo", // "ativo" ou "inativo"
  "createdAt": timestamp,
  "updatedAt": timestamp
}
```

### Estrutura Completa do Banco

```
{
  "usuarios": {
    "uid1": {
      "uid": "uid1",
      "email": "admin@oficina.com",
      "funcao": "ADMIN"
    }
  },
  "mecanicos": {
    "uid1": {
      "matricula": "12345",
      "nome": "João Silva",
      "cpf": "123.456.789-00",
      "email": "joao@oficina.com",
      "telefone": "(11) 99999-9999",
      "especialidade": "Motor",
      "status": "ativo",
      "createdAt": timestamp,
      "updatedAt": timestamp
    }
  },
  "clientes": {
    "uid1": {
      "cpf": "987.654.321-00",
      "telefone": "(11) 88888-8888",
      "nome": "Maria Santos"
    }
  },
  "veiculos": {
    "placa1": {
      "placa": "ABC-1234",
      "modelo": "Civic",
      "marca": "Honda",
      "idCliente": "uid1"
    }
  },
  "oss": {
    "os1": {
      "preco": 500.00,
      "dataInicio": timestamp,
      "descricao": "Troca de óleo",
      "idVeiculo": "placa1",
      "idMecanico": "uid1",
      "itens": {
        "item1": {
          "precoProd": 50.00,
          "quantidade": 1,
          "precoPraticado": 50.00,
          "idProduto": "prod1"
        }
      }
    }
  },
  "produtos": {
    "prod1": {
      "codigo": "001",
      "quantidade": 10,
      "nome": "Óleo de Motor",
      "precoAtual": 50.00
    }
  }
}
```

## 🔐 Segurança

### Regras de Segurança Implementadas

- **Usuários**: Apenas admins podem ler/escrever
- **Mecânicos**: Admins podem gerenciar, mecânicos podem editar seus próprios dados
- **Clientes**: Admins e mecânicos podem ler, admins podem escrever
- **Veículos**: Admins e mecânicos podem ler, admins podem escrever
- **OS**: Admins podem gerenciar, mecânicos podem editar suas OS
- **Produtos**: Todos autenticados podem ler, apenas admins podem escrever

### Índices Configurados

Os seguintes índices estão configurados para otimizar consultas:

- **mecanicos**: matricula, nome, cpf, email, status, especialidade
- **clientes**: cpf, nome
- **veiculos**: placa, modelo, marca
- **oss**: dataInicio, dataFim, idVeiculo, idMecanico
- **produtos**: codigo, nome
- **usuarios**: email

## 🚀 Funcionalidades Implementadas

### Serviço de Mecânicos (`mechanicService.js`)

- ✅ **getAllMechanics()**: Buscar todos os mecânicos
- ✅ **getMechanicById(uid)**: Buscar mecânico por UID
- ✅ **getMechanicsByStatus(status)**: Filtrar por status
- ✅ **getMechanicsBySpecialty(especialidade)**: Filtrar por especialidade
- ✅ **addMechanic(data)**: Adicionar novo mecânico
- ✅ **updateMechanic(uid, data)**: Atualizar mecânico
- ✅ **deleteMechanic(uid)**: Excluir mecânico
- ✅ **updateMechanicStatus(uid, status)**: Atualizar status
- ✅ **checkCpfExists(cpf, excludeUid)**: Verificar CPF duplicado
- ✅ **checkEmailExists(email, excludeUid)**: Verificar email duplicado
- ✅ **checkMatriculaExists(matricula, excludeUid)**: Verificar matrícula duplicada

### Telas Integradas

- ✅ **ManageMechanicsScreen**: Listagem com busca e ações
- ✅ **AddMechanicScreen**: Formulário de cadastro
- ✅ **EditMechanicScreen**: Formulário de edição

## 🧪 Testando a Integração

### 1. Verificar Conexão

```javascript
// No console do navegador ou logs do app
import { database } from './src/config/firebase';
import { ref, get } from 'firebase/database';

// Testar conexão
const testConnection = async () => {
  try {
    const mechanicsRef = ref(database, 'mecanicos');
    const snapshot = await get(mechanicsRef);
    console.log('Conexão OK! Mecânicos:', snapshot.exists() ? Object.keys(snapshot.val() || {}).length : 0);
  } catch (error) {
    console.error('Erro na conexão:', error);
  }
};
```

### 2. Executar Teste Automático

```bash
node test-firebase.js
```

### 3. Adicionar Dados de Teste

Use o console do Firebase ou adicione mecânicos através do app para testar.

## 🔧 Solução de Problemas

### Erro: "Permission denied"

1. Verifique se as regras de segurança estão publicadas
2. Confirme se o usuário está autenticado (se aplicável)
3. Verifique se os dados estão no formato correto

### Erro: "Database URL not found"

1. Verifique se a `databaseURL` está correta no `firebase.js`
2. Confirme se o Realtime Database está habilitado

### Erro: "Index not found"

1. Acesse o console do Firebase
2. Vá para Realtime Database > Regras
3. Verifique se os índices estão configurados corretamente

### Erro: "Firebase App named '[DEFAULT]' already exists"

1. Verifique se o Firebase está sendo inicializado apenas uma vez
2. Confirme se não há múltiplas importações do arquivo de configuração

## 📱 Próximos Passos

1. **Implementar Autenticação**: Adicionar login/logout de usuários
2. **Adicionar Outras Entidades**: Clientes, Veículos, Ordens de Serviço
3. **Implementar Notificações**: Push notifications para atualizações
4. **Adicionar Offline Support**: Sincronização offline com Realtime Database
5. **Implementar Analytics**: Rastreamento de uso do app

## 🔄 Diferenças do Firestore

### Vantagens do Realtime Database

- **Sincronização em tempo real**: Dados são sincronizados automaticamente
- **Performance**: Mais rápido para operações simples
- **Simplicidade**: Estrutura mais simples para dados hierárquicos
- **Custo**: Geralmente mais barato para aplicações pequenas/médias

### Estrutura de Dados

- **Firestore**: Coleções e documentos
- **Realtime Database**: Nós e valores

### Consultas

- **Firestore**: Queries complexas com múltiplos filtros
- **Realtime Database**: Consultas mais simples, baseadas em índices

## 📞 Suporte

Para dúvidas sobre a configuração do Firebase, consulte:
- [Documentação oficial do Firebase](https://firebase.google.com/docs)
- [Guia do Realtime Database](https://firebase.google.com/docs/database)
- [Regras de Segurança](https://firebase.google.com/docs/database/security) 