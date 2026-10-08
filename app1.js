const player = {
name: sessionStorage.getItem("playerName") || "Guest",
wins: 0,
losses: 0,
};

function savePlayerName() {
const input = document.getElementById("introPlayerName");
const newName = input.value.trim() || "Guest";
player.name = newName;
sessionStorage.setItem("playerName", newName);
updateDisplay();
}

function updateDisplay() {
document.getElementById("introPlayerDisplay").textContent = `👤 ${player.name}`;
}

document.getElementById("setIntroPlayer").onclick = savePlayerName;
document.getElementById("introPlayerName").addEventListener("keydown", (e) => {
if (e.key === "Enter") savePlayerName();
});

const existingName = sessionStorage.getItem("playerName");
if (existingName) {
document.getElementById("introPlayerName").value = existingName;
}
updateDisplay();