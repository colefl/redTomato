// background.js

let checkInterval = null;

// Listen for timer start messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startTimer") {
    const { duration, breakpoints } = request;

    chrome.alarms.clear("pomodoroTimer");

    chrome.alarms.create("pomodoroTimer", {
      delayInMinutes: duration / 60,
    });

    chrome.storage.local.set({
      timerEndTime: Date.now() + duration * 1000,
      timerDuration: duration,
      isRunning: true,
      breakpoints: breakpoints || [],
      triggeredBreakpoints: [],
    });

    // Start checking breakpoints every second
    startBreakpointChecking();

    sendResponse({ success: true });
    return true;
  }

  if (request.action === "pauseTimer") {
    const { remaining, total, breakpoints } = request;

    chrome.alarms.clear("pomodoroTimer");
    stopBreakpointChecking();

    chrome.storage.local.set({
      isRunning: false,
      remaining: remaining,
      timerDuration: total,
      breakpoints: breakpoints || [],
    });

    sendResponse({ success: true });
    return true;
  }

  if (request.action === "resetTimer") {
    chrome.alarms.clear("pomodoroTimer");
    stopBreakpointChecking();
    chrome.storage.local.remove([
      "timerEndTime",
      "timerDuration",
      "isRunning",
      "remaining",
      "breakpoints",
      "triggeredBreakpoints",
    ]);
    sendResponse({ success: true });
    return true;
  }

  if (request.action === "getTimeRemaining") {
    chrome.storage.local.get(
      [
        "timerEndTime",
        "timerDuration",
        "isRunning",
        "remaining",
        "breakpoints",
        "triggeredBreakpoints",
      ],
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
            breakpoints: result.breakpoints || [],
          });
        } else if (result.remaining !== undefined) {
          const total = result.timerDuration || result.remaining;
          sendResponse({
            remaining: result.remaining,
            isRunning: false,
            total: total,
            breakpoints: result.breakpoints || [],
          });
        } else {
          sendResponse({
            remaining: 0,
            isRunning: false,
            total: 0,
            breakpoints: [],
          });
        }
      }
    );
    return true;
  }

  if (request.action === "playSound") {
    return false;
  }
});

// Start periodic breakpoint checking
function startBreakpointChecking() {
  stopBreakpointChecking(); // Clear any existing interval

  checkInterval = setInterval(() => {
    chrome.storage.local.get(
      [
        "timerEndTime",
        "timerDuration",
        "isRunning",
        "breakpoints",
        "triggeredBreakpoints",
      ],
      (result) => {
        if (!result.isRunning || !result.timerEndTime) {
          stopBreakpointChecking();
          return;
        }

        const remaining = Math.max(
          0,
          Math.floor((result.timerEndTime - Date.now()) / 1000)
        );
        const total = result.timerDuration;

        if (remaining <= 0) {
          stopBreakpointChecking();
          return;
        }

        checkBreakpoints(
          remaining,
          total,
          result.breakpoints || [],
          result.triggeredBreakpoints || []
        );
      }
    );
  }, 1000); // Check every second
}

function stopBreakpointChecking() {
  if (checkInterval) {
    clearInterval(checkInterval);
    checkInterval = null;
  }
}

// Check and trigger breakpoints
function checkBreakpoints(
  remainingSeconds,
  totalSeconds,
  breakpoints,
  triggeredBreakpoints
) {
  if (!breakpoints || breakpoints.length === 0) return;

  // Calculate percentage REMAINING
  const percentRemaining = (remainingSeconds / totalSeconds) * 100;
  const percentComplete =
    ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  console.log(
    `Timer: ${remainingSeconds}s / ${totalSeconds}s | Complete: ${percentComplete.toFixed(
      1
    )}% | Remaining: ${percentRemaining.toFixed(1)}%`
  );
  console.log(`Breakpoints:`, breakpoints, `Triggered:`, triggeredBreakpoints);

  breakpoints.forEach((breakpointPercent) => {
    // Check if remaining percentage has dropped to or below the breakpoint
    // and haven't triggered it yet
    if (
      percentRemaining <= breakpointPercent &&
      !triggeredBreakpoints.includes(breakpointPercent)
    ) {
      console.log(
        `✓ BREAKPOINT TRIGGERED at ${breakpointPercent}% remaining (actual: ${percentRemaining.toFixed(
          1
        )}% left)`
      );

      // Mark this breakpoint as triggered
      triggeredBreakpoints.push(breakpointPercent);
      chrome.storage.local.set({ triggeredBreakpoints });

      // Play sound
      playBreakpointSound();

      // Show notification
      showBreakpointNotification(breakpointPercent);
    }
  });
}

// Listen for alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    console.log("Timer alarm fired!");

    stopBreakpointChecking();

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

function showBreakpointNotification(percentage) {
  chrome.notifications
    .create({
      type: "basic",
      iconUrl:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      title: "Breakpoint Reached!",
      message: `${percentage}% of time remaining!`,
    })
    .then((notificationId) => {
      console.log(`Breakpoint notification created: ${percentage}%`);
    })
    .catch((error) => {
      console.error("Breakpoint notification failed:", error);
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
        chrome.runtime.sendMessage({ action: "playSound" }).catch((error) => {
          console.log("Sound message sent (channel may have closed)");
        });
      }, 300);
    })
    .catch((error) => {
      if (error.message && error.message.includes("Only a single offscreen")) {
        console.log("Offscreen document already exists");
        chrome.runtime.sendMessage({ action: "playSound" }).catch((error) => {
          console.log("Sound message sent (channel may have closed)");
        });
      } else {
        console.error("Error creating offscreen document:", error);
      }
    });
}

function playBreakpointSound() {
  console.log("playBreakpointSound called");

  chrome.offscreen
    .createDocument({
      url: "offscreen.html",
      reasons: ["AUDIO_PLAYBACK"],
      justification: "Play breakpoint sound",
    })
    .then(() => {
      setTimeout(() => {
        chrome.runtime
          .sendMessage({ action: "playBreakpointSound" })
          .catch(() => {
            console.log("Breakpoint sound message sent");
          });
      }, 300);
    })
    .catch((error) => {
      if (error.message && error.message.includes("Only a single offscreen")) {
        chrome.runtime
          .sendMessage({ action: "playBreakpointSound" })
          .catch(() => {
            console.log("Breakpoint sound message sent");
          });
      }
    });
}
