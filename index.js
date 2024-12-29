const express = require("express");

const {
  getAllStocks,
  getStockByTicker,
} = require("./controllers/stockController");

const { getAllTrades, addTrade } = require("./controllers/tradeControllers");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Exercise 1: Retrieve All Stocks
app.get("/stocks", async (req, res) => {
  const stocks = await getAllStocks(); 
  res.status(200).json({ stocks: stocks });
});

// Exercise 2: Retrieve Stock by Ticker
app.get("/stocks/:ticker", async (req, res) => {
  try {
    const stock = await getStockByTicker(req.params.ticker);
    
    if (stock) {
      res.json({ stock: stock });
    } else {
      res.status(404).json({ message: "Stock not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Exercise 3: Add a New Trade
app.post("/trades/new", async (req, res) => {
  try {
    const newTrade = addTrade(req.body);
    console.log(newTrade);
    if (newTrade) {
      res
        .status(200)
        .json({ message: "Trade added successfully", trade: newTrade });
    } else res.status(400).send("Missing required fields");
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Internal Server Error csb" });
  }
});

// Exercise 4: Retrieve All Trades
app.get("/trades", (req, res) => {
  res.json({ trades: getAllTrades() });
});

// app.listen(3000, () => {
//   console.log("Express server initialized");
// });

module.exports = app;
