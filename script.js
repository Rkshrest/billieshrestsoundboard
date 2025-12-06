const sounds = {
  clip1: new Audio("everything.mp3"),
  clip2: new Audio("iloveyou.mp3"),
  clip3: new Audio("the30th.mp3"),
  clip4: new Audio("wildflower.mp3"),
};

const labels = {
  clip1: "everything i wanted",
  clip2: "i love you",
  clip3: "the 30th",
  clip4: "wildflower",
};

const buttons = document.querySelectorAll(".btn");
const nowPlaying = document.getElementById("now-playing");
const volumeSlider = document.getElementById("volume");
const muteBtn = document.getElementById("mute");

let muted = false;
let lastVol = volumeSlider.value;

function stopAll() {
  Object.values(sounds).forEach(a => {
    a.pause();
    a.currentTime = 0;
  });
  buttons.forEach(btn => btn.classList.remove("active"));
}
function toggleSound(key) {
  const audio = sounds[key];

  if (!audio.paused && audio.currentTime > 0) {
    audio.pause();
    audio.currentTime = 0;
    nowPlaying.textContent = "Now Playing: None";
    buttons.forEach(btn => btn.classList.remove("active"));
  } else {
    stopAll();
    audio.volume = lastVol;
    audio.play();
    nowPlaying.textContent = "Now Playing: " + labels[key];

    const btn = document.querySelector(`[data-sound="${key}"]`);
    if (btn) btn.classList.add("active");
  }
}
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    toggleSound(btn.getAttribute("data-sound"));
  });
});

// volume control
volumeSlider.addEventListener("input", e => {
  if (!muted) {
    lastVol = e.target.value;
    Object.values(sounds).forEach(a => a.volume = lastVol);
  } else {
    lastVol = e.target.value;
  }
});

// mute
muteBtn.addEventListener("click", () => {
  muted = !muted;
  muteBtn.textContent = muted ? "Unmute" : "Mute";
  Object.values(sounds).forEach(a => a.volume = muted ? 0 : lastVol);
});

