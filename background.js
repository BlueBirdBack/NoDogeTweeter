function updateIcon(tab) {
  const twitterUrlPattern = /^https?:\/\/(\w+\.)?twitter\.com\/.*$/
  if (tab.url.match(twitterUrlPattern)) {
    chrome.action.setIcon({
      path: { 48: 'assets/twitter-48.png' },
      tabId: tab.id,
    })
  } else {
    chrome.action.setIcon({
      path: { 48: 'assets/twitter-gray-48.png' },
      tabId: tab.id,
    })
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateIcon(tab)
  }
})

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateIcon(tab)
  })
})
