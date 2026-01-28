const API_URL = 'http://localhost:3001/api';

document.addEventListener('DOMContentLoaded', () => {
  setupForm();
  autoFillFromPage();
});

function setupForm() {
  document.getElementById('jobForm').addEventListener('submit', handleSubmit);
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
    const response = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      showMessage('✅ Job saved successfully!', 'success');
      document.getElementById('jobForm').reset();
      setTimeout(() => window.close(), 2000);
    } else {
      showMessage('❌ Failed to save job', 'error');
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