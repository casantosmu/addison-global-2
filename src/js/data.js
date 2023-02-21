const promotionsDomain = "https://www.mocky.io";
const promotionsPath = "v2/5bc3b9cc30000012007586b7";
const promotionsUrl = `${promotionsDomain}/${promotionsPath}`;

let allPromotions = [];

export const fetchAllPromotions = async () => {
  const response = await fetch(promotionsUrl);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  allPromotions = json;
};

const sortBySequence = (a, b) => b.sequence - a.sequence;

export const getAllPromotions = () => [...allPromotions].sort(sortBySequence);

export const getNewCustomersPromotions = () =>
  allPromotions
    .filter((promotion) => promotion.onlyNewCustomers)
    .sort(sortBySequence);
