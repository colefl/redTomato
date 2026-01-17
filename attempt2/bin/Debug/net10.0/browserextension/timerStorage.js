window.timerStorage = {
  saveStart: async (totalSeconds, breakpoints) => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          action: "startTimer",
          duration: totalSeconds,
          breakpoints: breakpoints || [],
        },
        (response) => resolve(response)
      );
    });
  },

  savePause: async (remainingSeconds, totalSeconds, breakpoints) => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          action: "pauseTimer",
          remaining: remainingSeconds,
          total: totalSeconds,
          breakpoints: breakpoints || [],
        },
        (response) => resolve(response)
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
