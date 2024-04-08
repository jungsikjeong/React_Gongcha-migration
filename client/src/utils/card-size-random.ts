const CARDSMAL = 'card_small';
const CARDMEDIUM = 'card_medium';
const CARDLARGE = 'card_large';

export const cardSizeRandomFn = () => {
  const cardSizes = [CARDSMAL, CARDMEDIUM, CARDLARGE];
  const randomIndex = Math.floor(Math.random() * cardSizes.length);
  return cardSizes[randomIndex];
};
