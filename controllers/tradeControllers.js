let trades = [
  {
    tradeId: 1,
    stockId: 1,
    quantity: 10,
    tradeType: "buy",
    tradeDate: "2024-08-07",
  },
  {
    tradeId: 2,
    stockId: 2,
    quantity: 5,
    tradeType: "sell",
    tradeDate: "2024-08-06",
  },
  {
    tradeId: 3,
    stockId: 3,
    quantity: 7,
    tradeType: "buy",
    tradeDate: "2024-08-05",
  },
];

async function getAllTrades() {
  return trades;
}

function validateTrade(trade) {

  if (
     typeof trade?.stockId !== 'number' ||
     typeof trade?.quantity !== 'number' ||
    !trade?.tradeType ||
    !trade?.tradeDate
  ) {
    return false;
  }

  return true;
}

function addTrade(trade) {
  // console.log(trade);
  const isValid = validateTrade(trade);
  if (!isValid) {
    return null; // Return null if the trade is not valid
  }

  const newTrade = {
    tradeId: trades.length + 1,
    ...trade
  };

  trades.push(newTrade);
  // console.log(newTrade);
  return({ ...newTrade }) ;

  }


module.exports = { getAllTrades, addTrade ,trades, validateTrade};
