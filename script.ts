function getBoardSize() {
    interface FillGameBoard {
        button: any;
        mina: boolean;
    }
    const gameBoard: FillGameBoard[] = [];
    const heightInputElement = document.getElementById("GameBoardHight") as HTMLInputElement;
    const widthInputElement = document.getElementById("GameBoardWidht") as HTMLInputElement;
    const boardSizeHight: number = +heightInputElement.value;
    const boardSizeWidth: number = +widthInputElement.value;

    const buttons: Element[] = Array.from(document.querySelectorAll("div > button"));
    buttons.forEach(element => element.remove());

    const enters: Element[] = Array.from(document.querySelectorAll("div > br"));
    enters.forEach(element => element.remove());

    gameBoard.length = boardSizeHight * boardSizeWidth;

    const totalMines:number = getCountMina(gameBoard.length) ?? 0;
    const minaPositionArray: number[] = minaPosition(totalMines, gameBoard.length);
    const gameBoardElement = document.getElementById("GameBoard") as HTMLDivElement;

    for (let i = 0; i < gameBoard.length; i++) {
        if (i % boardSizeWidth === 0) {
            gameBoardElement.appendChild(document.createElement("br"));
        }
        const button = document.createElement("button");
        gameBoard [i] = { button: button, mina: minaPositionArray.includes(i) };
        gameBoardElement.appendChild(gameBoard[i].button);
        gameBoard[i].button.classList.add(gameBoard[i].mina ? "mina" : "no-mina");
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
if (sumbit)
sumbit.addEventListener('click', getBoardSize);