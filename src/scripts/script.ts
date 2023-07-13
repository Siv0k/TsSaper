import '../index.html';
import '../styles/style.css';
import { FillGameBoard } from '../types/types';

function getBoardSize() {
    const gameBoard: FillGameBoard[] = [];
    const heightInputElement = document.getElementById("GameBoardHight") as HTMLInputElement;
    const widthInputElement = document.getElementById("GameBoardWidht") as HTMLInputElement;
    const boardSizeHight: number = +heightInputElement.value;
    const boardSizeWidth: number = +widthInputElement.value;
    const gameBoardElement = document.getElementById("GameBoard") as HTMLDivElement;

    const buttons: Element[] = Array.from(document.querySelectorAll("div > button"));
    buttons.forEach(element => element.remove());

    gameBoard.length = boardSizeHight * boardSizeWidth;
    gameBoardElement.style.width = `${boardSizeWidth * 50}px`;

    const totalMines:number = getCountMina(gameBoard.length) ?? 0;
    const minaPositionArray: number[] = minaPosition(totalMines, gameBoard.length);   

    for (let i = 0; i < gameBoard.length; i++) {
        const button = document.createElement("button");
        gameBoard [i] = { button: button, mina: minaPositionArray.includes(i), mineCount: 0 };
        gameBoardElement.appendChild(gameBoard[i].button);
        gameBoard[i].button.classList.add(gameBoard[i].mina ? "mina" : "no-mina");
        let mineCount = 0;
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

        for (const neighbor of neighbors) {
            const { row, col } = neighbor;
                if (
                row >= 0 &&
                row < boardSizeHight &&
                col >= 0 &&
                col < boardSizeWidth &&
                minaPositionArray.includes(row * boardSizeWidth + col)
                ) {
            mineCount++;
                }
            }

        gameBoard[i].mineCount = mineCount;
        gameBoard[i].button.addEventListener("click", () => {
            if (gameBoard[i].mina) {
                alert("ТЫ ПРОИГРАЛ!");
                location.reload();
            } else {
                if (mineCount > 0) {
                    gameBoard[i].button.innerText = mineCount.toString();
                } else {
                    gameBoard[i].button.style.backgroundColor = "green";     
                    const processed = new Set<number>();
                    openEmptyNeighbors(i, gameBoard, boardSizeWidth, boardSizeHight, processed);
                }
            }
        });

        gameBoard[i].button.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            gameBoard[i].button.innerText = '🚩';
        });

    }
}

function openEmptyNeighbors(index: number, gameBoard: FillGameBoard[], boardSizeWidth: number, boardSizeHeight: number, processed: Set<number>) {
    const row = Math.floor(index / boardSizeWidth);
    const col = index % boardSizeWidth;
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
        if (neighbor.row >= 0 && neighbor.row < boardSizeHeight && neighbor.col >= 0 && neighbor.col < boardSizeWidth) {
            const neighborIndex = neighbor.row * boardSizeWidth + neighbor.col;
            const currentCell = gameBoard[neighborIndex];
            if (!currentCell.mina && !currentCell.button.innerText && !processed.has(neighborIndex)) {
                processed.add(neighborIndex);
                currentCell.button.innerText = currentCell.mineCount.toString();
                if (currentCell.mineCount === 0) {
                    openEmptyNeighbors(neighborIndex, gameBoard, boardSizeWidth, boardSizeHeight, processed); 
                }
            }
        }
    }
}


function getCountMina(length: number) {
    if (length >= 25 && length < 36) {
        return 4;
    } 
    else if (length >= 36 && length < 49) {
        return 6;
    }
    else if (length >= 49 && length < 64) {
        return 9;
    }
    else if (length >= 64 && length < 81) {
        return 10;
    }
    else if (length >= 81 && length < 100) {
        return 12;
    }
    else if (length >= 100 && length < 121) {
        return 16;
    }
}

function minaPosition(totalMines: number, length: number) {
    const minaPosition: number[] = [];
    while (minaPosition.length < totalMines) {
        const randomPosition = Math.floor(Math.random() * length);
        if (!minaPosition.includes(randomPosition)) {
            minaPosition.push(randomPosition);
        }
    }
    return minaPosition;
}

const sumbit = document.getElementById('Sumbit');
if (sumbit) {
    sumbit.addEventListener('click', getBoardSize);
}