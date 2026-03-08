const FRIEND_NAME = "Ushi";
const emojis = ["💖", "💗", "💕", "🌸", "✨", "💞"];

// Text init
document.querySelectorAll(".friendName").forEach((el) => {
  el.textContent = FRIEND_NAME;
});

document.getElementById("year").textContent = new Date().getFullYear();

// Background music
const bgMusic = document.getElementById("bgMusic");
let musicStarted = false;
let wasMusicPlayingBeforeVideo = false;

bgMusic.volume = 0.5;

async function playBackgroundMusic() {
  if (musicStarted) return;

  try {
    await bgMusic.play();
    musicStarted = true;
  } catch (error) {
    console.log("Autoplay was blocked until user interaction.");
  }
}

function resumeMusicIfNeeded() {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
}

window.addEventListener("load", () => {
  playBackgroundMusic();
});

document.addEventListener(
  "click",
  () => {
    playBackgroundMusic();
  },
  { once: true }
);

document.addEventListener(
  "touchstart",
  () => {
    playBackgroundMusic();
  },
  { once: true, passive: true }
);

document.addEventListener(
  "keydown",
  () => {
    playBackgroundMusic();
  },
  { once: true }
);

// Sections
const intro = document.getElementById("intro-section");
const card1Section = document.getElementById("card1-section");
const card2Section = document.getElementById("card2-section");
const memoriesSection = document.getElementById("memories-section");
const doorTransition = document.getElementById("doorTransition");

// Buttons
const startBtn = document.getElementById("startBtn");
const nextCardBtn = document.getElementById("nextCardBtn");
const backFromCard1 = document.getElementById("backFromCard1");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const backToMainBtn = document.getElementById("backToMainBtn");

// Helpers
function lockBodyScroll() {
  document.body.classList.add("noScroll");
}

function unlockBodyScroll() {
  document.body.classList.remove("noScroll");
}

function hideAllSections() {
  intro.classList.add("hidden");
  card1Section.classList.add("hidden");
  card2Section.classList.add("hidden");
  memoriesSection.classList.add("hidden");
}

function goTopInstant() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function showMainPage() {
  hideAllSections();
  intro.classList.remove("hidden");
  intro.style.opacity = "1";
  intro.style.pointerEvents = "auto";
  document.body.style.background = "#000";
  goTopInstant();
}

function showCard1() {
  hideAllSections();
  card1Section.classList.remove("hidden");
  document.body.style.background = "transparent";
  goTopInstant();
}

function showCard2() {
  hideAllSections();
  card2Section.classList.remove("hidden");
  document.body.style.background = "transparent";
  goTopInstant();
}

function showMemories() {
  hideAllSections();
  memoriesSection.classList.remove("hidden");
  document.body.style.background = "transparent";
  goTopInstant();
}

// Door animation
function startExperience() {
  doorTransition.classList.remove("hidden");
  doorTransition.classList.remove("opening");
  void doorTransition.offsetWidth;

  intro.style.opacity = "0";
  intro.style.pointerEvents = "none";

  setTimeout(() => {
    doorTransition.classList.add("opening");
  }, 50);

  setTimeout(() => {
    showCard1();
  }, 380);

  setTimeout(() => {
    doorTransition.classList.add("hidden");
    doorTransition.classList.remove("opening");
  }, 1200);
}

// Events
startBtn.addEventListener("click", startExperience);
nextCardBtn.addEventListener("click", showCard2);
backFromCard1.addEventListener("click", showMainPage);
noBtn.addEventListener("click", showMainPage);
yesBtn.addEventListener("click", showMemories);
backToMainBtn.addEventListener("click", showMainPage);

// Floating hearts
function spawnHeart() {
  const container = document.getElementById("floatHearts");
  if (!container) return;

  const heart = document.createElement("div");
  heart.className = "fh";
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 4 + "s";
  heart.style.fontSize = Math.random() * 10 + 14 + "px";

  container.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6500);
}
setInterval(spawnHeart, 900);

// Message modal
const LETTER_TEXT = `Happy Birthday ${FRIEND_NAME}! 💖

It’s your special day! I wish you happiness, success, and beautiful moments today and always. Keep working hard and doing your best, because I truly want to see you become a great lawyer one day. I believe in you and your dreams.

Everything will be good with time. No matter what happens, remember that I will always be there for you and support you.

Enjoy your special day and keep shining.

Happy Birthday again! 💖`;

const modal = document.getElementById("messageModal");
const typedBox = document.getElementById("typedLetter");
const closeModal = document.getElementById("closeModal");
const messageBtn = document.getElementById("messageBtn");

let typingTimer = null;

