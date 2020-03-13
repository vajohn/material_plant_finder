export function toCentsFromFour(given: number): number {
  return given * 100;
}
export function toTwoCents(given: number): number {
  return  Math.floor(given * 100) / 100;
}
