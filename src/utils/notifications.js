import { Alert } from 'react-native';
import { ENV } from '../config/environment';
import { TEXTS } from '../constants/texts';

class NotificationManager {
  constructor() {
    this.enabled = ENV.NOTIFICATION.enabled;
    this.sound = ENV.NOTIFICATION.sound;
    this.vibration = ENV.NOTIFICATION.vibration;
  }

  // Mostrar alerta simples
  showAlert(title, message, buttons = [{ text: 'OK' }]) {
    if (!this.enabled) return;
    
    Alert.alert(title, message, buttons);
  }

  // Mostrar confirmação
  showConfirmation(title, message, onConfirm, onCancel) {
    if (!this.enabled) return;
    
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: onCancel
        },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: onConfirm
        }
      ]
    );
  }

  // Notificação de sucesso
  showSuccess(message, title = 'Sucesso') {
    this.showAlert(title, message);
  }

  // Notificação de erro
  showError(message, title = 'Erro') {
    this.showAlert(title, message);
  }

  // Notificação de aviso
  showWarning(message, title = 'Aviso') {
    this.showAlert(title, message);
  }

  // Notificação de informação
  showInfo(message, title = 'Informação') {
    this.showAlert(title, message);
  }

  // Confirmação de exclusão
  showDeleteConfirmation(itemType, onConfirm, onCancel) {
    const messages = {
      mechanic: TEXTS.confirmations.deleteMechanic,
      client: TEXTS.confirmations.deleteClient,
      product: TEXTS.confirmations.deleteProduct,
      os: TEXTS.confirmations.deleteOS,
    };

    const message = messages[itemType] || 'Tem certeza que deseja excluir este item?';
    
    this.showConfirmation(
      'Confirmar Exclusão',
      message,
      onConfirm,
      onCancel
    );
  }

  // Confirmação de logout
  showLogoutConfirmation(onConfirm, onCancel) {
    this.showConfirmation(
      'Confirmar Saída',
      TEXTS.confirmations.logout,
      onConfirm,
      onCancel
    );
  }

  // Notificação de sucesso para CRUD
  showCRUDSuccess(action, itemType) {
    const messages = {
      mechanic: {
        added: TEXTS.success.mechanicAdded,
        updated: TEXTS.success.mechanicUpdated,
        deleted: TEXTS.success.mechanicDeleted,
      },
      client: {
        added: TEXTS.success.clientAdded,
        updated: TEXTS.success.clientUpdated,
        deleted: TEXTS.success.clientDeleted,
      },
      product: {
        added: TEXTS.success.productAdded,
        updated: TEXTS.success.productUpdated,
        deleted: TEXTS.success.productDeleted,
      },
      os: {
        added: TEXTS.success.osAdded,
        updated: TEXTS.success.osUpdated,
        deleted: TEXTS.success.osDeleted,
      },
    };

    const message = messages[itemType]?.[action] || 'Operação realizada com sucesso!';
    this.showSuccess(message);
  }

  // Notificação de erro de rede
  showNetworkError() {
    this.showError(TEXTS.errors.networkError);
  }

  // Notificação de erro de autenticação
  showAuthError() {
    this.showError(TEXTS.errors.authError);
  }

  // Notificação de erro de validação
  showValidationError() {
    this.showError(TEXTS.errors.validationError);
  }

  // Notificação de erro genérico
  showUnknownError() {
    this.showError(TEXTS.errors.unknownError);
  }

  // Habilitar/desabilitar notificações
  setEnabled(enabled) {
    this.enabled = enabled;
  }

  // Configurar som
  setSound(enabled) {
    this.sound = enabled;
  }

  // Configurar vibração
  setVibration(enabled) {
    this.vibration = enabled;
  }
}

// Instância singleton
export const notificationManager = new NotificationManager();

// Helpers para uso direto
export const showAlert = (title, message, buttons) => {
  notificationManager.showAlert(title, message, buttons);
};

export const showSuccess = (message, title) => {
  notificationManager.showSuccess(message, title);
};

export const showError = (message, title) => {
  notificationManager.showError(message, title);
};

export const showWarning = (message, title) => {
  notificationManager.showWarning(message, title);
};

export const showInfo = (message, title) => {
  notificationManager.showInfo(message, title);
};

export const showDeleteConfirmation = (itemType, onConfirm, onCancel) => {
  notificationManager.showDeleteConfirmation(itemType, onConfirm, onCancel);
};

export const showLogoutConfirmation = (onConfirm, onCancel) => {
  notificationManager.showLogoutConfirmation(onConfirm, onCancel);
}; 