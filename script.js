const cells = document.querySelectorAll(".cell");
const turnText = document.getElementById("turn");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

let xScore = 0;
let oScore = 0;
let tieScore = 0;

// Winning patterns
const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// Add click listeners
cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

// Handle cell click
function handleClick(e) {
    let index = e.target.dataset.index;

    // Ignore if cell already filled or game over
    if (board[index] !== "" || !gameActive) return;

    // Update board + UI
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Check result BEFORE switching player
    checkWinner();

    // Switch player only if game continues
    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnText.textContent = `${currentPlayer}'s Turn`;
    }
}

// Check winner or draw
function checkWinner() {

    // Check all winning patterns
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

    // Check draw (no empty cells)
    if (!board.includes("")) {
        gameActive = false;

        tieScore++;
        document.getElementById("ties").textContent = tieScore;

        showPopup("It's a Draw!");
    }
}

// Update scoreboard
function updateScore(player) {
    if (player === "X") {
        xScore++;
        document.getElementById("xScore").textContent = xScore;
    } else {
        oScore++;
        document.getElementById("oScore").textContent = oScore;
    }
}

// Show popup
function showPopup(message) {
    popupText.textContent = message;
    popup.style.display = "flex";
}

// Close popup + reset game
function closePopup() {
    popup.style.display = "none";
    resetGame();
}

// Reset board only
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";

    cells.forEach(cell => {
        cell.textContent = "";
    });

    turnText.textContent = "X's Turn";
}
