import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

  // getting the currency setter function through context
  const {setCurrency} = useContext(CoinContext)

  // currency handler , *** onchnge on select (without sending parameter) not onclick on options
  const currencyHandler = (event) => {
    switch (event.target.value) {
      case 'usd': {
        setCurrency({name : 'usd' , symbol : '$'})
        break;
      }
      case 'euro': {
        setCurrency({name : 'eur' , symbol : '€'})
        break;
      }
      default: {
        setCurrency({name : 'usd' , symbol : '$'})
        break;
      }
    }
  }


  return (
    <div className='navbar'>
      <Link to={'/'}><img src={logo} className='logo' alt="" /></Link>
      <ul>
      <Link to={'/'}><li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        {/* drop down */}
        <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="euro">EURO</option>
        </select>
        {/* image in button */}
        <button>Sign Up <img src={arrow_icon} alt="" /></button>
      </div>
    </div>
  )
}

export default Navbar
