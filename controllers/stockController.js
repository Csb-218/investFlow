let stocks = [
  { stockId: 1, ticker: "APPLE", companyName: "Apple Inc.", price: 150.75 },
  { stockId: 2, ticker: "GOOGLE", companyName: "Alphabet Inc.", price: 2750.1 },
  { stockId: 3, ticker: "TS", companyName: "Tesla, Inc.", price: 695.5 },
];

async function getAllStocks() {
  return stocks;
}

async function getStockByTicker(ticker) {
  const stock = stocks.find((stock) => stock.ticker === ticker);
  return stock;
}

module.exports = { getStockByTicker, getAllStocks, stocks };
