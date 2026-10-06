/* Perheps I need 5 variebles, I most certainly need word to work with, some lives to hang the man if they are lost.
Function to start the game, function to check if the word is guessed or lives are lost with messageing.
i will need few cashed items so we can click about it or around it. Some function to reset the word ...*/

const words = [
  "Algeria — Algiers", "Angola — Luanda", "Benin — Porto-Novo", "Botswana — Gaborone", "Burkina Faso — Ouagadougou", "Burundi — Gitega", "Cabo Verde — Praia", "Cameroon — Yaoundé", "Central African Republic — Bangui", "Chad — N'Djamena", "Comoros — Moroni", "Democratic Republic of the Congo — Kinshasa", "Republic of the Congo — Brazzaville", "Côte d'Ivoire — Yamoussoukro", "Djibouti — Djibouti City", "Egypt — Cairo", "Equatorial Guinea — Ciudad de la Paz", "Eritrea — Asmara", "Eswatini — Mbabane (administrative) and Lobamba (legislative/royal)", "Ethiopia — Addis Ababa", "Gabon — Libreville", "Gambia — Banjul", "Ghana — Accra", "Guinea — Conakry", "Guinea-Bissau — Bissau", "Kenya — Nairobi", "Lesotho — Maseru", "Liberia — Monrovia", "Libya — Tripoli", "Madagascar — Antananarivo", "Malawi — Lilongwe", "Mali — Bamako", "Mauritania — Nouakchott", "Mauritius — Port Louis", "Morocco — Rabat", "Mozambique — Maputo", "Namibia — Windhoek", "Niger — Niamey", "Nigeria — Abuja", "Rwanda — Kigali", "São Tomé and Príncipe — São Tomé", "Senegal — Dakar", "Seychelles — Victoria", "Sierra Leone — Freetown", "Somalia — Mogadishu", "South Africa — Pretoria (administrative),  Cape Town (legislative) and Bloemfontein (judicial)", "South Sudan — Juba", "Sudan — Khartoum", "Tanzania — Dodoma", "Togo — Lomé", "Tunisia — Tunis", "Uganda — Kampala", "Zambia — Lusaka", "Zimbabwe — Harare"
];

let word = "";
let lives = 6;
let guessed = [];
let correct = [];
let over = false;

function newGame() {
  word = words[Math.floor(Math.random() * words.length)];
  lives = 6;
  guessed = [];
  correct = [];
  over = false;
  document.getElementById("message").textContent = "";
  buildKeyboard();
  draw();
}

function buildKeyboard() {
  const kb = document.getElementById("keyboard");
  kb.innerHTML = "";
  "QWERTYUIOPASDFGHJKLZXCVBNM".split("").forEach((letter) => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.onclick = () => guess(letter);
    kb.appendChild(btn);
  });
}

