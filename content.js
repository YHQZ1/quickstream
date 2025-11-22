let currentSpeed = 1.0;
const STEP = 0.1;
const BIG_STEP = 1.0;
const MIN_SPEED = 0.1;
const MAX_SPEED = 20;

let overlayTimer = null;
const observedVideos = new WeakSet();

function ensureOverlay() {
  let ol = document.getElementById("quickstream-overlay");
  if (ol) return;

  ol = document.createElement("div");
  ol.id = "quickstream-overlay";
  ol.style.position = "fixed";
  ol.style.top = "12px";
  ol.style.left = "50%";
  ol.style.transform = "translateX(-50%)";
  ol.style.zIndex = 2147483647;
  ol.style.background = "rgba(0,0,0,0.85)";
  ol.style.color = "#fff";
  ol.style.padding = "6px 10px";
  ol.style.borderRadius = "6px";
  ol.style.fontFamily = "Arial, sans-serif";
  ol.style.fontSize = "14px";
  ol.style.boxShadow = "0 2px 8px rgba(0,0,0,0.4)";
  ol.style.pointerEvents = "none";
  ol.style.opacity = "0";
  ol.style.transition = "opacity 120ms ease";
  document.documentElement.appendChild(ol);
}

function showOverlay(text) {
  ensureOverlay();
  const ol = document.getElementById("quickstream-overlay");
  ol.textContent = text;
  ol.style.opacity = "1";

  if (overlayTimer) clearTimeout(overlayTimer);
  overlayTimer = setTimeout(() => (ol.style.opacity = "0"), 1200);
}

function setupVideo(video) {
  if (observedVideos.has(video)) return;

  try {
    video.playbackRate = currentSpeed;
  } catch (e) {}

  const onRateChange = () => {
    if (Math.abs(video.playbackRate - currentSpeed) > 0.001) {
      try {
        video.playbackRate = currentSpeed;
      } catch (e) {}
    }
  };

  video.addEventListener("ratechange", onRateChange);
  observedVideos.add(video);
}

function applySpeedToVideos() {
  document.querySelectorAll("video").forEach(setupVideo);
}

function resetSpeed() {
  currentSpeed = 1.0;

  document.querySelectorAll("video").forEach((v) => {
    try {
      v.playbackRate = 1.0;
    } catch (e) {}
  });

  const yt = document.getElementById("movie_player");
  if (yt && yt.setPlaybackRate) {
    try {
      yt.setPlaybackRate(1.0);
    } catch (e) {}
  }

  showOverlay("1.00×");
}

function setSpeed(newSpeed, notify = true) {
  newSpeed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, newSpeed));
  currentSpeed = Math.round(newSpeed * 100) / 100;

  document.querySelectorAll("video").forEach((v) => {
    try {
      v.playbackRate = currentSpeed;
    } catch (e) {}
  });

  const yt = document.getElementById("movie_player");
  if (yt && yt.setPlaybackRate) {
    try {
      yt.setPlaybackRate(currentSpeed);
    } catch (e) {}
  }

  if (notify) showOverlay(currentSpeed.toFixed(2) + "×");
}

function isTypingTarget(e) {
  const t = e.target;
  if (!t) return false;
  const tag = (t.tagName || "").toLowerCase();
  return (
    tag === "input" ||
    tag === "textarea" ||
    tag === "select" ||
    t.isContentEditable
  );
}

document.addEventListener(
  "keydown",
  (e) => {
    if (e.repeat) return;
    if (isTypingTarget(e)) return;

    const key = (e.key || "").toLowerCase();

    if (key === "f") {
      e.preventDefault();
      setSpeed(currentSpeed + (e.shiftKey ? BIG_STEP : STEP));
    } else if (key === "s") {
      e.preventDefault();
      setSpeed(currentSpeed - (e.shiftKey ? BIG_STEP : STEP));
    } else if (key === "r" && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      resetSpeed();
    }
  },
  true
);

resetSpeed();

let lastUrl = location.href;
setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    resetSpeed();
  }
}, 1000);

setInterval(applySpeedToVideos, 2000);
