/* Perheps I need 5 variebles, I most certainly need word to work with, some lives to hang the man if they are lost.
Function to start the game, function to check if the word is guessed or lives are lost with messageing.
i will need few cashed items so we can click about it or around it. Some function to reset the word ...*/

const words = [
  "Algeria — Algiers",
  "Angola — Luanda",
  "Benin — Porto-Novo",
  "Botswana — Gaborone",
  "Burkina Faso — Ouagadougou",
  "Burundi — Gitega",
  "Cabo Verde — Praia",
  "Cameroon — Yaoundé",
  "Central African Republic — Bangui",
  "Chad — N'Djamena",
  "Comoros — Moroni",
  "Democratic Republic of the Congo — Kinshasa",
  "Republic of the Congo — Brazzaville",
  "Côte d'Ivoire — Yamoussoukro",
  "Djibouti — Djibouti City",
  "Egypt — Cairo",
  "Equatorial Guinea — Ciudad de la Paz",
  "Eritrea — Asmara",
  "Eswatini — Mbabane (administrative) and Lobamba (legislative/royal)",
  "Ethiopia — Addis Ababa",
  "Gabon — Libreville",
  "Gambia — Banjul",
  "Ghana — Accra",
  "Guinea — Conakry",
  "Guinea-Bissau — Bissau",
  "Kenya — Nairobi",
  "Lesotho — Maseru",
  "Liberia — Monrovia",
  "Libya — Tripoli",
  "Madagascar — Antananarivo",
  "Malawi — Lilongwe",
  "Mali — Bamako",
  "Mauritania — Nouakchott",
  "Mauritius — Port Louis",
  "Morocco — Rabat",
  "Mozambique — Maputo",
  "Namibia — Windhoek",
  "Niger — Niamey",
  "Nigeria — Abuja",
  "Rwanda — Kigali",
  "São Tomé and Príncipe — São Tomé",
  "Senegal — Dakar",
  "Seychelles — Victoria",
  "Sierra Leone — Freetown",
  "Somalia — Mogadishu",
  "South Africa — Pretoria (administrative), Cape Town (legislative) and Bloemfontein (judicial)",
  "South Sudan — Juba",
  "Sudan — Khartoum",
  "Tanzania — Dodoma",
  "Togo — Lomé",
  "Tunisia — Tunis",
  "Uganda — Kampala",
  "Zambia — Lusaka",
  "Zimbabwe — Harare",
];

const player = {
  name: sessionStorage.getItem("playerName") || "Guest",
  wins: 0,
  losses: 0,
};

let word = "";
let lives = 6;
let guessed = [];
let correct = [];
let over = false;

function updateScoreboard() {
  const winEl = document.getElementById("winCount");
  const lossEl = document.getElementById("lossCount");
  const nameEl = document.getElementById("playerDisplay");

  if (winEl) winEl.textContent = player.wins;
  if (lossEl) lossEl.textContent = player.losses;
  if (nameEl) nameEl.textContent = `👤 ${player.name}`;
}

function setPlayerName() {
  const input = document.getElementById("playerName");
  if (!input) return;
  const newName = input.value.trim() || "Guest";
  player.name = newName;
  sessionStorage.setItem("playerName", newName);
  updateScoreboard();
}

function recordWin() {
  player.wins += 1;
  updateScoreboard();
}

function recordLoss() {
  player.losses += 1;
  updateScoreboard();
}

function newGame() {
  word = words[Math.floor(Math.random() * words.length)];
  lives = 6;
  guessed = [];
  correct = [];
  over = false;

  const msg = document.getElementById("message");
  if (msg) msg.textContent = "";

  buildKeyboard();
  draw();
}

function buildKeyboard() {
  const kb = document.getElementById("keyboard");
  if (!kb) return;
  kb.innerHTML = "";
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((letter) => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.onclick = () => guess(letter);
    kb.appendChild(btn);
  });
}

function draw() {
  const stages = ["", "😐", "😐\n👕", "😐\n👕\n👖", "😐\n👕\n👖\n👞", "😵"];
  const wrong = 6 - lives;

  const drawingEl = document.getElementById("drawing");
  if (drawingEl) {
    drawingEl.textContent =
      stages[Math.min(wrong, stages.length - 1)] || "";
  }

  const wordBox = document.getElementById("word");
  if (wordBox) {
    wordBox.innerHTML = "";
    word.split("").forEach((letter) => {
      const span = document.createElement("span");
      const isLetter = /[a-zA-Z]/.test(letter);
      const isGuessed = guessed.includes(letter.toUpperCase());

      if (!isLetter) {
        span.textContent = letter;
        span.className = "symbol";
      } else {
        span.textContent = isGuessed ? letter : "_";
      }
      wordBox.appendChild(span);
    });
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const guessedEl = document.getElementById("guessed");
  const remainingEl = document.getElementById("remaining");

  if (guessedEl) {
    guessedEl.textContent = guessed.slice().sort().join(" ") || "—";
  }
  if (remainingEl) {
    remainingEl.textContent =
      alphabet.filter((char) => !guessed.includes(char)).join(" ") || "—";
  }

  document.querySelectorAll("#keyboard button").forEach((btn) => {
    btn.disabled = guessed.includes(btn.textContent) || over;
  });
}

function guess(letter) {
  if (over || guessed.includes(letter)) return;
  guessed.push(letter);

  const upperWord = word.toUpperCase();

  if (upperWord.includes(letter)) {
    const isWon = word.split("").every((char) => {
      const isLetter = /[a-zA-Z]/.test(char);
      return !isLetter || guessed.includes(char.toUpperCase());
    });

    if (isWon) {
      over = true;
      const msg = document.getElementById("message");
      if (msg) msg.textContent = "You win!";
      recordWin();
    }
  } else {
    lives--;
    if (lives <= 0) {
      over = true;
      const msg = document.getElementById("message");
      if (msg) msg.textContent = `Game over! The word was: ${word}`;
      recordLoss();
    }
  }

  draw();
}

const resetBtn = document.getElementById("reset");
if (resetBtn) resetBtn.onclick = newGame;

const setPlayerBtn = document.getElementById("setPlayer");
if (setPlayerBtn) setPlayerBtn.onclick = setPlayerName;

const playerNameInput = document.getElementById("playerName");
if (playerNameInput) {

  playerNameInput.value = player.name;

  playerNameInput.addEventListener("focus", () => {
    if (playerNameInput.value.trim() === "Guest") {
      playerNameInput.value = "";
    }
  });

  playerNameInput.addEventListener("blur", () => {
    if (playerNameInput.value.trim() === "") {
      playerNameInput.value = "Guest";
    }
  });

  playerNameInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      setPlayerName();
      playerNameInput.blur();
    }
  });
}

if (document.getElementById("winCount")) {
  updateScoreboard();
}
if (document.getElementById("word")) {
  newGame();
}