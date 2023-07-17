import { FillGameBoard } from '../types/types';

export function gameOver(cellButton: HTMLButtonElement) {;
    cellButton.innerText = '💣';
    alert("ТЫ ПРОИГРАЛ!");
    location.reload();
}
  
export function gameWin(gameBoard: FillGameBoard[], totalMines: number) {
    const gameBoardElement = document.getElementById("GameBoard") as HTMLDivElement;
    const win = gameBoardElement.querySelectorAll('button.clicked').length;
    if (win === gameBoard.length - totalMines) {
        alert("Вы выиграли!");
        location.reload();
    }
}