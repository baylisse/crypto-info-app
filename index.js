import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { AddCurrencyToWatchlist, DeleteCurrencyFromWatchlist, GetWatchlistFromDB } from "./db/connection.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const priceAPIURL = "/GetPrice/:currencyCode";
const app = express();
const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.get("/GetWatchlist/:userId", async (q, s) => {
    const dbWatchlist = await GetWatchlistFromDB();
    const currencyCodes = dbWatchlist.map(e => e.currencycode);
    let watchlist = { entries: [] };
    for (let cc of currencyCodes) {
        const entry = await alphaVantage(cc);
        watchlist.entries.push(entry);
    }
    s.send(watchlist);
});
app.get(priceAPIURL, async (q, s) => {
    const response = await alphaVantage(q.params.currencyCode);
    s.send(response);
});
app.get("/GetPriceHistory/:currencyCode/:startDate/:endDate", async (request, response) => {
    const currencyCode = request.params.currencyCode;
    const GetPriceHistoryAPIURL = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${currencyCode}&market=USD&apikey=${apiKey}`;
    const data = await (await fetch(GetPriceHistoryAPIURL)).json();
    console.log(Object.keys(data));
    const dailyData = data["Time Series (Digital Currency Daily)"];
    console.log(Object.keys(dailyData["2021-12-03"]));
    const parseData = Object.keys(dailyData).map((k) => ({
        time: k,
        open: parseFloat(dailyData[k]["1a. open (USD)"]),
        high: parseFloat(dailyData[k]["2a. high (USD)"]),
        low: parseFloat(dailyData[k]["3a. low (USD)"]),
        close: parseFloat(dailyData[k]["4a. close (USD)"]),
    }));
    parseData.reverse();
    response.send(parseData);
});
app.put("/Watchlist", (request, response) => {
    console.log(request.body);
    const currencyCode = request.body.currencyCode;
    //testWatchlist.entries.push ( {currencyCode: currencyCode, askPrice: 1, bidPrice: 1, currencyName: "test"} );
    AddCurrencyToWatchlist(currencyCode);
    response.send("OK");
});
app.delete("/Watchlist", (request, response) => {
    console.log(request.body);
    const currencyCode = request.body.currencyCode;
    DeleteCurrencyFromWatchlist(currencyCode);
    //const deleteIndex = testWatchlist.entries.findIndex(e => e == request.body.currencyCode );    
    // testWatchlist.entries.splice(deleteIndex, 1);
    //       // database part --todo
    //       console.log(testWatchlist)
    //       response.send(testWatchlist.entries);
});
app.use(express.static("./crypto-app-frontend/build"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "crypto-app-frontend", "build", "index.html"));
});
app.listen(port, () => { console.log("Server running at port:", port); });
let apiKey = "VZLFMRI7DC8A6X9L";
export async function alphaVantage(fromCurrencyCode) {
    let EXCHANGE_RATE_API_ENDPOINT = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrencyCode}&to_currency=USD&apikey=${apiKey}`;
    const response = await fetch(EXCHANGE_RATE_API_ENDPOINT);
    const originalResponse = await response.json();
    const data = originalResponse["Realtime Currency Exchange Rate"];
    console.log("the data was", data);
    const obj = {
        currencyName: data["2. From_Currency Name"],
        currencyCode: data["1. From_Currency Code"],
        askPrice: parseFloat(data["9. Ask Price"]),
        bidPrice: parseFloat(data["8. Bid Price"]),
    };
    console.log(obj);
    return obj;
}
const testWatchlist = {
    entries: [
        { currencyCode: "BTC", currencyName: "Bitcoin", askPrice: 70100, bidPrice: 70000 },
        { currencyCode: "ETH", currencyName: "Etherium", askPrice: 4200, bidPrice: 4100 },
        { currencyCode: "BNB", currencyName: "BinanceCoin", askPrice: 600, bidPrice: 595 },
        { currencyCode: "USDT", currencyName: "Ther", askPrice: 1.10, bidPrice: 1.05 },
        { currencyCode: "DOGE", currencyName: "Dogecoin", askPrice: .27, bidPrice: .23 },
    ]
};
//alphaVantage("ETH");
