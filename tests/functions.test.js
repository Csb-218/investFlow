const {
    getStockByTicker,
    getAllStocks,
  } = require("../controllers/stockController");
  const { getAllTrades, addTrade } = require("../controllers/tradeControllers");
  
  describe("Testing functions ", () => {
  
    // Test 7: Mock Add Trade Function (Async)
    it("addTrade function works correctly and returns the expected output.", async () => {
      let newTrade = {
        stockId: 1,
        quantity: 15,
        tradeType: "buy",
        tradeDate: "2024-08-08",
      };
  
      let ReturnedTrade = await addTrade(newTrade);
  
      expect(ReturnedTrade).toEqual({
        tradeId: 4,
        ...newTrade,
      });
    });
  });