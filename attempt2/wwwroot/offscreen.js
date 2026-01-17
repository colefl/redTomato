// offscreen.js
let audioReady = false;

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("alarm");
  const breakpointAudio = document.getElementById("breakpoint");

  if (audio) {
    audio.load();
    audio.addEventListener("canplaythrough", () => {
      audioReady = true;
      console.log("Audio loaded and ready");
    });
    audio.addEventListener("error", (e) => {
      console.error("Audio load error:", e);
    });
  }

  if (breakpointAudio) {
    breakpointAudio.load();
    console.log("Breakpoint audio loaded");
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "playSound") {
    const audio = document.getElementById("alarm");

    if (!audio) {
      console.error("Audio element not found");
      return;
    }

    console.log("Playing alarm sound...");
    audio
      .play()
      .then(() => console.log("Alarm played successfully"))
      .catch((err) => console.error("Error playing alarm:", err.message));
  }

  if (request.action === "playBreakpointSound") {
    const breakpointAudio = document.getElementById("breakpoint");

    if (!breakpointAudio) {
      console.error("Breakpoint audio element not found");
      return;
    }

    console.log("Playing breakpoint sound...");
    breakpointAudio
      .play()
      .then(() => console.log("Breakpoint sound played successfully"))
      .catch((err) =>
        console.error("Error playing breakpoint sound:", err.message)
      );
  }
});
