import { FillGameBoard } from '../types/types';
import { getCountMina } from '../utilits/counters';

export function gameOver(gameBoard: FillGameBoard[], index: number) {
    const cell = gameBoard[index];
    if (cell.mina) {
    cell.button.innerText = '💣';
    alert("ТЫ ПРОИГРАЛ!");
    location.reload();
    }
}
  
export function gameWin(gameBoard: FillGameBoard[], boardSizeWidth: number, boardSizeHeight: number) {
    const gameBoardElement = document.getElementById("GameBoard") as HTMLDivElement;
    const win = gameBoardElement.querySelectorAll('button.clicked').length;
    if (win === gameBoard.length - getCountMina(boardSizeHeight, boardSizeWidth)) {
        alert("Вы выиграли!");
        location.reload();
    }
}