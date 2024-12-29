const app = require("../index");
const request = require("supertest");

const http = require("http");

const {
  getStockByTicker,
  getAllStocks,
  stocks
} = require("../controllers/stockController");
const { addTrade , trades ,validateTrade} = require("../controllers/tradeControllers");


let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("api Tests", () => {

  // Test 1: Get All Stocks
  it("GET /stocks endpoint successfully retrieves all stocks", async () => {

    const response = await request(server).get("/stocks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ stocks: stocks });
  });

  // Test 2: Get Stock by Ticker
  it("GET /stocks/:ticker endpoint successfully retrieves a specific stock by ticker symbol.", async () => {
    const mockStock = {
      stockId: 1,
      ticker: "APPLE",
      companyName: "Apple Inc.",
      price: 150.75,
    };
    

    const response = await request(server).get("/stocks/APPLE");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ stock: mockStock });
  });

  // Test 3: Add a New Trade
  it("POST /trades endpoint successfully adds a new trade with valid input.", async () => {
    const mockTrade = {
      stockId: 1,
      quantity: 10,
      tradeType: "buy",
      tradeDate: "2024-08-07",
    };
    const ResolvedTrade =  { tradeId: 4, ...mockTrade } ;

    const response = await request(server).post("/trades/new").send(mockTrade);
    expect(response.statusCode).toBe(200);

    expect(response.body).toEqual({
      message: "Trade added successfully",
      trade: ResolvedTrade,
    });
  });

  // Test 4: Error Handling for Get Stock by Invalid Ticker
  it("GET /stocks/:ticker endpoint returns a 404 status code when provided with an invalid ticker", async () => {
    
    const response = await request(server).get("/stocks/900");
    expect(response.statusCode).toBe(404);
  });

  // Test 5: Input Validation for Add Trade
  it("POST /trades endpoint returns a 400 status code when provided with invalid input", async () => {
    const mockTrade = {
      stockId: 1,
      tradeType: "buy",
      tradeDate: "2024-08-07",
    };

    const unResolved = "Missing required fields";

    

    const response = await request(server).post("/trades/new").send(mockTrade);
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe(unResolved);
  });

  // Test 6: Mock getAllStocks Function
  test(" getAllStocks function is called correctly within the GET /stocks endpoint.", async () => {

    const response = await request(server).get("/stocks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ stocks: stocks });
  });

});

describe("Testing functions ", () => {
  

  // Test 7: Mock Add Trade Function (Async)
  it("addTrade function works correctly and returns the expected output.", async () => {
    const newTrade = {
      stockId: 1,
      quantity: 15,
      tradeType: "buy",
      tradeDate: "2024-08-08",
    };

    let ReturnedTrade = addTrade(newTrade);

    expect(ReturnedTrade).toEqual({
      tradeId: trades.length,
      ...newTrade,
    });

  });
});
