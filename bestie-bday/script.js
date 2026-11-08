// =====================================================
// BIRTHDAY WEBSITE SCRIPT
// =====================================================

const FRIEND_NAME = "Sachi";
const emojis = ["💖", "💗", "💕", "✨", "💞"];

// Set the friend's name in every matching location.
document.querySelectorAll(".friendName").forEach((element) => {
  element.textContent = FRIEND_NAME;
});

const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Background music: browsers generally require a user interaction before playback.
const bgMusic = document.getElementById("bgMusic");
let musicStarted = false;
let wasMusicPlayingBeforeVideo = false;

if (bgMusic) bgMusic.volume = 0.5;

async function playBackgroundMusic() {
  if (!bgMusic || musicStarted) return;
  try {
    await bgMusic.play();
    musicStarted = true;
  } catch (error) {
    // Playback will be attempted again after the visitor interacts with the page.
  }
}

function resumeMusicIfNeeded() {
  if (bgMusic && bgMusic.paused) {
    bgMusic.play().then(() => { musicStarted = true; }).catch(() => {});
  }
}

window.addEventListener("load", playBackgroundMusic);
document.addEventListener("click", playBackgroundMusic, { once: true });
document.addEventListener("touchstart", playBackgroundMusic, { once: true, passive: true });
document.addEventListener("keydown", playBackgroundMusic, { once: true });

// Sections and navigation.
const intro = document.getElementById("intro-section");
const card1Section = document.getElementById("card1-section");
const card2Section = document.getElementById("card2-section");
const memoriesSection = document.getElementById("memories-section");
const doorTransition = document.getElementById("doorTransition");

const startBtn = document.getElementById("startBtn");
const nextCardBtn = document.getElementById("nextCardBtn");
const backFromCard1 = document.getElementById("backFromCard1");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const backToMainBtn = document.getElementById("backToMainBtn");

function lockBodyScroll() {
  document.body.classList.add("noScroll");
}

function unlockBodyScroll() {
  document.body.classList.remove("noScroll");
}

function hideAllSections() {
  [intro, card1Section, card2Section, memoriesSection].forEach((section) => {
    if (section) section.classList.add("hidden");
  });
}

