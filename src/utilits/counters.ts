import { isValidCell } from "../utilits/validFunction";

export function countNeighborMines(neighbors: { row: number, col: number }[], boardSizeHeight: number, boardSizeWidth: number, minaPositions: number[]): number {
  let mineCount = 0;
  for (const neighbor of neighbors) {
    const { row, col } = neighbor;
    if (isValidCell(row, col, boardSizeWidth, boardSizeHeight) && minaPositions.includes(row * boardSizeWidth + col)) {
      mineCount++;
    }
  }
  return mineCount;
}

export function getCountMina(boardSizeHeight: number, boardSizeWidth: number): number {
  const length = boardSizeHeight * boardSizeWidth;
  const count = Math.floor(length * 0.15);
  return count;
}

export function getRandomMinaPositions(boardSize: number, totalMines: number): number[] {
  const minaPositions: number[] = [];
  while (minaPositions.length < totalMines) {
    const randomPosition = Math.floor(Math.random() * boardSize);
    if (!minaPositions.includes(randomPosition)) {
      minaPositions.push(randomPosition);
    }
  }
  return minaPositions;
}