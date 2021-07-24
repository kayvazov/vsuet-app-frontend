const detectStage = (rating) => {
  if (Number(rating)) {
    const currentRating = Number(rating);

    if (currentRating >= 85) return 1;
    if (currentRating >= 75 && currentRating <= 84) return 2;
    if (currentRating <= 74) return 3;
  }

  if (rating === 'Отл') return 1;
  if (rating === 'Хор') return 2;
  if (rating === 'Удовл' || rating === 'Неуд') return 3;
  if (rating === 'Зачет') return 4;

  return false;
};

export default (rating) => {
  switch (detectStage(rating)) {
    case 1:
      return 'green';
    case 2:
      return 'orange';
    case 3:
      return 'red';
    case 4:
      return 'green';
    default:
      return 'white';
  }
};
