import { ENV } from '../config/environment';

// Validações de formulário
export const validation = {
  // Validar email
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validar CPF (formato básico)
  isValidCpf(cpf) {
    const cpfClean = cpf.replace(/\D/g, '');
    return cpfClean.length === 11;
  },

  // Validar telefone (formato básico)
  isValidPhone(phone) {
    const phoneClean = phone.replace(/\D/g, '');
    return phoneClean.length >= 10 && phoneClean.length <= 11;
  },

  // Validar senha
  isValidPassword(password) {
    return password.length >= ENV.VALIDATION.minPasswordLength;
  },

  // Validar nome
  isValidName(name) {
    return name.trim().length >= 2 && name.trim().length <= ENV.VALIDATION.maxNameLength;
  },

  // Validar especialidade
  isValidSpecialty(specialty) {
    return specialty.trim().length >= 2 && specialty.trim().length <= ENV.VALIDATION.maxSpecialtyLength;
  },

  // Validar matrícula (opcional)
  isValidMatricula(matricula) {
    if (!matricula) return true; // Opcional
    return matricula.trim().length <= ENV.VALIDATION.maxMatriculaLength;
  }
};

// Funções de formatação
export const formatting = {
  // Formatar CPF
  formatCpf(cpf) {
    const cpfClean = cpf.replace(/\D/g, '');
    return cpfClean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },

  // Formatar telefone
  formatPhone(phone) {
    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length === 11) {
      return phoneClean.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (phoneClean.length === 10) {
      return phoneClean.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  },

  // Limpar formatação
  cleanFormat(text) {
    return text.replace(/\D/g, '');
  }
};

// Mensagens de erro
export const errorMessages = {
  required: 'Este campo é obrigatório',
  invalidEmail: 'Email inválido',
  invalidCpf: 'CPF inválido',
  invalidPhone: 'Telefone inválido',
  weakPassword: `A senha deve ter pelo menos ${ENV.VALIDATION.minPasswordLength} caracteres`,
  invalidName: 'Nome deve ter entre 2 e 100 caracteres',
  invalidSpecialty: 'Especialidade deve ter entre 2 e 50 caracteres',
  invalidMatricula: 'Matrícula deve ter no máximo 20 caracteres',
  alreadyExists: 'Este valor já está cadastrado no sistema'
}; 