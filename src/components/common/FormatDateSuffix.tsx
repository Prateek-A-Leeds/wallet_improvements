export function formatDateWithSuffix(dateStr: string) {
  const [dd, mm, yyyy] = dateStr.split('-');

  const day = parseInt(dd, 10);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = months[parseInt(mm, 10) - 1];

  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';

  return (
    <>
      {day}
      <sup>{suffix}</sup> {month} {yyyy}
    </>
  );
}
