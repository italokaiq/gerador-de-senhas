class PasswordGenerator {
  constructor() {
    this.chars = {
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };
    
    this.init();
  }
  
  init() {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    
    generateBtn.addEventListener('click', () => this.generatePassword());
    copyBtn.addEventListener('click', () => this.copyPassword());
    
    // Gerar senha inicial
    this.generatePassword();
  }
  
  generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const includeNumbers = document.getElementById('numbers').checked;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    
    let charset = '';
    
    if (includeLowercase) charset += this.chars.lowercase;
    if (includeUppercase) charset += this.chars.uppercase;
    if (includeNumbers) charset += this.chars.numbers;
    if (includeSymbols) charset += this.chars.symbols;
    
    if (!charset) {
      alert('Selecione pelo menos uma opção!');
      return;
    }
    
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    document.getElementById('generated-password').value = password;
  }
  
  async copyPassword() {
    const passwordField = document.getElementById('generated-password');
    const copyBtn = document.getElementById('copy-btn');
    
    try {
      await navigator.clipboard.writeText(passwordField.value);
      copyBtn.textContent = '✓';
      copyBtn.style.background = '#28a745';
      
      setTimeout(() => {
        copyBtn.textContent = '📋';
        copyBtn.style.background = '#28a745';
      }, 1000);
    } catch (err) {
      // Fallback para navegadores mais antigos
      passwordField.select();
      document.execCommand('copy');
      copyBtn.textContent = '✓';
      
      setTimeout(() => {
        copyBtn.textContent = '📋';
      }, 1000);
    }
  }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
  new PasswordGenerator();
});