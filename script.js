const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let xScore = 0;
let oScore = 0;
let tieScore = 0;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick(e) {
    let index = e.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    turnText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;

       if (
    board[a] &&
    board[a] === board[b] &&
    board[a] === board[c]
) {
    gameActive = false;
    updateScore(currentPlayer);

    showPopup(`Player ${currentPlayer} Wins!`);
    return;
}
    }

   if (!board.includes("")) {
    gameActive = false;
    tieScore++;
    document.getElementById("ties").textContent = tieScore;

    showPopup("It's a Draw!");
}
}
function showPopup(message) {
    popupText.textContent = message;
    popup.style.display = "flex";
}

function closePopup() {
    popup.style.display = "none";
    resetGame();
}
function updateScore(player) {
    if (player === "X") {
        xScore++;
        document.getElementById("xScore").textContent = xScore;
    } else {
        oScore++;
        document.getElementById("oScore").textContent = oScore;
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";

    cells.forEach(cell => cell.textContent = "");

    turnText.textContent = "X's Turn";
}