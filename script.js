// VARIABLES

const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const figureParts = document.querySelectorAll(".figure-part");

// RANDOM GENERATED WORD

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];
var i = 0; // NUMBER OF WRONG LETTERS

// FUNCTIONS

function displayWord() {
  wordEl.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
    )
    .join("")}
  `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";
  }
}

function updateWrongLettersEl() {
  if (i < 5) {
    wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
    figureParts[i].style.display = "block";
    i += 1;
  } else {
    i += 1;
    figureParts[figureParts.length - 1].style.display = "block";
    finalMessage.innerText = "Unfortunately you lost. 😕";
    popup.style.display = "flex";
    window.removeEventListener("keydown", keyCode, false);
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function keyCode(e) {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
}

// LISTENER

window.addEventListener("keydown", keyCode);

// PLAY GAIN

playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  popup.style.display = "none";
  figureParts.forEach((part) => (part.style.display = "none"));
  i = 0;
  window.addEventListener("keydown", keyCode);
  updateWrongLettersEl();
  displayWord();
});

displayWord();
