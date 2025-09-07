import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({historicalData}) => {

  // we copy the api result to display it (like displaying coins list)
  // according to react google charts website , we should pass a data(in a specific form) 
  const [data , setData] = useState([['Date' , 'Prices']])

  // ******** copying
  // in api data there is an array called prices which has two properties , first one is date(needs to be converted) and second is price
  useEffect(()=>{
    // first array should consist the name of the x and y of the chart
    let dataCopy = [['Date' , 'Prices']]
    if (historicalData.prices) {
      // each item is an array
      historicalData.prices.map((item)=>{
        // the rest should be prices and dates , ***document or chatgpt
        // should be converted into 10/05/2025 form , then we only need the day part 
        dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0,-5)}` , item[1]])
      })
      setData(dataCopy)
    }
  },[historicalData])



  return (
    <div>
      {/* library component */}
      <Chart 
          chartType='LineChart'
          data={data}
          height='250px'
          legendToggle
      
      
      />

    </div>
  )
}

export default LineChart
