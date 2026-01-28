console.log('Greenhouse Tracker background service worker loaded');

// Listen for extension icon click
chrome.action.onClicked.addListener((tab) => {
  chrome.action.openPopup();
});

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openPopup') {
    chrome.action.openPopup();
  }
  return true;
});

// Update badge with application count
async function updateBadge() {
  try {
    const response = await fetch('http://localhost:3001/api/analytics/overview');
    const data = await response.json();
    
    if (data.success) {
      const count = data.data.stats.total.toString();
      chrome.action.setBadgeText({ text: count });
      chrome.action.setBadgeBackgroundColor({ color: '#667eea' });
    }
  } catch (error) {
    console.error('Error updating badge:', error);
  }
}
