import "../index.html";
import "../styles/style.css";
import { FillGameBoard } from "../types/types";
import { gameOver, gameWin } from "../utilits/resultFunctions";
import { isValidCell } from "../utilits/validFunction";
import {
  countNeighborMines,
  getCountMina,
  getRandomMinaPositions,
} from "../utilits/counters";
import { neighbor } from "../utilits/counters";

function fieldInit() {
  const heightInputElement = document.getElementById(
    "GameBoardHeight"
  ) as HTMLInputElement;
  const widthInputElement = document.getElementById(
    "GameBoardWidth"
  ) as HTMLInputElement;
  const boardSizeHeight = Math.round(Number(heightInputElement.value));
  const boardSizeWidth = Math.round(Number(widthInputElement.value));
  const formElement = document.querySelector("form") as HTMLFormElement;
  const isCorrectBoardSize = boardSizeHeight <= 3 || boardSizeWidth <= 3;

  formElement.style.display = isCorrectBoardSize ? "block" : "none";

  if (isCorrectBoardSize) {
    alert("Некорректные значения для ширины и/или длины поля");
    return;
  }

  const gameBoardElement = document.getElementById(
    "GameBoard"
  ) as HTMLDivElement;
  const totalMines = getCountMina(boardSizeHeight, boardSizeWidth);

  gameBoardElement.innerHTML = "";

  const gameBoard = createGameBoard(
    boardSizeHeight,
    boardSizeWidth,
    totalMines
  );
  displayGameBoard(gameBoard, gameBoardElement, boardSizeWidth);
  addClickHandlers(gameBoard, boardSizeWidth, boardSizeHeight, totalMines);
  return boardSizeHeight;
}

function createGameBoard(
  boardSizeHeight: number,
  boardSizeWidth: number,
  totalMines: number
): FillGameBoard[] {
  const gameBoard: FillGameBoard[] = [];
  const minaPositionArray = getRandomMinaPositions(
    boardSizeHeight * boardSizeWidth,
    totalMines
  );

  for (let i = 0; i < boardSizeHeight * boardSizeWidth; i++) {
    const button = document.createElement("button");
    const row = Math.floor(i / boardSizeWidth);
    const col = i % boardSizeWidth;
    const neighbors = neighbor(row, col, boardSizeWidth, boardSizeHeight);

    const mineCount = countNeighborMines(
      neighbors,
      boardSizeWidth,
      minaPositionArray
    );

    const cell: FillGameBoard = {
      button,
      mina: minaPositionArray.includes(i),
      mineCount,
    };
    // cell.button.classList.add(cell.mina ? "mina" : "no-mina");
    gameBoard.push(cell);
  }

  return gameBoard;
}

function displayGameBoard(
  gameBoard: FillGameBoard[],
  gameBoardElement: HTMLDivElement,
  boardSizeWidth: number
) {
  const cellSize = 50;
  gameBoardElement.style.width = `${boardSizeWidth * cellSize}px`;
  gameBoard.forEach((cell) => gameBoardElement.appendChild(cell.button));
}

function addClickHandlers(
  gameBoard: FillGameBoard[],
  boardSizeWidth: number,
  boardSizeHeight: number,
  totalMines: number
) {
  for (let i = 0; i < gameBoard.length; i++) {
    const cell = gameBoard[i];
    cell.button.addEventListener("click", () => {
      if (cell.mineCount > 0) {
        cell.button.innerText = cell.mineCount.toString();
        cell.button.classList.add("clicked");
      } else {
        cell.button.classList.add("clicked");
        openEmptyNeighbors(i, gameBoard, boardSizeWidth, boardSizeHeight);
      }
      if (cell.mina) {
        gameOver(gameBoard, cell.button);
      }
      gameWin(gameBoard, totalMines);
    });

    cell.button.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (cell.button.classList.contains("clicked")) {
        return;
      } else if (cell.button.innerText === "🚩") {
        cell.button.innerText = "";
      } else {
        cell.button.innerText = "🚩";
      }
      gameWin(gameBoard, totalMines);
    });

    cell.button.addEventListener("mousedown", (event) => {
      event.preventDefault();
      if (event.button === 1) {
        const row = Math.floor(i / boardSizeWidth);
        const col = i % boardSizeWidth;
        const neighbors = neighbor(row, col, boardSizeWidth, boardSizeHeight);
        for (const neighbor of neighbors) {
          const { row, col } = neighbor;
          const neighborIndex = row * boardSizeWidth + col;
          const neighborCell = gameBoard[neighborIndex];
          if (!neighborCell.button.classList.contains("clicked")) {
            neighborCell.button.classList.add("highlighted");
          }
        }
      }
    });

    cell.button.addEventListener("mouseup", (event) => {
      event.preventDefault();
      if (event.button === 1) {
        const highlightedCells = document.querySelectorAll(".highlighted");
        highlightedCells.forEach((highlightedCell) => {
          highlightedCell.classList.remove("highlighted");
        });
      }
    });
  }
}

function openEmptyNeighbors(
  index: number,
  gameBoard: FillGameBoard[],
  boardSizeWidth: number,
  boardSizeHeight: number
) {
  const stack: number[] = [index];
  const visited = new Set<number>();

  while (stack.length > 0) {
    const currentIndex = stack.pop();
    const row = Math.floor(currentIndex / boardSizeWidth);
    const col = currentIndex % boardSizeWidth;
    const neighbors = neighbor(row, col, boardSizeWidth, boardSizeHeight);

    for (const { row: neighborRow, col: neighborCol } of neighbors) {
      const neighbordIndex = neighborRow * boardSizeWidth + neighborCol;
      if (visited.has(neighbordIndex)) continue;
      visited.add(neighbordIndex);
      const neighborCell = gameBoard[neighbordIndex];
      if (!neighborCell.mina && !neighborCell.button.innerText) {
        neighborCell.button.innerText =
          neighborCell.mineCount > 0 ? neighborCell.mineCount.toString() : "";
        neighborCell.button.classList.add("clicked");
        if (neighborCell.mineCount === 0) {
          stack.push(neighbordIndex);
        }
      }
    }
  }
}

const submit = document.getElementById("Submit");
if (submit) {
  submit.addEventListener("click", fieldInit);
}
