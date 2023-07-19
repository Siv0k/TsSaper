export function isValidCell(
  row: number,
  col: number,
  boardSizeWidth: number,
  boardSizeHeight: number
): boolean {
  return row >= 0 && row < boardSizeHeight && col >= 0 && col < boardSizeWidth;
}
