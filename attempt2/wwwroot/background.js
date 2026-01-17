// background.js

// Listen for timer start messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startTimer") {
    const { duration } = request;

    chrome.alarms.clear("pomodoroTimer");

    chrome.alarms.create("pomodoroTimer", {
      delayInMinutes: duration / 60,
    });

    chrome.storage.local.set({
      timerEndTime: Date.now() + duration * 1000,
      timerDuration: duration,
      isRunning: true,
    });

    sendResponse({ success: true });
    return true;
  }

  if (request.action === "pauseTimer") {
    chrome.alarms.clear("pomodoroTimer");

    chrome.storage.local.get(["timerEndTime", "timerDuration"], (result) => {
      if (result.timerEndTime) {
        const remaining = Math.max(
          0,
          Math.floor((result.timerEndTime - Date.now()) / 1000)
        );
        chrome.storage.local.set({
          isRunning: false,
          remaining: remaining,
        });
      } else {
        chrome.storage.local.set({ isRunning: false });
      }
      sendResponse({ success: true });
    });

    return true;
  }

  if (request.action === "resetTimer") {
    chrome.alarms.clear("pomodoroTimer");
    chrome.storage.local.remove([
      "timerEndTime",
      "timerDuration",
      "isRunning",
      "remaining",
    ]);
    sendResponse({ success: true });
    return true;
  }

  if (request.action === "getTimeRemaining") {
    chrome.storage.local.get(
      ["timerEndTime", "timerDuration", "isRunning", "remaining"],
      (result) => {
        if (result.isRunning && result.timerEndTime) {
          const remaining = Math.max(
            0,
            Math.floor((result.timerEndTime - Date.now()) / 1000)
          );
          const total = result.timerDuration || remaining;
          sendResponse({
            remaining,
            isRunning: true,
            total: total,
          });
        } else if (result.remaining !== undefined) {
          const total = result.timerDuration || result.remaining;
          sendResponse({
            remaining: result.remaining,
            isRunning: false,
            total: total,
          });
        } else {
          sendResponse({
            remaining: 0,
            isRunning: false,
            total: 0,
          });
        }
      }
    );
    return true;
  }

  // Handle playSound message from offscreen document
  if (request.action === "playSound") {
    // This is sent from the background to offscreen,
    // offscreen will handle it - we don't need to respond here
    return false;
  }
});

// Listen for alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    console.log("Timer alarm fired!");

    // Update storage
    chrome.storage.local.set({
      isRunning: false,
      remaining: 0,
    });

    // Show notification
    showNotification();

    // Play sound
    playAlarmSound();
  }
});

function showNotification() {
  console.log("showNotification called");

  chrome.notifications
    .create({
      type: "basic",
      iconUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      title: "Pomodoro Timer",
      message: "Time's up! Take a break!",
    })
    .then((notificationId) => {
      console.log("Notification created successfully:", notificationId);
    })
    .catch((error) => {
      console.error("Notification creation failed:", error);
    });
}

function playAlarmSound() {
  console.log("playAlarmSound called");

  chrome.offscreen
    .createDocument({
      url: "offscreen.html",
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Play timer completion sound",
    })
    .then(() => {
      console.log("Offscreen document created");
      setTimeout(() => {
        // Send message but don't expect a response
        chrome.runtime.sendMessage({ action: "playSound" }).catch((error) => {
          // Ignore the error if the message channel closes
          console.log("Sound message sent (channel may have closed)");
        });
      }, 300);
    })
    .catch((error) => {
      if (error.message && error.message.includes("Only a single offscreen")) {
        console.log("Offscreen document already exists");
        // Send message but don't expect a response
        chrome.runtime.sendMessage({ action: "playSound" }).catch((error) => {
          console.log("Sound message sent (channel may have closed)");
        });
      } else {
        console.error("Error creating offscreen document:", error);
      }
    });
}
