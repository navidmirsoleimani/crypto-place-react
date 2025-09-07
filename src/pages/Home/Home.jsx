import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

  // getting all coin data from context
  const {allCoin , currency} = useContext(CoinContext)

  // we store the data coming from context in another state (but why? because it's the only way to update coin table everytime drop-down button in navbar changes the allCoin)
  // we have to initialize it , therefore before getting the data from api , the map or slice methods wouldn't cause problem cause they should be called on a array even if it's empty
  // and another reason for this is : when we search for a particular coin or coins we will filter the allCoin and copy the filterd value in displayCoin instead of sending api request
  const [displayCoin , setDisplayCoin] = useState([])

  // storing search box data
  const [input , setInput] = useState('')

  // input handler
  const inputHandler = (event) => {
    setInput(event.target.value)
    // if we clear the input after searching , it will show the top 10 coin again
    if (event.target.value==='') {
      setDisplayCoin(allCoin)
    }
  }

  // search handler , ***async
  const searchHandler = async (event) => {
    // prevent refreshing the website
    event.preventDefault()
    // ***await , ***filtering the data
    const coins = await allCoin.filter((item , index)=>{
      return (
        // we check both name and symbol when searching
        item.name.toLowerCase().includes(input.toLowerCase()) || item.symbol.toLowerCase().includes(input.toLowerCase())
      )
    })
    // ***
    setDisplayCoin(coins)
  }

  // storing the context data in state
  useEffect(()=>{
    setDisplayCoin(allCoin)
  },[allCoin])


  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br/> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency
          marketplace. Sign up to explore more about cryptos.</p>
          {/* we use form to submit and get the result */}
          <form onSubmit={searchHandler}>
            {/* why required and value? */}

            {/* ***** */}
            <input value={input} list='coinlist' onChange={inputHandler} type="text" placeholder='Search crypto' required />
            {/* drop down list , document */}
            <datalist id='coinlist'>
              {allCoin.map((item , index)=> <option key={index} value={item.name}/>)}
            </datalist>
            
            <button type='submit'>Search</button>
          </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          {/* 24h change should be at the centre of the column and market gap should be at the end */}
          <p style={{textAlign:'center'}}>24H Change</p>
          <p className='market-cap' style={{textAlign:'right'}}>Market Cap</p>
        </div>
        {/* we use slice to limit the number of coins displaying */}
        {
          displayCoin.slice(0,10).map((item , index)=>{
            return (
              <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                <p>{item.market_cap_rank}</p>
                <div>
                  <img src={item.image} alt="" />
                  <p>{item.name + ' - ' + item.symbol}</p>
                  <p></p>
                </div>
                {/* toLocaleString for divding the numbers by , */}
                <p className='price'>{currency.symbol} {item.current_price.toLocaleString()}</p>
                {/* styling by their value */}
                <p style={{textAlign: 'center' , color : item.price_change_percentage_24h > 0 ? 'green' : 'red'}}>{Math.floor(item.price_change_percentage_24h * 100) / 100}</p>
                  <p className='market-cap' style={{textAlign:"right"}}>{currency.symbol} {item.market_cap.toLocaleString()}</p>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home
