import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Header from './Layout/Header'
import ResponsiveAppBar from './Layout/AppBar';
import BasicTable from './Layout/Watchlist';
import CandlestickChart from './Layout/HistoryChart';


function App() {
  return (
    <div className="App">
      <Header />
      <ResponsiveAppBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasicTable />} />
          <Route path="/:currencyCode" element={<CandlestickChart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
