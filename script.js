function getBoardSize() {
    var _a;
    var gameBoard = [];
    var heightInputElement = document.getElementById("GameBoardHight");
    var widthInputElement = document.getElementById("GameBoardWidth");
    var boardSizeHight = +heightInputElement.value;
    var boardSizeWidth = +widthInputElement.value;
    var buttons = Array.from(document.querySelectorAll("div > button"));
    buttons.forEach(function (element) { return element.remove(); });
    var enters = Array.from(document.querySelectorAll("div > br"));
    enters.forEach(function (element) { return element.remove(); });
    gameBoard.length = boardSizeHight * boardSizeWidth;
    var totalMines = (_a = getCountMina(gameBoard.length)) !== null && _a !== void 0 ? _a : 0;
    var minaPositionArray = minaPosition(totalMines, gameBoard.length);
    var gameBoardElement = document.getElementById("GameBoard");
    for (var i = 0; i < gameBoard.length; i++) {
        var button = document.createElement("button");
        gameBoard[i] = { button: button, mina: minaPositionArray.includes(i) };
        gameBoardElement.appendChild(gameBoard[i].button);
        gameBoard[i].button.classList.add(gameBoard[i].mina ? "mina" : "no-mina");
    }
}
function getCountMina(length) {
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
function minaPosition(totalMines, length) {
    var minaPosition = [];
    while (minaPosition.length < totalMines) {
        var randomPosition = Math.floor(Math.random() * length);
        if (!minaPosition.includes(randomPosition)) {
            minaPosition.push(randomPosition);
        }
    }
    return minaPosition;
}
var sumbit = document.getElementById('Sumbit');
if (sumbit)
    sumbit.addEventListener('click', getBoardSize);
