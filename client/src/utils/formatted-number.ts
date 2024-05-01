export const formattedNumber = (number: number) => {
  if (number >= 10000) {
    return new Intl.NumberFormat('ko-KR').format(number / 10000) + '만';
  } else if (number >= 1000) {
    return new Intl.NumberFormat('ko-KR').format(number / 1000) + '천';
  } else {
    return number;
  }
};
