// CorpFinGuard - Main JavaScript

// Utility Functions
const Utils = {
  // DOM Selectors
  select: (selector) => document.querySelector(selector),
  selectAll: (selector) => document.querySelectorAll(selector),
  
  // Class Management
  addClass: (el, className) => el?.classList.add(className),
  removeClass: (el, className) => el?.classList.remove(className),
  toggleClass: (el, className) => el?.classList.toggle(className),
  hasClass: (el, className) => el?.classList.contains(className),
  
  // Element Creation
  createElement: (tag, className = '', text = '') => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  },
  
  // Event Listeners
  on: (el, event, handler) => el?.addEventListener(event, handler),
  off: (el, event, handler) => el?.removeEventListener(event, handler),
  
  // Storage
  setStorage: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  getStorage: (key) => JSON.parse(localStorage.getItem(key)),
  removeStorage: (key) => localStorage.removeItem(key),
  
  // API Calls
  fetch: async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },
  
  // Notifications
  showNotification: (message, type = 'info') => {
    const notification = Utils.createElement('div', `alert alert-${type}`);
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  },
  
  // Form Validation
  validateEmail: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  validatePassword: (password) => password.length >= 6,
  
  // Formatting
  formatCurrency: (value) => new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(value),
  
  formatDate: (date) => new Intl.DateTimeFormat('tr-TR').format(new Date(date)),
};

// Authentication Module
const Auth = {
  isLoggedIn: () => !!Utils.getStorage('authToken'),
  
  login: async (email, password) => {
    try {
      const response = await Utils.fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      Utils.setStorage('authToken', response.token);
      Utils.setStorage('user', response.user);
      return true;
    } catch (error) {
      Utils.showNotification('Giriş başarısız', 'error');
      return false;
    }
  },
  
  logout: () => {
    Utils.removeStorage('authToken');
    Utils.removeStorage('user');
    window.location.href = '/index.html';
  },
  
  getUser: () => Utils.getStorage('user'),
  
  getToken: () => Utils.getStorage('authToken'),
};

// Analysis Module
const Analysis = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${Auth.getToken()}`,
        },
      });
      
      if (!response.ok) throw new Error('Upload failed');
      return await response.json();
    } catch (error) {
      Utils.showNotification('Dosya yükleme başarısız', 'error');
      throw error;
    }
  },
  
  analyzeData: async (data) => {
    try {
      const response = await Utils.fetch('/api/analyze', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Authorization': `Bearer ${Auth.getToken()}`,
        },
      });
      return response;
    } catch (error) {
      Utils.showNotification('Analiz başarısız', 'error');
      throw error;
    }
  },
  
  generateReport: async (analysisId, format = 'pdf') => {
    try {
      const response = await fetch(`/api/report/${analysisId}?format=${format}`, {
        headers: {
          'Authorization': `Bearer ${Auth.getToken()}`,
        },
      });
      
      if (!response.ok) throw new Error('Report generation failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${analysisId}.${format}`;
      a.click();
    } catch (error) {
      Utils.showNotification('Rapor oluşturma başarısız', 'error');
    }
  },
};

// Dashboard Module
const Dashboard = {
  init: () => {
    if (!Auth.isLoggedIn()) {
      window.location.href = '/login.html';
      return;
    }
    
    Dashboard.loadAnalyses();
    Dashboard.setupEventListeners();
  },
  
  loadAnalyses: async () => {
    try {
      const analyses = await Utils.fetch('/api/analyses', {
        headers: {
          'Authorization': `Bearer ${Auth.getToken()}`,
        },
      });
      Dashboard.renderAnalyses(analyses);
    } catch (error) {
      console.error('Failed to load analyses:', error);
    }
  },
  
  renderAnalyses: (analyses) => {
    const container = Utils.select('#analyses-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    analyses.forEach(analysis => {
      const card = Utils.createElement('div', 'card');
      card.innerHTML = `
        <div class="card-header">
          <h3 class="card-title">${analysis.companyName}</h3>
          <p class="text-muted">${Utils.formatDate(analysis.createdAt)}</p>
        </div>
        <div class="card-body">
          <p><strong>Risk Seviyesi:</strong> ${analysis.riskLevel}</p>
          <p><strong>Toplam Aktif:</strong> ${Utils.formatCurrency(analysis.totalAssets)}</p>
        </div>
        <div class="card-footer flex-between">
          <button class="btn btn-primary" onclick="Dashboard.viewAnalysis('${analysis.id}')">
            Detayları Gör
          </button>
          <button class="btn btn-secondary" onclick="Analysis.generateReport('${analysis.id}', 'pdf')">
            PDF İndir
          </button>
        </div>
      `;
      container.appendChild(card);
    });
  },
  
  viewAnalysis: (id) => {
    window.location.href = `/xai.html?id=${id}`;
  },
  
  setupEventListeners: () => {
    const logoutBtn = Utils.select('#logout-btn');
    if (logoutBtn) {
      Utils.on(logoutBtn, 'click', () => Auth.logout());
    }
  },
};

