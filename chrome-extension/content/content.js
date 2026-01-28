// content.js - Extract job details from job sites

console.log('Greenhouse Tracker content script loaded');

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractJobDetails') {
    const jobDetails = extractJobDetails();
    sendResponse({ success: true, data: jobDetails });
  }
  return true;
});

// Extract job details based on current site
function extractJobDetails() {
  const url = window.location.href;
  
  if (url.includes('linkedin.com')) {
    return extractLinkedInJob();
  } else if (url.includes('indeed.com')) {
    return extractIndeedJob();
  } else if (url.includes('glassdoor.com')) {
    return extractGlassdoorJob();
  }
  
  return {};
}

// Extract from LinkedIn
function extractLinkedInJob() {
  return {
    company: document.querySelector('.job-details-jobs-unified-top-card__company-name')?.textContent.trim() || '',
    position: document.querySelector('.job-details-jobs-unified-top-card__job-title')?.textContent.trim() || '',
    location: document.querySelector('.job-details-jobs-unified-top-card__bullet')?.textContent.trim() || '',
    salary: document.querySelector('.job-details-jobs-unified-top-card__job-insight')?.textContent.trim() || '',
  };
}

// Extract from Indeed
function extractIndeedJob() {
  return {
    company: document.querySelector('[data-company-name="true"]')?.textContent.trim() || '',
    position: document.querySelector('.jobsearch-JobInfoHeader-title')?.textContent.trim() || '',
    location: document.querySelector('[data-testid="job-location"]')?.textContent.trim() || '',
    salary: document.querySelector('.jobsearch-JobMetadataHeader-item')?.textContent.trim() || '',
  };
}

// Extract from Glassdoor
function extractGlassdoorJob() {
  return {
    company: document.querySelector('[data-test="employer-name"]')?.textContent.trim() || '',
    position: document.querySelector('[data-test="job-title"]')?.textContent.trim() || '',
    location: document.querySelector('[data-test="location"]')?.textContent.trim() || '',
    salary: document.querySelector('[data-test="salary-estimate"]')?.textContent.trim() || '',
  };
}

// Add "Save to Greenhouse" button to job pages
function addSaveButton() {
  if (document.getElementById('greenhouse-save-btn')) return;
  
  const button = document.createElement('button');
  button.id = 'greenhouse-save-btn';
  button.textContent = '🎯 Save to Greenhouse Tracker';
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 9999;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: all 0.3s;
  `;
  
  button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
  });
  
  button.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openPopup' });
  });
  
  document.body.appendChild(button);
}

// Add button when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addSaveButton);
} else {
  addSaveButton();
}