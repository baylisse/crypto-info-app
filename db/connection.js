import createConnectionPool, { sql } from '@databases/pg';
import DBURL from "../env.js";
//console.log(DBURL)
const db = createConnectionPool(DBURL.database_url);
const CreateTableForTheFirstTime = async () => {
    const queryString = sql `CREATE TABLE IF NOT EXISTS Watchlist  (
        id bigint NOT NULL PRIMARY KEY,
        currencyCode TEXT
    )`;
    // execute query
    await db.query(queryString);
};
//CreateTableForTheFirstTime().catch ( (err) => { console.log(" DB error ", err); } );
export const AddCurrencyToWatchlist = async (currencyCode) => {
    await db.query(sql `INSERT INTO Watchlist (currencyCode) VALUES (${currencyCode})`);
};
// get
export const GetWatchlistFromDB = async () => {
    const watchlist = await db.query(sql `SELECT * FROM Watchlist`);
    console.log("the watchlist is", watchlist);
    return watchlist;
};
// delete
export const DeleteCurrencyFromWatchlist = async (currencyCode) => {
    await db.query(sql `DELETE FROM Watchlist WHERE currencyCode=${currencyCode}`);
    console.log("deleted");
};
//await AddCurrencyToWatchlist("ETH");
// await GetWatchlistFromDB();
// await DeleteCurrencyFromWatchlist("BTC");
// console.log("completed")
