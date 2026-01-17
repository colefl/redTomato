// offscreen.js
let audioReady = false;

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("alarm");
  if (audio) {
    // Preload the audio
    audio.load();
    audio.addEventListener("canplaythrough", () => {
      audioReady = true;
      console.log("Audio loaded and ready");
    });
    audio.addEventListener("error", (e) => {
      console.error("Audio load error:", e);
      console.error("Audio src:", audio.src);
      console.error("Audio error code:", audio.error?.code);
    });
  } else {
    console.error("Audio element not found!");
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "playSound") {
    const audio = document.getElementById("alarm");

    if (!audio) {
      console.error("Audio element not found");
      return;
    }

    if (!audioReady) {
      console.warn("Audio not fully loaded yet, attempting to play anyway...");
    }

    console.log("Attempting to play sound...");
    audio
      .play()
      .then(() => {
        console.log("MP3 sound played successfully");
      })
      .catch((err) => {
        console.error("Error playing sound:", err.name, err.message);
      });
  }
});
