const RANDOM_QUOTE_ENDPOINT = `https://api.quotable.io/random`;

export const getRandomQuote = async () => {
  return fetch(RANDOM_QUOTE_ENDPOINT);
};

export default async (_, res) => {
  const response = await getRandomQuote();

  const quote = await response.json();

  return res.status(200).json(quote);
};
