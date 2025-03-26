import convertToTwoDigits from './convertToTwoDigits';

export default function getDateToday(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = convertToTwoDigits(today.getMonth() + 1);
  const day = convertToTwoDigits(today.getDate());

  return `${year}-${month}-${day}`;
}