function typeMsg() {
  if (typingTimer) clearInterval(typingTimer);

  typedBox.textContent = "";
  let i = 0;

  typingTimer = setInterval(() => {
    typedBox.textContent += LETTER_TEXT[i] ?? "";
    i++;

    if (i >= LETTER_TEXT.length) {
      clearInterval(typingTimer);
    }
  }, 22);
}

function openModal() {
  modal.classList.add("show");
  lockBodyScroll();
  typeMsg();
}

function closeMessageModal() {
  modal.classList.remove("show");
  unlockBodyScroll();
  if (typingTimer) clearInterval(typingTimer);
}

messageBtn.addEventListener("click", openModal);
closeModal.addEventListener("click", closeMessageModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeMessageModal();
  }
});

// Memories carousel
const memoryImages = [
  { src: "images/memory1.jpeg"},
  { src: "images/memory2.jpeg"},
  { src: "images/memory3.jpeg"},
  { src: "images/memory7.jpeg"},
  { src: "images/memory5.jpeg"},
  { src: "images/memory11.jpeg"},
  { src: "images/memory9.jpeg"},
  { src: "images/memory8.jpeg"},
  { src: "images/memory4.jpeg"},
  { src: "images/memory10.jpeg"},
  { src: "images/memory6.jpeg"},
  { src: "images/memory14.jpeg"},
  { src: "images/memory13.jpeg"},
  { src: "images/memory12.jpeg"},
  { src: "images/memory15.jpeg"},
  { src: "images/memory16.jpeg"},
  { src: "images/memory17.jpeg"},
  { src: "images/memory18.jpeg"}
];

const leftImg = document.getElementById("leftImg");
const centerImg = document.getElementById("centerImg");
const rightImg = document.getElementById("rightImg");
const memoryCaption = document.getElementById("memoryCaption");
const miniIndicators = document.getElementById("miniIndicators");
const memoryPrev = document.getElementById("memoryPrev");
const memoryNext = document.getElementById("memoryNext");
const centerCard = document.getElementById("centerCard");

let activeMemory = 0;

function getIndex(index, total) {
  return (index + total) % total;
}

function renderIndicators() {
  miniIndicators.innerHTML = "";

  memoryImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to memory ${index + 1}`);

    if (index === activeMemory) dot.classList.add("active");

    dot.addEventListener("click", () => {
      activeMemory = index;
      updateMemoryCarousel();
    });

    miniIndicators.appendChild(dot);
  });
}

function updateMemoryCarousel() {
  const total = memoryImages.length;
  const leftIndex = getIndex(activeMemory - 1, total);
  const centerIndex = getIndex(activeMemory, total);
  const rightIndex = getIndex(activeMemory + 1, total);

  leftImg.src = memoryImages[leftIndex].src;
  centerImg.src = memoryImages[centerIndex].src;
  rightImg.src = memoryImages[rightIndex].src;

  leftImg.alt = memoryImages[leftIndex].title;
  centerImg.alt = memoryImages[centerIndex].title;
  rightImg.alt = memoryImages[rightIndex].title;

  memoryCaption.textContent = memoryImages[centerIndex].title;
  renderIndicators();
}

memoryPrev.addEventListener("click", () => {
  activeMemory = getIndex(activeMemory - 1, memoryImages.length);
  updateMemoryCarousel();
});

memoryNext.addEventListener("click", () => {
  activeMemory = getIndex(activeMemory + 1, memoryImages.length);
  updateMemoryCarousel();
});

// Center image preview modal
const imageModal = document.getElementById("imageModal");
const modalMemoryImg = document.getElementById("modalMemoryImg");
const imageClose = document.getElementById("imageClose");

centerCard.addEventListener("click", () => {
  modalMemoryImg.src = memoryImages[activeMemory].src;
  modalMemoryImg.alt = memoryImages[activeMemory].title;
  imageModal.classList.add("show");
  lockBodyScroll();
});

function closeImageModal() {
  imageModal.classList.remove("show");
  unlockBodyScroll();
}

imageClose.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    closeImageModal();
  }
});

// Sorry gallery modal
const sorryBtn = document.getElementById("sorryBtn");
const sorryModal = document.getElementById("sorryModal");
const sorryModalImg = document.getElementById("sorryModalImg");
const sorryCaption = document.getElementById("sorryCaption");
const sorryDots = document.getElementById("sorryDots");
const sorryPrev = document.getElementById("sorryPrev");
const sorryNext = document.getElementById("sorryNext");
const sorryClose = document.getElementById("sorryClose");

const sorryImages = [
  { src: "images/sorry1.jpeg"},
  { src: "images/sorry2.jpeg"},
  { src: "images/sorry3.jpeg"},
  { src: "images/sorry4.jpeg"},
  { src: "images/sorry5.jpeg"},
  { src: "images/sorry6.jpeg"}
];

let activeSorry = 0;

function renderSorryDots() {
  sorryDots.innerHTML = "";

  sorryImages.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Go to sorry photo ${index + 1}`);

    if (index === activeSorry) dot.classList.add("active");

    dot.addEventListener("click", () => {
      activeSorry = index;
      updateSorryGallery();
    });

    sorryDots.appendChild(dot);
  });
}

