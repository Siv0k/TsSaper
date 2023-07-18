import { debug } from 'console';
import { FillGameBoard } from '../types/types';

export function gameOver(gameBoard: FillGameBoard[]) {;
    gameBoard.forEach((cell) => {
        if (cell.mina) {
            cell.button.innerText = '💣';
            cell.button.classList.add('clicked');
        } else {
            cell.button.innerText = cell.mineCount > 0 ? cell.mineCount.toString() : '';
            cell.button.classList.add('clicked');
        }
    });
    alert("ТЫ ПРОИГРАЛ!");
}

export function gameWin(gameBoard: FillGameBoard[], totalMines: number) {
    const gameBoardElement = document.getElementById("GameBoard") as HTMLDivElement;
    const win = gameBoardElement.querySelectorAll('button.clicked').length;
    const flaggedMines = gameBoard.filter(cell => cell.button.innerText === '🚩' && cell.mina);
    if (win === gameBoard.length - totalMines || flaggedMines.length === totalMines) {
        const incorrectlyFlaggedCells = gameBoard.filter(cell => cell.button.innerText === '🚩' && !cell.mina);
        if (incorrectlyFlaggedCells.length === 0) {
          alert("Вы выиграли!");
          location.reload();
        }
      }
}