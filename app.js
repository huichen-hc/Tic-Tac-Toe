const cells = document.querySelectorAll(".cell");
const statusDisplay = document.querySelector("#info");
const restartBtn = document.querySelector("#restart-btn");
const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let playerChoices =["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X";
let gameRunning = false;

initializeGame();

function initializeGame(){
cells.forEach(cell => cell.addEventListener("click",updateCellDisplay));
restartBtn.addEventListener("click",restartGame);
statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
gameRunning = true;
};


function updateCellDisplay(){
    const cellIndex = this.getAttribute("cell-index");
    if(playerChoices[cellIndex] != "" || !gameRunning){
        return;
    }
    playerChoices[cellIndex] = currentPlayer;
    this.textContent = currentPlayer;
    checkWinner();
}

function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner(){
    let winAndRoundEnd = false;
    for (let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = playerChoices[condition[0]];
        const cellB = playerChoices[condition[1]];
        const cellC = playerChoices[condition[2]];

        if (cellA == "" || cellB == ""| cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            winAndRoundEnd = true;
            break;
        }
    }

    if (winAndRoundEnd){
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameRunning = false;
    }
    else if(!playerChoices.includes("")){
        statusDisplay.textContent = "It is a tie!"
        gameRunning = false;
    }
    else{
        changePlayer();
    }

}

function restartGame(){
    currentPlayer = "X";
    playerChoices = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    gameRunning = true;
}
