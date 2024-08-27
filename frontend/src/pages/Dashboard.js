import React, { useState, useEffect } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import $ from "jquery";
import "datatables.net";

const Dashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [totalMarketCap, setTotalMarketCap] = useState(0);

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=true&price_change_percentage=24h"
      );
      const data = await response.json();

      const cryptoTableData = data.map((crypto) => ({
        rank: crypto.market_cap_rank,
        name: crypto.name,
        image: crypto.image,
        marketCap: crypto.market_cap,
        price: crypto.current_price,
        todayChange: crypto.price_change_percentage_24h,
        sparkline: crypto.sparkline_in_7d.price,
      }));

      // Calculate total market cap
      const totalMarketCap = cryptoTableData.reduce(
        (acc, crypto) => acc + crypto.marketCap,
        0
      );

      setCryptoData(cryptoTableData);
      setTotalMarketCap(totalMarketCap);
    } catch (error) {
      console.error("Failed to fetch crypto data:", error);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  useEffect(() => {
    if (cryptoData.length > 0) {
      $(document).ready(function () {
        $("#cryptoTable").DataTable(); // Initialize DataTable
      });
    }
  }, [cryptoData]);

  return (
    <div className="container-fluid col-xl-7">
      <style>
        {`
          @media (max-width: 576px) {
            #cryptoTable td, #cryptoTable th {
              font-size: 12px; /* Smaller font size for mobile devices */
            }
            #cryptoTable img {
              width: 15px; /* Smaller image size for mobile devices */
              margin-right: 5px;
            }
          }
        `}
      </style>
      <div>
        <div className="mb-3 text-center">
          <h3>Cryptocurrency Prices</h3>
          <div>
            <strong>Companies:</strong> {cryptoData.length.toLocaleString()}{" "}
            &nbsp;|&nbsp;
            <strong>Total Market Cap:</strong> $
            {totalMarketCap.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
        </div>
        <div className="table-responsive">
          <table id="cryptoTable" className="table table-striped display">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Market Cap</th>
                <th>Price</th>
                <th>Today</th>
                <th>Price Trend (7 days)</th>
              </tr>
            </thead>
            <tbody>
              {cryptoData.map((crypto, index) => (
                <tr key={index}>
                  <td>{crypto.rank}</td>
                  <td>
                    <img
                      src={crypto.image}
                      alt={`${crypto.name} logo`}
                      style={{ width: "20px", marginRight: "10px" }}
                    />
                    {crypto.name}
                  </td>
                  <td>${crypto.marketCap.toLocaleString()}</td>
                  <td>${crypto.price}</td>
                  <td
                    style={{
                      color: crypto.todayChange >= 0 ? "green" : "red",
                    }}
                  >
                    {crypto.todayChange.toFixed(2)}%
                  </td>
                  <td>
                    <Sparklines
                      data={crypto.sparkline}
                      svgHeight={50}
                      svgWidth={150}
                    >
                      <SparklinesLine
                        color={crypto.todayChange >= 0 ? "green" : "red"}
                      />
                    </Sparklines>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
