# 🔧 Oficina App - Sistema de Gerenciamento Completo

Aplicativo React Native para gerenciamento completo de oficina mecânica com integração Firebase Realtime Database.

## 🚀 **FUNCIONALIDADES IMPLEMENTADAS**

### **👤 Sistema de Autenticação e Perfis**
- ✅ Login com email/senha via Firebase Auth
- ✅ Sistema de perfis: Admin, Cliente, Mecânico
- ✅ Contexto global de usuário
- ✅ Navegação baseada em função
- ✅ Logout padronizado em todas as áreas

### **👨‍💼 Área do Administrador**
- ✅ **Gerenciamento de Clientes**
  - Listar, adicionar, editar e excluir clientes
  - Validações de CPF, email e telefone únicos
  - Feedback padronizado após operações
- ✅ **Gerenciamento de Mecânicos**
  - Listar, adicionar, editar e excluir mecânicos
  - Controle de status (ativo/inativo)
  - Validações de especialidade e matrícula
- ✅ **Gerenciamento de Produtos**
  - Cadastro de produtos/serviços
  - Controle de preços e estoque
  - Categorização de produtos
- ✅ **Gerenciamento de Ordens de Serviço (OS)**
  - Criação e edição de OS
  - Alocação de mecânicos
  - Controle de status (pendente, em andamento, concluída)
  - Histórico completo de OS
- ✅ **Solicitações de Serviço**
  - Visualização de solicitações de clientes
  - Aprovação/rejeição de solicitações
  - Conversão de solicitação em OS
  - Edição de solicitações antes da aprovação

### **👨‍🔧 Área do Mecânico**
- ✅ **Minhas OS**
  - Visualização de OS alocadas
  - Atualização de status de OS
  - Histórico de trabalhos realizados
- ✅ **Consulta de Produtos**
  - Busca de produtos disponíveis
  - Visualização de preços e estoque
  - Filtros por categoria

### **🚗 Área do Cliente**
- ✅ **Meus Veículos**
  - Cadastro e gerenciamento de veículos
  - Histórico de veículos
  - Informações detalhadas (marca, modelo, ano, placa)
- ✅ **Minhas OS**
  - Visualização de OS do cliente
  - Acompanhamento de status
  - Solicitação de cancelamento de OS
  - Histórico completo
- ✅ **Contratar Serviço**
  - Criação de solicitação de serviço
  - Seleção de veículo
  - Descrição detalhada do problema
  - Acompanhamento de status da solicitação

### **🔄 Fluxo de Solicitações**
- ✅ Cliente cria solicitação de serviço
- ✅ Admin visualiza e pode aprovar/rejeitar
- ✅ Admin pode editar solicitação antes de aprovar
- ✅ Aprovação converte solicitação em OS real
- ✅ Mecânico é alocado automaticamente
- ✅ Cliente acompanha status em tempo real

## 🛠️ **TECNOLOGIAS UTILIZADAS**

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **Firebase** - Backend e autenticação
  - Firebase Auth (autenticação)
  - Realtime Database (dados em tempo real)
- **React Navigation** - Navegação entre telas
- **AsyncStorage** - Armazenamento local

## 📱 **ESTRUTURA DO PROJETO**

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ActionCard.js
│   ├── DateInput.js
│   ├── Header.js
│   └── StatusCard.js
├── config/             # Configurações
│   ├── environment.js
│   └── firebase.js
├── constants/          # Constantes do app
│   ├── colors.js
│   ├── icons.js
│   └── texts.js
├── context/           # Contexto global
│   └── UserContext.js
├── Model/             # Modelos de dados
│   ├── Cliente.js
│   ├── Mecanico.js
│   ├── OS.js
│   ├── Produto.js
│   ├── Veiculo.js
│   ├── dao/
│   └── DTO/
├── screens/           # Telas do app
│   ├── LoginScreen.js
│   ├── HomeScreen.js
│   ├── AdminScreen.js
│   ├── ClientScreen.js
│   ├── MechanicScreen.js
│   ├── AddClientScreen.js
│   ├── EditClientScreen.js
│   ├── ManageClientsScreen.js
│   ├── AddMechanicScreen.js
│   ├── EditMechanicScreen.js
│   ├── ManageMechanicsScreen.js
│   ├── AddProductScreen.js
│   ├── EditProductScreen.js
│   ├── ManageProductsScreen.js
│   ├── AddOSScreen.js
│   ├── EditOSScreen.js
│   ├── ManageOSScreen.js
│   └── ManageRequestsScreen.js
├── services/          # Serviços de API
│   ├── adminService.js
│   ├── clientService.js
│   ├── firebaseService.js
│   ├── mechanicService.js
│   ├── osService.js
│   ├── productService.js
│   └── userProfileService.js
└── utils/            # Utilitários
    ├── firebaseTest.js
    └── validation.js
```

## 🚀 **COMO USAR**

### **1. Pré-requisitos**
- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)

### **2. Instalação**
```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd Oficina-ReactNative

