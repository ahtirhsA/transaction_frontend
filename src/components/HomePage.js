import React,{useContext} from 'react';
import {Link,useNavigate} from 'react-router-dom'
import HistoryIcon from '@mui/icons-material/History';
import Cookies from 'js-cookie'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import './HomePage.css';  
import TransactionContext from '../context/TransactionContext';

const HomePage = () => {

    const navigatee=useNavigate()

    const {UserDetails}=useContext(TransactionContext)
    const {userId,userName}=UserDetails

    const jTkn=Cookies.get(userId)

    const logoutFunc=async ()=>{

      const options={
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${jTkn}`
        }
      }

      const response=await fetch(`https://transaction-backend-qpm8.onrender.com/logout/${userId}`,options)
      const jsonResp=await response.json()

      if (response.ok){
        Cookies.remove(userId)
        navigatee('/')
      }
      else{
         alert(jsonResp.message)
      }

    }
   
    return (

        <div>
        <button className="logout-butt" onClick={logoutFunc}> logout </button>

        <div className='home-container'>
            <h2 className='greeting'>{`Hello ${userName}!!!`}</h2>
            <div className="icon-container">
                <Link className="icon-item" to='/thistory'>
                    <div className="icon-circle">
                        <HistoryIcon className="icon" />
                    </div>
                    <p className="icon-label">History</p>
                </Link>

                <Link className="icon-item" to='/balance'>
                    <div className="icon-circle">
                        <AccountBalanceWalletIcon className="icon" />
                    </div>
                    <p className="icon-label">Check Balance</p>
                </Link>

                <Link className="icon-item" to='/tform/1'>
                    <div className="icon-circle">
                        <GTranslateIcon className="icon" />
                    </div>
                    <p className="icon-label">Make Transaction</p>
                </Link>

                <Link className="icon-item" to='/tform/2'>
                    <div className="icon-circle">
                        <SystemUpdateAltIcon className="icon" />
                    </div>
                    <p className="icon-label">Update Transaction</p>
                </Link>
            </div>
        </div>

        </div> 
    );
};

export default HomePage;
