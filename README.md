# crypto-info-app
### An informational cryptocurrency app built using TypeScript, React, Express, Postgres, and the AlphaVantage API

####Deployed with Heroku: [Crypto Info App](https://bqb-crypto-app-2.herokuapp.com/)

***NOTE*** The AlphaVantage API free level that this app uses can only make 5 requests per minute. If the Watchlist is more than 5 currencies long, it won't load properly. This could be addressed with an API key from the professional/paid AlphaVantage API.

To run locally: npm install & npm start

The homepage of this app is a cryptocurrency watchlist, showing the currency name, symbol, ask price, and bid price for a given currency. Each row also has a button to take you to the currency's price chart. There is also a button to remove it from the watchlist.


![image](https://user-images.githubusercontent.com/76703615/144760287-8d15d00d-d80a-4e7e-8c77-ab5b77bc4a81.png)




The search field takes in a cryptocurrency symbol and takes you to a price chart page that displays historical price data. Currently, you need to actually click on the magnifying glass search icon to search. The chart is from the Tradingview Lightweight Charts API. On the chart page there is also a button to add that currency to the watchlist. From this page, you can navigate back to the watchlist using the menu in the upper left of the page.


![image](https://user-images.githubusercontent.com/76703615/144760305-ed808d88-a0ed-404b-952a-1bf7ee50e6e1.png)


More functionality coming soon!
