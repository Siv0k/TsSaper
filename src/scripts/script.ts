import '../index.html';
import '../styles/style.css';
import { FillGameBoard } from '../types/types';

function getBoardSize() {
    const heightInputElement = document.getElementById("GameBoardHeight") as HTMLInputElement;
    const widthInputElement = document.getElementById("GameBoardWidth") as HTMLInputElement;
    const boardSizeHeight = Math.round(Number(heightInputElement.value));
    const boardSizeWidth = Math.round(Number(widthInputElement.value));
    const error = boardSizeHeight <= 0 || boardSizeWidth <= 0;

    if (error) {
        alert("Некорректные значения для ширины и/или длины поля");
    return;
    }
    
    const gameBoardElement = document.getElementById("GameBoard") as HTMLDivElement;
    const totalMines = getCountMina(boardSizeHeight, boardSizeWidth);
  
    const buttons: Element[] = Array.from(document.querySelectorAll("div > button"));
    buttons.forEach(element => element.remove());
  
    const gameBoard = createGameBoard(boardSizeHeight, boardSizeWidth, totalMines);
    displayGameBoard(gameBoard, gameBoardElement, boardSizeWidth);
    addClickHandlers(gameBoard, boardSizeWidth, boardSizeHeight);
  }

function createGameBoard(boardSizeHeight: number, boardSizeWidth: number, totalMines: number): FillGameBoard[] {
  const gameBoard: FillGameBoard[] = [];
  const minaPositionArray = getRandomMinaPositions(boardSizeHeight * boardSizeWidth, totalMines);

  for (let i = 0; i < boardSizeHeight * boardSizeWidth; i++) {
    const button = document.createElement("button");
    const row = Math.floor(i / boardSizeWidth);
    const col = i % boardSizeWidth;
    const neighbors = [
      { row: row - 1, col: col - 1 },
      { row: row - 1, col },
      { row: row - 1, col: col + 1 },
      { row, col: col - 1 },
      { row, col: col + 1 },
      { row: row + 1, col: col - 1 },
      { row: row + 1, col },
      { row: row + 1, col: col + 1 }
    ];

    const mineCount = countNeighborMines(neighbors, boardSizeHeight, boardSizeWidth, minaPositionArray);

    const cell: FillGameBoard = { button, mina: minaPositionArray.includes(i), mineCount };
    cell.button.classList.add(cell.mina ? 'mina' : 'no-mina')
    gameBoard.push(cell);
  }

  return gameBoard;
}

function displayGameBoard(gameBoard: FillGameBoard[], gameBoardElement: HTMLDivElement, boardSizeWidth: number) {
  gameBoardElement.style.width = `${boardSizeWidth * 50}px`;

  gameBoard.forEach(cell => gameBoardElement.appendChild(cell.button));
}

function addClickHandlers(gameBoard: FillGameBoard[], boardSizeWidth: number, boardSizeHeight: number) {
    const gameBoardElement = document.getElementById("GameBoard") as HTMLDivElement;
    
  for (let i = 0; i < gameBoard.length; i++) {
    const cell = gameBoard[i];
    cell.button.addEventListener("click", () => {
      if (cell.mina) {
        cell.button.innerText = '💣';
        gameOver();
      } else {
        if (cell.mineCount > 0) {
          cell.button.innerText = cell.mineCount.toString();
          cell.button.classList.add('clicked');
        } else {
          cell.button.classList.add('clicked');
          openEmptyNeighbors(i, gameBoard, boardSizeWidth, boardSizeHeight); 
        }
      }
        const win = gameBoardElement.querySelectorAll('button.clicked').length;
        if (win === gameBoard.length - getCountMina(boardSizeHeight, boardSizeWidth)) {
            gameWin();
        }
    });

    cell.button.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      cell.button.innerText = '🚩';
    });
  }
}

function openEmptyNeighbors(index: number, gameBoard: FillGameBoard[], boardSizeWidth: number, boardSizeHeight: number) {
  const stack: number[] = []; 
  const visited = new Set<number>();
  stack.push(index); 

  while (stack.length > 0) {
    const currentIndex = stack.pop(); 
    const row = Math.floor(currentIndex / boardSizeWidth);
    const col = currentIndex % boardSizeWidth;
    const neighbors = [
      { row: row - 1, col: col - 1 },
      { row: row - 1, col },
      { row: row - 1, col: col + 1 },
      { row, col: col - 1 },
      { row, col: col + 1 },
      { row: row + 1, col: col - 1 },
      { row: row + 1, col },
      { row: row + 1, col: col + 1 }
    ];

    for (const neighbor of neighbors) {
      const { row, col } = neighbor;
      if (isValidCell(row, col, boardSizeWidth, boardSizeHeight)) {
        const neighborIndex = row * boardSizeWidth + col;
        if (visited.has(neighborIndex)) {
          continue;
        }
        visited.add(neighborIndex);
        const neighborCell = gameBoard[neighborIndex];
        if (!neighborCell.mina && !neighborCell.button.innerText) {
          neighborCell.button.innerText = neighborCell.mineCount > 0 ? neighborCell.mineCount.toString() : '';
          neighborCell.button.classList.add('clicked');
          if (neighborCell.mineCount === 0) {
            stack.push(neighborIndex); 
          }
        }
      }
    }
  }
}

function countNeighborMines(neighbors: { row: number, col: number }[], boardSizeHeight: number, boardSizeWidth: number, minaPositions: number[]): number {
  let mineCount = 0;
  for (const neighbor of neighbors) {
    const { row, col } = neighbor;
    if (isValidCell(row, col, boardSizeWidth, boardSizeHeight) && minaPositions.includes(row * boardSizeWidth + col)) {
      mineCount++;
    }
  }
  return mineCount;
}

function isValidCell(row: number, col: number, boardSizeWidth: number, boardSizeHeight: number): boolean {
  return row >= 0 && row < boardSizeHeight && col >= 0 && col < boardSizeWidth;
}

function getCountMina(boardSizeHeight: number, boardSizeWidth: number): number {
  const length = boardSizeHeight * boardSizeWidth;
  const count = Math.floor(length * 0.15);
  return count;
}

function getRandomMinaPositions(boardSize: number, totalMines: number): number[] {
  const minaPositions: number[] = [];
  while (minaPositions.length < totalMines) {
    const randomPosition = Math.floor(Math.random() * boardSize);
    if (!minaPositions.includes(randomPosition)) {
      minaPositions.push(randomPosition);
    }
  }
  return minaPositions;
}

function gameOver() {
  alert("ТЫ ПРОИГРАЛ!");
  location.reload();
}

function gameWin() {
    alert("Вы выиграли!");
    location.reload();
}

const submit = document.getElementById('Submit');
if (submit) {
  submit.addEventListener('click', getBoardSize);
}