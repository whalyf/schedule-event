export const verifyEventStatus = ({
  start,
  end,
}: {
  start: Date;
  end: Date;
}) => {
  const currentDate = new Date();
  const endDate = new Date(end);
  const startDate = new Date(start);

  return currentDate > endDate
    ? 'past'
    : currentDate >= startDate && currentDate <= endDate
    ? 'happening'
    : 'upcoming';
};
