chrome.webNavigation.onCommitted.addListener((details) => {
  const url = details.url;

  if (!url.startsWith("http")) return;

  chrome.scripting
    .executeScript({
      target: { tabId: details.tabId, allFrames: true },
      files: ["content.js"],
    })
    .catch(() => {});
});
