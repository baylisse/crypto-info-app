import React, { useEffect } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import Button from "@mui/material/Button";

const apiEndpoint = "/Watchlist";

export default function CandlestickChart() {
  let mutableReference: any = React.useRef(null);
  useEffect(() => {
    async function makeDataHappen() {
      const chart = createChart(mutableReference.current, {
        width: 900,
        height: 500,
        layout: {
          backgroundColor: "#000000",
          textColor: "rgba(255, 255, 255, 0.9)",
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.5)",
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.5)",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        rightPriceScale: {
          borderColor: "rgba(197, 203, 206, 0.8)",
        },
        timeScale: {
          borderColor: "rgba(197, 203, 206, 0.8)",
        },
      });

      var candleSeries = chart.addCandlestickSeries({
        upColor: "rgba(255, 144, 0, 1)",
        downColor: "#000",
        borderDownColor: "rgba(255, 144, 0, 1)",
        borderUpColor: "rgba(255, 144, 0, 1)",
        wickDownColor: "rgba(255, 144, 0, 1)",
        wickUpColor: "rgba(255, 144, 0, 1)",
      });
      const data: any = await getData();
      console.log(data.length);
      console.log(data[0]["time"]);
      console.log(data[0]);
      candleSeries.setData(data);
    }

    makeDataHappen();
  }, []);

  return (
    <div className="container" >
      <div className="chart" ref={mutableReference} style={ { display: "flex", justifyContent:"center", marginTop: "50px"}}/>
      <Button
        className="button"
        variant="contained"
        sx={{
          margin: "10px",
          backgroundColor: "#0F4C75",
        }}
        onClick={async () => {
          const res = await fetch(apiEndpoint, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currencyCode: window.location.pathname.substring(1),
            }),
          });
          console.log("watchlist add result", res);
        }}
      >
        Add to Watchlist
      </Button>
    </div>
  );
}

let currencyCode = window.location.pathname.substring(1);

const HistoryAPIURL = `/GetPriceHistory/${currencyCode}/1/1`;

async function getData() {
  const liveData: any = await (await fetch(HistoryAPIURL)).json();
  return liveData;
}
