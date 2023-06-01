import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner, Stack } from "@chakra-ui/react";
import "./CoinApp.css";
export const CoinApp = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectedCurrency}`
        );
        // console.log(res.data);
        setCoins(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, [selectedCurrency]);

  //pegination part and function and calculation codes

  const indxOFlsItm = currentPage * itemsPerPage;
  const indxOfFiItm = indxOFlsItm - itemsPerPage;
  const currentItems = coins.slice(indxOfFiItm, indxOFlsItm);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //All Sorting codes 

  const handelSortChange = () => {
    const sortedCoins = [...coins];
    sortedCoins.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.market_cap_rank - b.market_cap_rank;
      } else {
        return b.market_cap_rank - a.market_cap_rank;
      }
    });
    setCoins(sortedCoins);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };


  //changing the currincies

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
    setCurrentPage(1);
  };

  // onclick pop up codes

  const handelSelectedCoin = (coin) => {
    setSelectedCoin(coin)
  }


  const handelPopUpClose = () => {
    setSelectedCoin(null);
  };



  

//loading part
  if (isLoading) {
    return (
      <Spinner
        thickness="300px"
        speed="0.99s"
        emptyColor="white"
        color="green"
        size="xxxl"
      />
    );
  }

  return (
    <div>




      <div className="currMainBox">
        <div className="curr1">
          <h1>Select Currence</h1>
        </div>
        <div className="curr2">
          <select value={selectedCurrency} onChange={handleCurrencyChange}>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>

      <div className="currMainBox">
        <div className="curr1">
          <h1>Sort By Price</h1>
        </div>
        <div className="btnsrtBox">
          <button onClick={handelSortChange}>
            {sortOrder === "asc" ? "High to Low" : "Low to High"}
          </button>
        </div>
      </div>

      <table className="coin-table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>

        <tbody>
          {coins &&
            currentItems.map((el) => (
                <tr key={el.id} onClick={() => handelSelectedCoin(el)}>
                <td>
                  <img src={el.image} width={"25"} />
                </td>
                <td>{el.name}</td>

                <td>{`${
                  selectedCurrency == "INR"
                    ? "₹"
                    : selectedCurrency == "USD"
                    ? "$"
                    : "€"
                } ${el.current_price.toLocaleString()}`}</td>
                <td
                  className={
                    el.price_change_percentage_24h.toFixed(2) < 0
                      ? "minusPer"
                      : "plusPer"
                  }
                >
                  {el.price_change_percentage_24h.toFixed(2)}
                </td>
                <td>{`${
                  selectedCurrency == "INR"
                    ? "₹"
                    : selectedCurrency == "USD"
                    ? "$"
                    : "€"
                } ${el.market_cap.toLocaleString()}`}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="btnBox">
        <button
          className="btn1"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button className="btn3">{currentPage}</button>
        <button
          className="btn2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={indxOFlsItm >= coins.length}
        >
          Next
        </button>
      </div>









      {/* //pop up contents */}


    {selectedCoin && (
      <div className="popUpMainBox">
        <div className="popUp-content">
        <span className="close" onClick={handelPopUpClose}>
        &times;
          </span>
          <h2>{selectedCoin.name}</h2>
          <div className="symBox">{selectedCoin.symbol}</div>
          <p><img src={selectedCoin.image} alt={selectedCoin.name} /></p>
          


          <div className="detailBox">Market Cap Rank: {selectedCoin.market_cap_rank}</div>
          
          
          <div className="detailBox">Current Price: {selectedCoin.current_price.toLocaleString()}</div>
          
          
          <div className="detailBox">Price Change 24h: {selectedCoin.price_change_percentage_24h}</div>
          
          
          <div className="detailBox">Total Volume: {selectedCoin.total_volume}</div>
          
          
          <div className="detailBox">Low 24h: {selectedCoin.low_24h}</div>
          
          
          <div className="detailBox">High 24h: {selectedCoin.high_24h}</div>
          
          
          <div className="detailBox">Total Supply: {selectedCoin.total_supply}</div>
          
          
          <div className="detailBox">Max Supply: {selectedCoin.max_supply}</div>
          
          
          <div className="detailBox">Circulating Supply: {selectedCoin.circulating_supply}</div>
          
          
          <div className="detailBox">All Time High: {selectedCoin.ath}</div>
          
          
          <div className="detailBox">Last Updated Date: {selectedCoin.last_updated}</div>
          
          
        </div>
      </div>
    )}
    </div>
  );
};
