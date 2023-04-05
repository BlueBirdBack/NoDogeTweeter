// Function to update the extension icon based on the currently active tab's URL.
function updateIcon(tab) {
  const twitterUrlPattern = /^https?:\/\/(\w+\.)?twitter\.com\/.*$/

  // If the tab URL matches the Twitter URL pattern, set the colored icon.
  if (tab.url.match(twitterUrlPattern)) {
    chrome.action.setIcon({
      path: { 48: 'assets/twitter-48.png' },
      tabId: tab.id,
    })
  } else {
    // If the tab URL does not match the pattern, set the grayed-out icon.
    chrome.action.setIcon({
      path: { 48: 'assets/twitter-gray-48.png' },
      tabId: tab.id,
    })
  }
}

// Listen for tab updates and update the icon when the tab's status is 'complete'.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateIcon(tab)
  }
})

// Listen for tab activation and update the icon for the newly activated tab.
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateIcon(tab)
  })
})
