import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { API_KEY } from '../../data'
import { CoinContext } from '../../context/CoinContext'
import LineChart from '../../components/LineChart/LineChart'


const Coin = () => {

  // get the coin id from parameter
  // same name with which we declarde in App.js
  // <Route path='/coin/:coinId' element={<Coin />} />
  const {coinId} = useParams()

  // *******
  // before that data fetches from api , it couldn't read the properties of null , we have some options :
  // 1 initializing properties with empty strings at first , like : useState({ name : '', image : {large : ''}})
  // 2 we can check if the data has been fetched and then return the html
  // 3 we can use ? after coinData wherever we want to read one of it's properties
  const [coinData , setCoinData] = useState()

  // for chart
  const [historicalData , setHistoricalData] = useState()

  // because we pass it to fetch chart data (later)
  const [timeSlot , SetTimeSlot] = useState(10)
  
  // to refresh the data whenever it changes , also we pass it to get chart data
  const {currency} = useContext(CoinContext)



  // fetch coin data (name , symbol , image , in other info sec : price , ...)
  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-JrdAFqLtjR9rsZ9aPpNV5cMH'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));
  }



  // fetch historical chart data
  const fetchHistoricalData = async ()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-JrdAFqLtjR9rsZ9aPpNV5cMH'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${timeSlot}&interval=daily`, options)
      .then(res => res.json())
      .then(res => setHistoricalData(res))
      .catch(err => console.error(err));
  }





  // we want to fetch the data whenever page refreshes or currency changes(navbar)
  useEffect(()=>{
    fetchCoinData()
    fetchHistoricalData()
  },[currency])



  if (coinData && historicalData) {
  return (
    <div className='coin'>
      <div className='coin-name'>
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      {/* chart component */}
      <div className="coin-chart">
      <LineChart historicalData={historicalData} />
      </div>

      {/* other data */}
      <div className="coin-info">
        <ul>
          <li>Crypto market rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          {/* ** */}
          {/* current_price is an obj (market_data : {'current_price' : {'aed' : 4378347 , 'usd' : 232323 , ...}}) */}
          {/* to local string for separating with comma */}
          <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  )
} else {
  return (
    <div className="spinner">
      <div className='spin'></div>
    </div>
  )
}
}

export default Coin
