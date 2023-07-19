import { FillGameBoard } from "../types/types";

function openAllCells(gameBoard: FillGameBoard[]) {
  gameBoard.forEach((cell) => {
    if (cell.mina) {
      cell.button.innerText = "💣";
      cell.button.classList.add("clicked");
    } else {
      cell.button.innerText =
        cell.mineCount > 0 ? cell.mineCount.toString() : "";
      cell.button.classList.add("clicked");
    }
  });
}

export function gameOver(
  gameBoard: FillGameBoard[],
  clickedMina: HTMLButtonElement
) {
  openAllCells(gameBoard);
  clickedMina.innerText = "💥";
  const messageContainer = document.getElementById("messageContainer");
  const restartGameContainer = document.querySelector(
    ".restartGameContainer"
  ) as HTMLDivElement;
  restartGameContainer.style.display = "block";
  messageContainer.innerText = "Вы проиграли!";
  restartGame();
}

export function gameWin(gameBoard: FillGameBoard[], totalMines: number) {
  const gameBoardElement = document.getElementById(
    "GameBoard"
  ) as HTMLDivElement;
  const win = gameBoardElement.querySelectorAll("button.clicked").length;
  const flaggedMines = gameBoard.filter(
    (cell) => cell.button.innerText === "🚩" && cell.mina
  );
  if (
    win === gameBoard.length - totalMines ||
    flaggedMines.length === totalMines
  ) {
    const incorrectlyFlaggedCells = gameBoard.filter(
      (cell) => cell.button.innerText === "🚩" && !cell.mina
    );
    if (incorrectlyFlaggedCells.length === 0) {
      openAllCells(gameBoard);
      gameBoard.forEach((cell) => {
        if (cell.mina) {
          cell.button.innerText = "🚩";
        }
      });
      const messageContainer = document.getElementById("messageContainer");
      messageContainer.innerText = "Вы выиграли!";
      const restartGameContainer = document.querySelector(
        ".restartGameContainer"
      ) as HTMLDivElement;
      restartGameContainer.style.display = "block";
      restartGame();
    }
  }
}

function restartGame() {
  const restartButton = document.getElementById("restartButton");
  const formElement = document.querySelector("form") as HTMLFormElement;
  const restartGameContainer = document.querySelector(
    ".restartGameContainer"
  ) as HTMLDivElement;
  restartButton.addEventListener("click", () => {
    const gameBoardElement = document.getElementById(
      "GameBoard"
    ) as HTMLDivElement;
    gameBoardElement.innerHTML = "";
    restartGameContainer.style.display = "none";
    formElement.style.display = "block";
  });
}
