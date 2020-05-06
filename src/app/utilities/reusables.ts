export function toCentsFromFour(given: number): number {
  return given * 100;
}
export function toFourFromCents(given: number): number {
  return given / 100;
}
export function toTwoCents(given: number): number {
  return  Math.floor(given * 100) / 100;
}

export function hideIdNumber(nationalIdNumber: string): string {
  return nationalIdNumber.substring(0, 2) + nationalIdNumber.substring(2, nationalIdNumber.length - 3).replace(/\d/g, '*') + nationalIdNumber.substring(nationalIdNumber.length - 3);
}
