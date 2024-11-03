// Landing Page Functions
function createConfetti() {
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDelay = Math.random() * 3 + "s";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(confetti);
  }
}

function showBirthdayMessage() {
  document.querySelector(".landing-page").style.transform = "translateX(-100%)";
  document.querySelector(".birthday-message").style.transform = "translateX(0)";
  createConfetti();
}

// Main Page Functions
const messages = {
  en: [
    "May life bring you all the happiness and strength you deserve.",
    "Whatever paths you choose, may they be filled with peace and purpose.",
    "Wishing you nothing but the best in everything you do.",
  ],
  id: [
    "Semoga hidup memberimu semua kebahagiaan dan kekuatan yang pantas kamu dapatkan.",
    "Apapun jalan yang kamu pilih, semoga dipenuhi kedamaian dan tujuan.",
    "Mendoakan yang terbaik dalam segala hal yang kamu lakukan.",
  ],
};

let currentLanguage = "id";
let messageIndex = 0;
let charIndex = 0;

function toggleLanguage() {
  // Reset indexes
  messageIndex = 0;
  charIndex = 0;

  // Toggle language
  currentLanguage = currentLanguage === "id" ? "en" : "id";

  // Update button text
  const toggleBtn = document.getElementById("toggleLang");
  toggleBtn.textContent =
    currentLanguage === "id" ? "🌐 indoensia" : "🌐 english";

  // Clear current message
  document.getElementById("message").innerHTML = "";

  // Start typing in new language
  typeMessage();
}

function typeMessage() {
  const currentMessages = messages[currentLanguage];

  if (messageIndex < currentMessages.length) {
    if (charIndex < currentMessages[messageIndex].length) {
      document.getElementById("message").innerHTML +=
        currentMessages[messageIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeMessage, 200);
    } else {
      messageIndex++;
      charIndex = 0;
      setTimeout(() => {
        document.getElementById("message").innerHTML += "<br><br>";
        if (messageIndex < currentMessages.length) {
          typeMessage();
        }
      }, 2000);
    }
  }
}

function selectDate(element) {
  const dateChoice = {
    choice: element.innerText,
    timestamp: new Date().toLocaleString("id-ID"),
  };

  let dateHistory = JSON.parse(localStorage.getItem("dateHistory")) || [];
  dateHistory.push(dateChoice);
  localStorage.setItem("dateHistory", JSON.stringify(dateHistory));

  displayDateHistory();

  document.querySelectorAll(".date-option").forEach((opt) => {
    opt.style.backgroundColor = "#ff8fa3";
  });
  element.style.backgroundColor = "#ff647a";
  alert("Pilihan kencan sudah disimpan! 😊");
}

function displayDateHistory() {
  const dateHistory = JSON.parse(localStorage.getItem("dateHistory")) || [];
  const dateHistoryDiv = document.getElementById("dateHistory");

  if (dateHistory.length === 0) {
    dateHistoryDiv.innerHTML =
      "<p class='no-history'>Belum ada pilihan kencan</p>";
    return;
  }

  dateHistoryDiv.innerHTML = dateHistory
    .map(
      (date) => `
            <div class="date-history">
                <div>${date.choice}</div>
                <div class="date-timestamp">Dipilih pada: ${date.timestamp}</div>
            </div>
        `
    )
    .join("");
}

function sendFeedback() {
  const feedback = document.querySelector("textarea").value;
  if (feedback.trim() !== "") {
    alert("Pesan kamu sudah terkirim! 💕");
    document.querySelector("textarea").value = "";
  } else {
    alert("Tolong tulis pesanmu dulu ya 😊");
  }
}

function resetDateHistory() {
  localStorage.removeItem("dateHistory");
  displayDateHistory();
  alert("History pilihan kencan sudah direset!");
}

function sendOtherChoices() {
  const otherChoices = document.getElementById("pesan-kencan-lain").value;
  if (otherChoices.trim() !== "") {
    // Ambil data pesan yang sudah ada
    let otherChoicesHistory =
      JSON.parse(localStorage.getItem("otherChoicesHistory")) || [];

    // Tambah pesan baru
    otherChoicesHistory.push({
      content: otherChoices,
      timestamp: new Date().toLocaleString("id-ID"),
    });

    // Simpan ke localStorage
    localStorage.setItem(
      "otherChoicesHistory",
      JSON.stringify(otherChoicesHistory)
    );

    alert("Pesan kamu sudah terkirim! 💕");
    document.getElementById("pesan-kencan-lain").value = "";

    displayOtherChoices();
  } else {
    alert("Tolong tulis pesanmu dulu ya 😊");
  }
}

function displayOtherChoices() {
  const otherChoicesHistory =
    JSON.parse(localStorage.getItem("otherChoicesHistory")) || [];
  const messageOtherChoices = document.getElementById("messageOtherChoices");

  if (otherChoicesHistory.length === 0) {
    messageOtherChoices.innerHTML =
      '<div class="no-other-choices">Belum ada ide dari Putri</div>';
    return;
  }

  messageOtherChoices.innerHTML = otherChoicesHistory
    .map(
      (choice) => `
        <div class="message-bubble-other-choices">
          <div class="message-content">
           <p>${choice.content}</p>
          </div>
        </div>
      `
    )
    .join("");
}

function resetMessageOtherChoices() {
  if (confirm("Apakah kamu yakin ingin menghapus semua pesan?")) {
    // Remove the other choices from localStorage
    localStorage.removeItem("otherChoicesHistory");

    const messageOtherChoices = document.getElementById("messageOtherChoices");
    messageOtherChoices.innerHTML = "";
    displayOtherChoices();
    alert("Semua pesan telah dihapus!");
  }
}

function openFullImage(src) {
  const modal = document.getElementById("fullImageModal");
  const fullImage = document.getElementById("fullImage");
  fullImage.src = src;
  modal.style.display = "block"; // Tampilkan modal
}

function closeFullImage() {
  const modal = document.getElementById("fullImageModal");
  modal.style.display = "none"; // Sembunyikan modal
}

// Audio Control Functions
let isMusicPlaying = false;
const bgMusic = document.getElementById("bgMusic");
const musicControl = document.getElementById("musicControl");

function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicControl.querySelector(".music-icon").textContent = "🔈";
  } else {
    bgMusic.play();
    musicControl.querySelector(".music-icon").textContent = "🔊";
  }
  isMusicPlaying = !isMusicPlaying;
}

// Modify existing showBirthdayMessage function
function showBirthdayMessage() {
  document.querySelector(".landing-page").style.transform = "translateX(-100%)";
  document.querySelector(".birthday-message").style.transform = "translateX(0)";
  createConfetti();

  // Start playing music when birthday message shows
  if (!isMusicPlaying) {
    toggleMusic();
  }
}

// Add event listener for music control
if (musicControl) {
  musicControl.addEventListener("click", toggleMusic);
}

// Handle autoplay restrictions
document.addEventListener(
  "click",
  function () {
    if (bgMusic && !isMusicPlaying) {
      bgMusic.play().catch(function (error) {
        console.log("Audio autoplay failed:", error);
      });
      isMusicPlaying = true;
      musicControl.querySelector(".music-icon").textContent = "🔊";
    }
  },
  { once: true }
);

/// Modify window.onload to include new initialization
window.onload = function () {
  createConfetti();

  // Only run these functions on main page
  if (document.getElementById("message")) {
    // Set initial language
    currentLanguage = "en";
    messageIndex = 0;
    charIndex = 0;

    typeMessage();
    displayDateHistory();
    displayMessageHistory();
  }
};