// Form Handling
const Forms = {
  setupLoginForm: () => {
    const form = Utils.select('#login-form');
    if (!form) return;
    
    Utils.on(form, 'submit', async (e) => {
      e.preventDefault();
      
      const email = Utils.select('#email').value;
      const password = Utils.select('#password').value;
      
      if (!Utils.validateEmail(email)) {
        Utils.showNotification('Geçerli bir email girin', 'error');
        return;
      }
      
      if (!Utils.validatePassword(password)) {
        Utils.showNotification('Şifre en az 6 karakter olmalı', 'error');
        return;
      }
      
      const success = await Auth.login(email, password);
      if (success) {
        window.location.href = '/dashboard.html';
      }
    });
  },
  
  setupSignupForm: () => {
    const form = Utils.select('#signup-form');
    if (!form) return;
    
    Utils.on(form, 'submit', async (e) => {
      e.preventDefault();
      
      const email = Utils.select('#email').value;
      const password = Utils.select('#password').value;
      const confirmPassword = Utils.select('#confirm-password').value;
      
      if (!Utils.validateEmail(email)) {
        Utils.showNotification('Geçerli bir email girin', 'error');
        return;
      }
      
      if (!Utils.validatePassword(password)) {
        Utils.showNotification('Şifre en az 6 karakter olmalı', 'error');
        return;
      }
      
      if (password !== confirmPassword) {
        Utils.showNotification('Şifreler eşleşmiyor', 'error');
        return;
      }
      
      try {
        await Utils.fetch('/api/signup', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });
        Utils.showNotification('Kayıt başarılı. Giriş yapabilirsiniz.', 'success');
        setTimeout(() => {
          window.location.href = '/login.html';
        }, 2000);
      } catch (error) {
        Utils.showNotification('Kayıt başarısız', 'error');
      }
    });
  },
  
  setupUploadForm: () => {
    const form = Utils.select('#upload-form');
    if (!form) return;
    
    Utils.on(form, 'submit', async (e) => {
      e.preventDefault();
      
      const fileInput = Utils.select('#file-input');
      const file = fileInput?.files[0];
      
      if (!file) {
        Utils.showNotification('Lütfen bir dosya seçin', 'error');
        return;
      }
      
      try {
        const result = await Analysis.uploadFile(file);
        Utils.showNotification('Dosya başarıyla yüklendi', 'success');
        setTimeout(() => {
          window.location.href = `/xai.html?id=${result.analysisId}`;
        }, 1000);
      } catch (error) {
        console.error('Upload error:', error);
      }
    });
  },
};

// Page Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Determine current page and initialize
  const currentPage = window.location.pathname;
  
  if (currentPage.includes('login')) {
    Forms.setupLoginForm();
  } else if (currentPage.includes('signup')) {
    Forms.setupSignupForm();
  } else if (currentPage.includes('dashboard')) {
    Dashboard.init();
  } else if (currentPage.includes('upload')) {
    Forms.setupUploadForm();
  }
});

// Global Error Handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  Utils.showNotification('Bir hata oluştu. Lütfen sayfayı yenileyin.', 'error');
});
