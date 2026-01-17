window.timerStorage = {
  saveStart: async (totalSeconds) => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { action: "startTimer", duration: totalSeconds },
        (response) => resolve(response)
      );
    });
  },

  savePause: async () => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: "pauseTimer" }, (response) =>
        resolve(response)
      );
    });
  },

  load: async () => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: "getTimeRemaining" }, (response) =>
        resolve(response)
      );
    });
  },

  clear: async () => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ action: "resetTimer" }, (response) =>
        resolve(response)
      );
    });
  },
};
