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
const messages = [
  "May life bring you all the happiness and strength you deserve.",
  "Whatever paths you choose, may they be filled with peace and purpose.",
  "Wishing you nothing but the best in everything you do.",
];

let messageIndex = 0;
let charIndex = 0;

function typeMessage() {
  if (messageIndex < messages.length) {
    if (charIndex < messages[messageIndex].length) {
      document.getElementById("message").innerHTML +=
        messages[messageIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeMessage, 100);
    } else {
      messageIndex++;
      charIndex = 0;
      setTimeout(() => {
        document.getElementById("message").innerHTML += "<br><br>";
        typeMessage();
      }, 1000);
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
    dateHistoryDiv.innerHTML = "<p>Belum ada pilihan kencan</p>";
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

// Tambahkan fungsi-fungsi ini

function sendFeedback() {
  const feedback = document.querySelector("textarea").value;
  if (feedback.trim() !== "") {
    // Ambil data pesan yang sudah ada
    let messageHistory =
      JSON.parse(localStorage.getItem("messageHistory")) || [];

    // Tambah pesan baru
    const newMessage = {
      content: feedback,
      timestamp: new Date().toLocaleString("id-ID"),
    };

    messageHistory.push(newMessage);

    // Simpan ke localStorage
    localStorage.setItem("messageHistory", JSON.stringify(messageHistory));

    // Update tampilan
    displayMessageHistory();

    // Reset textarea dan tampilkan alert
    document.querySelector("textarea").value = "";
    alert("Pesan kamu sudah terkirim! 💕");
  } else {
    alert("Tolong tulis pesanmu dulu ya 😊");
  }
}

function displayMessageHistory() {
  const messageHistory =
    JSON.parse(localStorage.getItem("messageHistory")) || [];
  const messageHistoryDiv = document.getElementById("messageHistory");

  if (messageHistory.length === 0) {
    messageHistoryDiv.innerHTML =
      '<div class="no-messages">Belum ada pesan dari Putri</div>';
    return;
  }

  messageHistoryDiv.innerHTML = messageHistory
    .map(
      (message) => `
            <div class="message-bubble">
                <div class="message-content">${message.content}</div>
                <div class="message-timestamp">Dikirim pada: ${message.timestamp}</div>
            </div>
        `
    )
    .join("");
}

function resetMessageHistory() {
  if (confirm("Apakah kamu yakin ingin menghapus semua pesan?")) {
    localStorage.removeItem("messageHistory");
    displayMessageHistory();
    alert("Semua pesan telah dihapus!");
  }
}

// Initialize functions when page loads
window.onload = function () {
  createConfetti();

  // Only run these functions on main page
  if (document.getElementById("message")) {
    typeMessage();
    displayDateHistory();
    displayMessageHistory();
  }
};