function updateSorryGallery() {
  const item = sorryImages[activeSorry];
  sorryModalImg.src = item.src;
  sorryModalImg.alt = item.title;
  sorryCaption.textContent = item.title;
  renderSorryDots();
}

function openSorryModal() {
  activeSorry = activeMemory % sorryImages.length;
  updateSorryGallery();
  sorryModal.classList.add("show");
  lockBodyScroll();
}

function closeSorryModal() {
  sorryModal.classList.remove("show");
  unlockBodyScroll();
}

sorryBtn.addEventListener("click", openSorryModal);

sorryPrev.addEventListener("click", () => {
  activeSorry = getIndex(activeSorry - 1, sorryImages.length);
  updateSorryGallery();
});

sorryNext.addEventListener("click", () => {
  activeSorry = getIndex(activeSorry + 1, sorryImages.length);
  updateSorryGallery();
});

sorryClose.addEventListener("click", closeSorryModal);

sorryModal.addEventListener("click", (e) => {
  if (e.target === sorryModal) {
    closeSorryModal();
  }
});

// Video modal
const mostLikedVideoBtn = document.getElementById("mostLikedVideoBtn");
const videoModal = document.getElementById("videoModal");
const videoClose = document.getElementById("videoClose");
const videoPreviewWrap = document.getElementById("videoPreviewWrap");
const videoPlayerWrap = document.getElementById("videoPlayerWrap");
const videoPlayBtn = document.getElementById("videoPlayBtn");
const mostLikedVideo = document.getElementById("mostLikedVideo");

function resetVideoModal() {
  videoPreviewWrap.classList.remove("hidden");
  videoPlayerWrap.classList.add("hidden");
  mostLikedVideo.pause();
  mostLikedVideo.currentTime = 0;
}

function openVideoModal() {
  wasMusicPlayingBeforeVideo = !bgMusic.paused;

  if (wasMusicPlayingBeforeVideo) {
    bgMusic.pause();
  }

  resetVideoModal();
  videoModal.classList.add("show");
  lockBodyScroll();
}

function playMostLikedVideo() {
  videoPreviewWrap.classList.add("hidden");
  videoPlayerWrap.classList.remove("hidden");
  mostLikedVideo.play().catch(() => {});
}

function closeVideoModal() {
  videoModal.classList.remove("show");
  resetVideoModal();
  unlockBodyScroll();

  if (wasMusicPlayingBeforeVideo) {
    resumeMusicIfNeeded();
  }

  showMemories();
}

mostLikedVideoBtn.addEventListener("click", openVideoModal);
videoPreviewWrap.addEventListener("click", playMostLikedVideo);
videoPlayBtn.addEventListener("click", playMostLikedVideo);
videoClose.addEventListener("click", closeVideoModal);

videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    closeVideoModal();
  }
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (
    !memoriesSection.classList.contains("hidden") &&
    !sorryModal.classList.contains("show") &&
    !videoModal.classList.contains("show")
  ) {
    if (e.key === "ArrowLeft") {
      activeMemory = getIndex(activeMemory - 1, memoryImages.length);
      updateMemoryCarousel();
    }

    if (e.key === "ArrowRight") {
      activeMemory = getIndex(activeMemory + 1, memoryImages.length);
      updateMemoryCarousel();
    }
  }

  if (sorryModal.classList.contains("show")) {
    if (e.key === "ArrowLeft") {
      activeSorry = getIndex(activeSorry - 1, sorryImages.length);
      updateSorryGallery();
    }

    if (e.key === "ArrowRight") {
      activeSorry = getIndex(activeSorry + 1, sorryImages.length);
      updateSorryGallery();
    }
  }

  if (e.key === "Escape" && modal.classList.contains("show")) {
    closeMessageModal();
  }

  if (e.key === "Escape" && imageModal.classList.contains("show")) {
    closeImageModal();
  }

  if (e.key === "Escape" && sorryModal.classList.contains("show")) {
    closeSorryModal();
  }

  if (e.key === "Escape" && videoModal.classList.contains("show")) {
    closeVideoModal();
  }
});

// Init
updateMemoryCarousel();
updateSorryGallery();
showMainPage();