function goTopInstant() {
  window.scrollTo({ top: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function showMainPage() {
  hideAllSections();
  if (intro) {
    intro.classList.remove("hidden");
    intro.style.opacity = "1";
    intro.style.pointerEvents = "auto";
  }
  document.body.style.background = "#000";
  goTopInstant();
}

function showCard1() {
  hideAllSections();
  if (card1Section) card1Section.classList.remove("hidden");
  document.body.style.background = "transparent";
  goTopInstant();
}

function showCard2() {
  hideAllSections();
  if (card2Section) card2Section.classList.remove("hidden");
  document.body.style.background = "transparent";
  goTopInstant();
}

function showMemories() {
  hideAllSections();
  if (memoriesSection) memoriesSection.classList.remove("hidden");
  document.body.style.background = "transparent";
  goTopInstant();
}

function startExperience() {
  if (!doorTransition || !intro) {
    showCard1();
    return;
  }

  doorTransition.classList.remove("hidden", "opening");
  void doorTransition.offsetWidth;
  intro.style.opacity = "0";
  intro.style.pointerEvents = "none";

  window.setTimeout(() => doorTransition.classList.add("opening"), 50);
  window.setTimeout(showCard1, 380);
  window.setTimeout(() => {
    doorTransition.classList.add("hidden");
    doorTransition.classList.remove("opening");
  }, 1200);
}

startBtn?.addEventListener("click", startExperience);
nextCardBtn?.addEventListener("click", showCard2);
backFromCard1?.addEventListener("click", showMainPage);
noBtn?.addEventListener("click", showMainPage);
yesBtn?.addEventListener("click", showMemories);
backToMainBtn?.addEventListener("click", showMainPage);

// Floating hearts.
function spawnHeart() {
  const container = document.getElementById("floatHearts");
  if (!container) return;

  const heart = document.createElement("div");
  heart.className = "fh";
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.animationDuration = `${Math.random() * 2 + 4}s`;
  heart.style.fontSize = `${Math.random() * 10 + 14}px`;
  container.appendChild(heart);
  window.setTimeout(() => heart.remove(), 6500);
}
window.setInterval(spawnHeart, 900);

// Birthday message modal.
const LETTER_TEXT = `Happy Birthday ${FRIEND_NAME}! 💖

I'll always be grateful for the kindness, love and support you showed me during some of my hardest days. I'll never forget everything you've done for me. May life return all that goodness to you in the most beautiful ways.

You deserve endless happiness! ✨`;

const messageModal = document.getElementById("messageModal");
const typedBox = document.getElementById("typedLetter");
const closeModalBtn = document.getElementById("closeModal");
const messageBtn = document.getElementById("messageBtn");
let typingTimer = null;

function typeMessage() {
  if (!typedBox) return;
  if (typingTimer) window.clearInterval(typingTimer);
  typedBox.textContent = "";
  let index = 0;
  typingTimer = window.setInterval(() => {
    typedBox.textContent += LETTER_TEXT[index] ?? "";
    index += 1;
    if (index >= LETTER_TEXT.length) {
      window.clearInterval(typingTimer);
      typingTimer = null;
    }
  }, 22);
}

function openMessageModal() {
  if (!messageModal) return;
  messageModal.classList.add("show");
  messageModal.setAttribute("aria-hidden", "false");
  lockBodyScroll();
  typeMessage();
}

function closeMessageModal() {
  if (!messageModal) return;
  messageModal.classList.remove("show");
  messageModal.setAttribute("aria-hidden", "true");
  unlockBodyScroll();
  if (typingTimer) window.clearInterval(typingTimer);
  typingTimer = null;
}

messageBtn?.addEventListener("click", openMessageModal);
closeModalBtn?.addEventListener("click", closeMessageModal);
messageModal?.addEventListener("click", (event) => {
  if (event.target === messageModal) closeMessageModal();
});

// Memories carousel.
const memoryImages = [
  "images/memory01.jpg",
  "images/memory02.jpg",
  "images/memory03.jpg",
  "images/memory04.jpg",
  "images/memory05.jpg"
];

const leftImg = document.getElementById("leftImg");
const centerImg = document.getElementById("centerImg");
const rightImg = document.getElementById("rightImg");
const miniIndicators = document.getElementById("miniIndicators");
const memoryPrev = document.getElementById("memoryPrev");
const memoryNext = document.getElementById("memoryNext");
const centerCard = document.getElementById("centerCard");
let activeMemory = 0;

function getIndex(index, total) {
  return (index + total) % total;
}

function renderIndicators() {
  if (!miniIndicators) return;
  miniIndicators.innerHTML = "";

  memoryImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to memory ${index + 1}`);
    dot.classList.toggle("active", index === activeMemory);
    dot.addEventListener("click", () => {
      activeMemory = index;
      updateMemoryCarousel();
    });
    miniIndicators.appendChild(dot);
  });
}

function updateMemoryCarousel() {
  const total = memoryImages.length;
  if (!total) return;

  const leftIndex = getIndex(activeMemory - 1, total);
  const rightIndex = getIndex(activeMemory + 1, total);

  if (leftImg) {
    leftImg.src = memoryImages[leftIndex];
    leftImg.alt = `Memory ${leftIndex + 1}`;
  }
  if (centerImg) {
    centerImg.src = memoryImages[activeMemory];
    centerImg.alt = `Memory ${activeMemory + 1}`;
  }
  if (rightImg) {
    rightImg.src = memoryImages[rightIndex];
    rightImg.alt = `Memory ${rightIndex + 1}`;
  }
  renderIndicators();
}

memoryPrev?.addEventListener("click", () => {
  activeMemory = getIndex(activeMemory - 1, memoryImages.length);
  updateMemoryCarousel();
});

memoryNext?.addEventListener("click", () => {
  activeMemory = getIndex(activeMemory + 1, memoryImages.length);
  updateMemoryCarousel();
});

// Open the selected centre image in a larger preview.
const imageModal = document.getElementById("imageModal");
const modalMemoryImg = document.getElementById("modalMemoryImg");
const imageClose = document.getElementById("imageClose");

centerCard?.addEventListener("click", () => {
  if (!imageModal || !modalMemoryImg) return;
  modalMemoryImg.src = memoryImages[activeMemory];
  modalMemoryImg.alt = `Memory ${activeMemory + 1}`;
  imageModal.classList.add("show");
  imageModal.setAttribute("aria-hidden", "false");
  lockBodyScroll();
});

function closeImageModal() {
  imageModal?.classList.remove("show");
  imageModal?.setAttribute("aria-hidden", "true");
  unlockBodyScroll();
}

imageClose?.addEventListener("click", closeImageModal);
imageModal?.addEventListener("click", (event) => {
  if (event.target === imageModal) closeImageModal();
});

// Optional Sorry gallery. It works when the matching button is enabled in index.html.
const sorryBtn = document.getElementById("sorryBtn");
const sorryModal = document.getElementById("sorryModal");
const sorryModalImg = document.getElementById("sorryModalImg");
const sorryCaption = document.getElementById("sorryCaption");
const sorryDots = document.getElementById("sorryDots");
const sorryPrev = document.getElementById("sorryPrev");
const sorryNext = document.getElementById("sorryNext");
const sorryClose = document.getElementById("sorryClose");
const sorryImages = [
  "images/sorry1.jpeg", "images/sorry2.jpeg", "images/sorry3.jpeg",
  "images/sorry4.jpeg", "images/sorry5.jpeg", "images/sorry6.jpeg"
];
let activeSorry = 0;

function renderSorryDots() {
  if (!sorryDots) return;
  sorryDots.innerHTML = "";
  sorryImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to sorry photo ${index + 1}`);
    dot.classList.toggle("active", index === activeSorry);
    dot.addEventListener("click", () => {
      activeSorry = index;
      updateSorryGallery();
    });
    sorryDots.appendChild(dot);
  });
}

