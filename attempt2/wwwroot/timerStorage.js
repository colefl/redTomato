window.timerStorage = {
  saveStart: (remainingSeconds, totalSeconds) => {
    chrome.storage.local.set({
      remaining: remainingSeconds,
      total: totalSeconds,
      lastStart: Date.now(),
      isRunning: true,
    });
  },

  savePause: (remainingSeconds, totalSeconds) => {
    chrome.storage.local.set({
      remaining: remainingSeconds,
      total: totalSeconds,
      lastStart: null,
      isRunning: false,
    });
  },

  load: () => {
    return new Promise((resolve) => {
      chrome.storage.local.get(
        ["remaining", "total", "lastStart", "isRunning"],
        (result) => resolve(result)
      );
    });
  },

  clear: () => {
    chrome.storage.local.clear();
  },
};
