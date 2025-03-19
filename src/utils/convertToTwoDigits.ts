export default function convertToTwoDigits(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
