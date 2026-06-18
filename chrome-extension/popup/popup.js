const API_URL = 'http://localhost:3001/api';
let authMode = 'login';

document.addEventListener('DOMContentLoaded', () => {
  setupForm();
  setupAuth();
  autoFillFromPage();
});

function setupForm() {
  document.getElementById('jobForm').addEventListener('submit', handleSubmit);
}

function setupAuth() {
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('logoutButton').addEventListener('click', handleLogout);
  document.getElementById('toggleAuthMode').addEventListener('click', toggleAuthMode);
  document.getElementById('openApp').addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:5173/login' });
  });

  chrome.storage.local.get(['token', 'user'], ({ token, user }) => {
    setAuthenticatedState(Boolean(token), user);
  });
}

function toggleAuthMode() {
  authMode = authMode === 'login' ? 'register' : 'login';
  const isRegister = authMode === 'register';

  document.getElementById('nameGroup').classList.toggle('hidden', !isRegister);
  document.getElementById('name').required = isRegister;
  document.querySelector('#loginForm button[type="submit"]').textContent = isRegister
    ? 'Create Account'
    : 'Login to Save Jobs';
  document.getElementById('toggleAuthMode').textContent = isRegister
    ? 'Back to Login'
    : 'Create New Account';
}

async function handleLogin(e) {
  e.preventDefault();

  const payload = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };

  if (authMode === 'register') {
    payload.name = document.getElementById('name').value;
  }

  try {
    const response = await fetch(`${API_URL}/auth/${authMode}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (!response.ok) {
      showMessage(data.message || '❌ Login failed', 'error');
      return;
    }

    await chrome.storage.local.set({ token: data.token, user: data.user });
    setAuthenticatedState(true, data.user);
    showMessage(authMode === 'register' ? '✅ Account created successfully' : '✅ Logged in successfully', 'success');
  } catch (error) {
    console.error('Auth error:', error);
    showMessage('❌ Could not connect to server. Make sure backend is running!', 'error');
  }
}

async function handleLogout() {
  await chrome.storage.local.remove(['token', 'user']);
  setAuthenticatedState(false);
  showMessage('Logged out', 'success');
}

function setAuthenticatedState(isAuthenticated, user = null) {
  document.getElementById('loginForm').classList.toggle('hidden', isAuthenticated);
  document.getElementById('jobForm').classList.toggle('hidden', !isAuthenticated);
  document.getElementById('userLabel').textContent = user?.email ? `Saving as ${user.email}` : '';
}

async function handleSubmit(e) {
  e.preventDefault();
  
  const formData = {
    company: document.getElementById('company').value,
    position: document.getElementById('position').value,
    location: document.getElementById('location').value,
    salary: document.getElementById('salary').value,
    status: document.getElementById('status').value,
    notes: document.getElementById('notes').value,
    appliedDate: new Date().toISOString(),
  };
  
  try {
    const { token } = await chrome.storage.local.get('token');

    if (!token) {
      setAuthenticatedState(false);
      showMessage('❌ Please log in first', 'error');
      return;
    }

    const response = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      showMessage('✅ Job saved successfully!', 'success');
      document.getElementById('jobForm').reset();
      setTimeout(() => window.close(), 2000);
    } else {
      const data = await response.json().catch(() => ({}));
      showMessage(data.message || '❌ Failed to save job', 'error');
      if (response.status === 401) {
        await chrome.storage.local.remove(['token', 'user']);
        setAuthenticatedState(false);
      }
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('❌ Could not connect to server. Make sure backend is running!', 'error');
  }
}

function showMessage(text, type) {
  const msg = document.getElementById('message');
  msg.textContent = text;
  msg.className = `message ${type}`;
}

async function autoFillFromPage() {
  try {
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    
    if (tab.url.includes('linkedin.com') || tab.url.includes('indeed.com') || tab.url.includes('glassdoor.com')) {
      chrome.tabs.sendMessage(tab.id, {action: 'extractJobDetails'}, (response) => {
        if (response && response.success) {
          document.getElementById('company').value = response.data.company || '';
          document.getElementById('position').value = response.data.position || '';
          document.getElementById('location').value = response.data.location || '';
          document.getElementById('salary').value = response.data.salary || '';
        }
      });
    }
  } catch (error) {
    console.error('Auto-fill error:', error);
  }
}
