const twitterUrlPattern = /^https?:\/\/(\w+\.)?twitter\.com\/.*$/;
const coloredIconPath = { 48: "assets/twitter-48.png" };
const grayIconPath = { 48: "assets/twitter-gray-48.png" };

function setIcon(tab, path) {
  chrome.action.setIcon({
    path: path,
    tabId: tab.id,
  });
}

function updateIcon(tab) {
  if (tab.url.match(twitterUrlPattern)) {
    setIcon(tab, coloredIconPath);
  } else {
    setIcon(tab, grayIconPath);
  }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    updateIcon(tab);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateIcon(tab);
  });
});