# Instale as dependências
npm install
```

### **3. Configuração do Firebase**

#### **3.1 Criar Projeto Firebase**
1. Acesse [Console do Firebase](https://console.firebase.google.com)
2. Crie um novo projeto
3. Ative o **Authentication** (Email/Password)
4. Ative o **Realtime Database**

#### **3.2 Configurar Credenciais**
1. Vá em **Configurações do Projeto** > **Configurações do SDK**
2. Copie as credenciais para `src/config/environment.js`:

```javascript
export const FIREBASE_CONFIG = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  databaseURL: "https://seu-projeto-default-rtdb.firebaseio.com",
  projectId: "seu-projeto",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

#### **3.3 Configurar Regras do Realtime Database**
```json
{
  "rules": {
    "admins": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "clientes": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "mecanicos": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "produtos": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "ordensServico": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "preos": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "veiculos": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "usuarios": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

### **4. Executar o App**
```bash
# Iniciar o servidor de desenvolvimento
npm start

# Ou usar comandos específicos
npm run android  # Para Android
npm run ios      # Para iOS
npm run web      # Para Web
```

### **5. Testar a Conexão Firebase**
```bash
# Testar se o Firebase está configurado corretamente
node test-firebase.js
```

## 👥 **PERFIS DE USUÁRIO**

### **🔧 Administrador**
- Acesso completo ao sistema
- Gerenciamento de clientes, mecânicos, produtos
- Criação e gerenciamento de OS
- Aprovação de solicitações de serviço
- Visualização de relatórios

### **👨‍🔧 Mecânico**
- Visualização de OS alocadas
- Atualização de status de OS
- Consulta de produtos disponíveis
- Histórico de trabalhos realizados

### **🚗 Cliente**
- Gerenciamento de veículos
- Visualização de OS próprias
- Solicitação de cancelamento de OS
- Criação de solicitações de serviço
- Acompanhamento de status

## 🔧 **FUNCIONALIDADES ESPECÍFICAS**

### **Sistema de Solicitações**
- Cliente cria solicitação de serviço
- Admin visualiza e pode aprovar/rejeitar
- Conversão automática em OS após aprovação
- Alocação automática de mecânico

### **Controle de Cancelamento**
- Cliente pode solicitar cancelamento de OS
- Admin visualiza solicitações de cancelamento
- Sistema de confirmação antes do cancelamento

### **Validações Implementadas**
- CPF único por cliente
- Email único por usuário
- Matrícula única por mecânico
- Validação de telefone
- Campos obrigatórios

## 🛡️ **SEGURANÇA**

- ✅ Autenticação obrigatória via Firebase Auth
- ✅ Validações de entrada em todos os formulários
- ✅ Tratamento de erros centralizado
- ✅ Logs de auditoria para operações críticas
- ✅ Controle de acesso baseado em perfil

## 🔍 **DIAGNÓSTICO DE PROBLEMAS**

### **Problemas Comuns**

#### **Erro de Conexão Firebase**
```bash
# Teste a conexão
node test-firebase.js
```

#### **Botões não funcionam no Web**
- Use `window.confirm()` em vez de `Alert` no ambiente web
- Verifique console do navegador para erros

#### **Problemas de Autenticação**
- Verifique se o Firebase Auth está ativo
- Confirme se as regras do Realtime Database estão corretas
- Verifique se o usuário está logado

### **Logs de Debug**
O app inclui logs detalhados para diagnóstico:
- Operações CRUD com feedback
- Validações de dados
- Erros de autenticação
- Problemas de conexão

## 📋 **PRÓXIMOS PASSOS**

### **Melhorias Planejadas**
- [ ] Implementar notificações push
- [ ] Adicionar relatórios e estatísticas
- [ ] Implementar sistema de pagamentos
- [ ] Adicionar upload de imagens
- [ ] Implementar chat entre cliente e mecânico
- [ ] Adicionar sistema de avaliações
- [ ] Implementar backup automático

### **Refatorações**
- [ ] Migrar para estrutura de features
- [ ] Implementar testes automatizados
- [ ] Adicionar TypeScript
- [ ] Implementar cache local
- [ ] Otimizar performance

## 🤝 **CONTRIBUIÇÃO**

Para contribuir com o projeto:

1. **Fork** o repositório
2. Crie uma **branch** para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um **Pull Request**

### **Padrões de Código**
- Use nomes descritivos para variáveis e funções
- Adicione comentários em português
- Mantenha a estrutura de pastas organizada
- Teste suas mudanças antes de submeter

## 📄 **LICENÇA**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 **SUPORTE**

Se encontrar problemas ou tiver dúvidas:
1. Verifique a seção de diagnóstico acima
2. Consulte o arquivo `TROUBLESHOOTING.md`
3. Abra uma issue no repositório
4. Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ para otimizar a gestão de oficinas mecânicas** 