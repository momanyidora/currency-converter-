import axios from "axios";

const BASE_URL = "https://api.frankfurter.dev/v1";

export const getCurrencies = async () => {
  const res = await axios.get(`${BASE_URL}/currencies`);
  return res.data;
};

export const getLatestRate = async (from: string, to: string) => {
  const res = await axios.get(`${BASE_URL}/latest?base=${from}&symbols=${to}`);

  return res.data;
};

export const getHistoricalRates = async (
  from: string,
  to: string,
  start: string,
  end: string,
) => {
  const res = await axios.get(
    `${BASE_URL}/${start}..${end}?base=${from}&symbols=${to}`,
  );

  return res.data;
};
