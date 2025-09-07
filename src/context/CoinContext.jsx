// so we can use this api data wherever we want in this site
// we use context because we want to share multiple states which work together in order to do sth (get the data from api)
// for example whenever currency (second state) changes , we should get new results and store them in first state
// we use context to  pass variable and setter function

import { createContext, useEffect, useState } from "react"

export const CoinContext = createContext()

const CoinContextProvider = (props)=>{

    // storing the api data
    const [allCoin , setAllCoin] = useState([])
    const [currency , setCurrency] = useState({
        // default value
        name : 'usd' ,
        symbol : '$' ,
    })

    // fetching the data
    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-JrdAFqLtjR9rsZ9aPpNV5cMH'}
          };

          //   we have to provide currency to get the results
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err));
    }

    // whenever page refreshes or currency changes , the data will update
    useEffect(()=>{
        fetchAllCoin()
    },[currency])

    // therefore we can acsses these in any component
    const contextValue = {
        allCoin , currency , setCurrency
    }

    return (
        // document
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

// we should wrap the App in this provider so we can acsses it in every component
export default CoinContextProvider