# Sistema de Gerenciamento de Serviços - React Native

Este é um aplicativo móvel desenvolvido em React Native para gerenciamento de serviços de oficina mecânica.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Android Studio (para desenvolvimento Android)
- Xcode (para desenvolvimento iOS, apenas em macOS)

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
cd oficina-reactnative
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o projeto:
```bash
npm start
# ou
yarn start
```

## Executando o Aplicativo

1. Após iniciar o projeto, você verá um QR Code no terminal
2. Para Android:
   - Instale o aplicativo Expo Go na Play Store
   - Escaneie o QR Code com o aplicativo
3. Para iOS:
   - Instale o aplicativo Expo Go na App Store
   - Escaneie o QR Code com a câmera do iPhone

## Estrutura do Projeto

```
src/
  ├── screens/         # Telas do aplicativo
  ├── components/      # Componentes reutilizáveis
  ├── navigation/      # Configuração de navegação
  ├── services/        # Serviços e APIs
  └── utils/          # Funções utilitárias
```

## Funcionalidades

- Área do Administrador
- Área do Cliente
- Área do Mecânico
- Gerenciamento de serviços
- Acompanhamento de status
- Histórico de serviços

## Tecnologias Utilizadas

- React Native
- Expo
- React Navigation
- AsyncStorage
- JavaScript 