function updateSorryGallery() {
  if (sorryModalImg) {
    sorryModalImg.src = sorryImages[activeSorry];
    sorryModalImg.alt = `Sorry photo ${activeSorry + 1}`;
  }
  if (sorryCaption) sorryCaption.textContent = `Photo ${activeSorry + 1}`;
  renderSorryDots();
}

function openSorryModal() {
  activeSorry = activeMemory % sorryImages.length;
  updateSorryGallery();
  sorryModal?.classList.add("show");
  sorryModal?.setAttribute("aria-hidden", "false");
  lockBodyScroll();
}

function closeSorryModal() {
  sorryModal?.classList.remove("show");
  sorryModal?.setAttribute("aria-hidden", "true");
  unlockBodyScroll();
}

sorryBtn?.addEventListener("click", openSorryModal);
sorryPrev?.addEventListener("click", () => {
  activeSorry = getIndex(activeSorry - 1, sorryImages.length);
  updateSorryGallery();
});
sorryNext?.addEventListener("click", () => {
  activeSorry = getIndex(activeSorry + 1, sorryImages.length);
  updateSorryGallery();
});
sorryClose?.addEventListener("click", closeSorryModal);
sorryModal?.addEventListener("click", (event) => {
  if (event.target === sorryModal) closeSorryModal();
});

// Optional video modal. Enable its button in index.html to use it.
const mostLikedVideoBtn = document.getElementById("mostLikedVideoBtn");
const videoModal = document.getElementById("videoModal");
const videoClose = document.getElementById("videoClose");
const videoPreviewWrap = document.getElementById("videoPreviewWrap");
const videoPlayerWrap = document.getElementById("videoPlayerWrap");
const videoPlayBtn = document.getElementById("videoPlayBtn");
const mostLikedVideo = document.getElementById("mostLikedVideo");

function resetVideoModal() {
  videoPreviewWrap?.classList.remove("hidden");
  videoPlayerWrap?.classList.add("hidden");
  if (mostLikedVideo) {
    mostLikedVideo.pause();
    mostLikedVideo.currentTime = 0;
  }
}

function openVideoModal() {
  wasMusicPlayingBeforeVideo = !!bgMusic && !bgMusic.paused;
  if (wasMusicPlayingBeforeVideo) bgMusic.pause();
  resetVideoModal();
  videoModal?.classList.add("show");
  videoModal?.setAttribute("aria-hidden", "false");
  lockBodyScroll();
}

function playMostLikedVideo(event) {
  event?.stopPropagation();
  videoPreviewWrap?.classList.add("hidden");
  videoPlayerWrap?.classList.remove("hidden");
  mostLikedVideo?.play().catch(() => {});
}

function closeVideoModal() {
  videoModal?.classList.remove("show");
  videoModal?.setAttribute("aria-hidden", "true");
  resetVideoModal();
  unlockBodyScroll();
  if (wasMusicPlayingBeforeVideo) resumeMusicIfNeeded();
}

mostLikedVideoBtn?.addEventListener("click", openVideoModal);
videoPreviewWrap?.addEventListener("click", playMostLikedVideo);
videoPlayBtn?.addEventListener("click", playMostLikedVideo);
videoClose?.addEventListener("click", closeVideoModal);
videoModal?.addEventListener("click", (event) => {
  if (event.target === videoModal) closeVideoModal();
});

// Keyboard navigation and Escape-to-close support.
document.addEventListener("keydown", (event) => {
  if (memoriesSection && !memoriesSection.classList.contains("hidden") &&
      !sorryModal?.classList.contains("show") && !videoModal?.classList.contains("show")) {
    if (event.key === "ArrowLeft") {
      activeMemory = getIndex(activeMemory - 1, memoryImages.length);
      updateMemoryCarousel();
    } else if (event.key === "ArrowRight") {
      activeMemory = getIndex(activeMemory + 1, memoryImages.length);
      updateMemoryCarousel();
    }
  }

  if (sorryModal?.classList.contains("show")) {
    if (event.key === "ArrowLeft") {
      activeSorry = getIndex(activeSorry - 1, sorryImages.length);
      updateSorryGallery();
    } else if (event.key === "ArrowRight") {
      activeSorry = getIndex(activeSorry + 1, sorryImages.length);
      updateSorryGallery();
    }
  }

  if (event.key === "Escape") {
    if (messageModal?.classList.contains("show")) closeMessageModal();
    if (imageModal?.classList.contains("show")) closeImageModal();
    if (sorryModal?.classList.contains("show")) closeSorryModal();
    if (videoModal?.classList.contains("show")) closeVideoModal();
  }
});

// Initial state.
updateMemoryCarousel();
updateSorryGallery();
showMainPage();
