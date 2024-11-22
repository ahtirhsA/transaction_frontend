import React, { useState, useEffect, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";
import TransactionContext from "../context/TransactionContext";
import Cookies from "js-cookie";
import { Oval } from 'react-loader-spinner';
import "./Balance.css"; 


const stat = {
  success: "SUCCESS",
  failure: "LOADING",
};

const Balance = () => {

  const navi=useNavigate()

  const { UserDetails } = useContext(TransactionContext);
  const { userId } = UserDetails;

  const [ob, setOb] = useState({ stus: "INITIAL", blnc: 0 });
  const { stus, blnc } = ob;

  const tokie = Cookies.get(userId);

  const balFunc = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokie}`,

      }
    };

    setOb({stus: stat.failure})

    const response = await fetch(`https://transaction-backend-qpm8.onrender.com/balance/${userId}`, options);
    const jsonData = await response.json();


    if (response.ok) {
      setOb({ stus: stat.success, blnc: jsonData.Amount });
    } else {
      setOb({ stus: stat.failure });
    }
  };

  useEffect(() => {
    balFunc();
  }, []);

  const failFunc = () => {
    return (
      <div className='bal-loading-container'>
              <Oval 
                  height={80} 
                  width={80} 
                  color="blue" 
                  ariaLabel="loading"
              />
      </div>
      )
  };

  const backFunc=()=>{
    navi('/home')
  }

  return (
    <div>
           <button className="back-butt" onClick={backFunc}> &lt;back </button>

    <div className="fin-bal-con">
    {stus=='SUCCESS'?
    <div className="bal-balance-container">
      <div className="bal-icon-container">
        <CheckCircleRoundedIcon className="bal-check-icon" />
      </div>
      <div className="bal-balance-display">
        <CurrencyRupeeRoundedIcon className="bal-rupee-icon" />
        <span className="bal-balance-amount">
          {stus === "SUCCESS" ? blnc : failFunc()}
        </span>
      </div>
      <p className="bal-balance-label">Available Balance</p>
    </div>:failFunc()
}
    </div>
    </div>
  );
};

export default Balance;
