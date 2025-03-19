import convertToTwoDigits from './convertToTwoDigits';

export default function getFullDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = convertToTwoDigits(today.getMonth());
  const day = convertToTwoDigits(today.getDate());

  return `${year}-${month}-${day}`;
}
