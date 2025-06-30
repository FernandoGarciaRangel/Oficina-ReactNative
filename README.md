# Oficina App - Sistema de Gerenciamento de Serviços (Mobile)

Este é um aplicativo móvel desenvolvido em **React Native** (Expo) para gerenciamento de serviços de oficina mecânica, com integração completa ao **Firebase**.

## 🚀 Funcionalidades Implementadas

### ✅ Gerenciamento de Mecânicos
- **Listagem de Mecânicos**: Visualização completa com busca e filtros
- **Cadastro de Mecânicos**: Formulário completo com validações
- **Edição de Mecânicos**: Modificação de dados existentes
- **Exclusão de Mecânicos**: Remoção segura com confirmação
- **Ativação/Desativação**: Controle de status dos mecânicos
- **Validações**: CPF e email únicos, campos obrigatórios

### 🔄 Integração Firebase
- **Firestore Database**: Armazenamento em tempo real
- **Regras de Segurança**: Validações e permissões configuradas
- **Sincronização**: Dados sempre atualizados
- **Offline Support**: Funcionalidade básica offline

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS, apenas em macOS)
- Conta no Firebase Console

## 🔧 Configuração do Firebase

**IMPORTANTE**: Antes de executar o app, configure o Firebase:

1. Siga o guia completo em [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
2. Configure as credenciais no arquivo `src/config/firebase.js`
3. Publique as regras de segurança do arquivo `firestore.rules`

## 📦 Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd Oficina-ReactNative
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure o Firebase (veja FIREBASE_SETUP.md)

4. Inicie o projeto:
```bash
npm start
# ou
yarn start
```

## 🎯 Executando o Aplicativo

1. Após iniciar o projeto, você verá um QR Code no terminal
2. Para Android:
   - Instale o aplicativo Expo Go na Play Store
   - Escaneie o QR Code com o aplicativo
3. Para iOS:
   - Instale o aplicativo Expo Go na App Store
   - Escaneie o QR Code com a câmera do iPhone

## 📁 Estrutura do Projeto

```
Oficina-ReactNative/
├── App.js                          # Componente principal
├── package.json                    # Dependências
├── README.md                       # Este arquivo
├── FIREBASE_SETUP.md              # Guia de configuração Firebase
├── firestore.rules                # Regras de segurança Firestore
├── src/
│   ├── components/                # Componentes reutilizáveis
│   │   ├── ActionCard.js
│   │   ├── Header.js
│   │   └── StatusCard.js
│   ├── constants/                 # Constantes do app
│   │   ├── colors.js
│   │   ├── icons.js
│   │   └── texts.js
│   ├── screens/                   # Telas do app
│   │   ├── AdminScreen.js         # Tela principal do admin
│   │   ├── ManageMechanicsScreen.js # Gerenciar mecânicos
│   │   ├── AddMechanicScreen.js   # Adicionar mecânico
│   │   ├── EditMechanicScreen.js  # Editar mecânico
│   │   ├── HomeScreen.js          # Tela inicial
│   │   ├── LoginScreen.js         # Tela de login
│   │   ├── ClientScreen.js        # Área do cliente
│   │   └── MechanicScreen.js      # Área do mecânico
│   ├── services/                  # Serviços externos
│   │   ├── firebaseService.js     # Serviços Firebase gerais
│   │   └── mechanicService.js     # Serviços específicos mecânicos
│   ├── config/                    # Configurações
│   │   └── firebase.js           # Configuração Firebase
│   └── Model/                     # Modelos de dados
│       ├── Cliente.js
│       ├── Mecanico.js
│       ├── OS.js
│       ├── Veiculo.js
│       └── dao/                   # Data Access Objects
├── Assets/                        # Recursos estáticos
└── icons/                         # Ícones do app
```

## 🛠️ Funcionalidades Detalhadas

### Gerenciamento de Mecânicos

#### 📋 Listagem (`ManageMechanicsScreen`)
- Lista todos os mecânicos cadastrados
- Busca por nome, especialidade ou CPF
- Filtros por status (ativo/inativo)
- Pull-to-refresh para atualizar dados
- Estados vazios informativos
- Ações rápidas: editar, ativar/desativar, excluir

#### ➕ Cadastro (`AddMechanicScreen`)
- Formulário completo com validações
- Verificação de CPF e email únicos
- Confirmação antes de sair sem salvar
- Feedback visual durante operações
- Campos obrigatórios marcados

#### ✏️ Edição (`EditMechanicScreen`)
- Dados pré-preenchidos do mecânico
- Validações de unicidade (excluindo o registro atual)
- Detecção de alterações não salvas
- Opção de exclusão integrada
- Confirmações de segurança

### 🔐 Segurança e Validações

- **Regras Firestore**: Validações no servidor
- **CPF Único**: Verificação de duplicatas
- **Email Único**: Verificação de duplicatas
- **Campos Obrigatórios**: Validação no cliente e servidor
- **Confirmações**: Ações destrutivas protegidas
- **Timestamps**: Rastreamento de criação/atualização

## 🎨 Interface do Usuário

- **Design Moderno**: Interface limpa e intuitiva
- **Cores Consistentes**: Paleta de cores padronizada
- **Feedback Visual**: Loading states e mensagens
- **Responsivo**: Adaptação a diferentes tamanhos de tela
- **Acessibilidade**: Contraste e tamanhos adequados

## 🔧 Tecnologias Utilizadas

- **React Native**: Framework mobile
- **Expo**: Plataforma de desenvolvimento
- **React Navigation**: Navegação entre telas
- **Firebase**: Backend e banco de dados
- **Firestore**: Banco de dados NoSQL
- **AsyncStorage**: Armazenamento local
- **JavaScript**: Linguagem principal

## 🚧 Próximas Funcionalidades

### 📅 Em Desenvolvimento
- [ ] Sistema de Autenticação
- [ ] Gerenciamento de Clientes
- [ ] Gerenciamento de Veículos
- [ ] Ordens de Serviço (OS)
- [ ] Notificações Push
- [ ] Relatórios e Estatísticas

### 🔮 Futuras Implementações
- [ ] Sincronização Offline Avançada
- [ ] Upload de Imagens
- [ ] Sistema de Pagamentos
- [ ] Integração com APIs Externas
- [ ] Analytics e Métricas

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Erro de Conexão Firebase**
   - Verifique as credenciais em `src/config/firebase.js`
   - Confirme se as regras estão publicadas

2. **App não carrega**
   - Verifique se todas as dependências estão instaladas
   - Limpe o cache: `expo start -c`

3. **Erro de Permissões**
   - Verifique as regras do Firestore
   - Confirme se o projeto Firebase está ativo

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação do Firebase
2. Consulte o arquivo `FIREBASE_SETUP.md`
3. Abra uma issue no repositório

---

**Este projeto está em desenvolvimento ativo e focado 100% na experiência mobile com integração Firebase!** 🚀 