import { isValidCell } from "../utilits/validFunction";
import { neighbors } from "../types/types";

export function countNeighborMines(
  neighbors: neighbors[],
  boardSizeWidth: number,
  minaPositions: number[]
): number {
  let mineCount = 0;
  for (const neighbor of neighbors) {
    const { row, col } = neighbor;
    if (minaPositions.includes(row * boardSizeWidth + col)) {
      mineCount++;
    }
  }
  return mineCount;
}

export function getCountMina(
  boardSizeHeight: number,
  boardSizeWidth: number
): number {
  const length = boardSizeHeight * boardSizeWidth;
  const count = Math.floor(length * 0.15);
  return count;
}

export function getRandomMinaPositions(
  boardSize: number,
  totalMines: number
): number[] {
  const minaPositions: number[] = [];
  while (minaPositions.length < totalMines) {
    const randomPosition = Math.floor(Math.random() * boardSize);
    if (!minaPositions.includes(randomPosition)) {
      minaPositions.push(randomPosition);
    }
  }
  return minaPositions;
}

export function neighbor(
  row: number,
  col: number,
  boardSizeWidth: number,
  boardSizeHeight: number
) {
  const neighbors = [];
  for (let r = -1; r <= 1; r++) {
    for (let c = -1; c <= 1; c++) {
      if (r === 0 && c === 0) continue;
      const neighborRow = row + r;
      const neighborCol = col + c;
      if (
        isValidCell(neighborRow, neighborCol, boardSizeWidth, boardSizeHeight)
      ) {
        neighbors.push({ row: neighborRow, col: neighborCol });
      }
    }
  }
  return neighbors;
}
