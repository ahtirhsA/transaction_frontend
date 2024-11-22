import React, { useEffect, useState,useContext } from "react";
import Record from "./Record.js";
import "./Transaction_History.css"; 
import {useNavigate} from 'react-router-dom'
import TransactionContext from "../context/TransactionContext.js";
import { Oval } from 'react-loader-spinner';
import Cookies from 'js-cookie'

const statusObj = {
  success: "SUCCESS",
  progress: "LOADING",
  failure: "FAILURE",
};

const Transaction_History = () => {

  const navi=useNavigate()

 const {UserDetails}=useContext(TransactionContext)
 const {userId}=UserDetails

 const tokenn=Cookies.get(userId)

  const [obj, setObj] = useState({ status: "INITIAL", arr: [] });

  const fetchTransactions = async () => {

   const options={
    method:'GET',
    headers:{
      'Content-Type':'application/json',
      Authorization:`Bearer ${tokenn}`

    }
   }

   setObj({status:statusObj.progress})

    const response = await fetch(`https://transaction-backend-qpm8.onrender.com/userTrans/${userId}`,options);
    const jsonData = await response.json();

    console.log(jsonData)

    if (response.ok) {
      setObj({ status: statusObj.success, arr: jsonData.data });
    } else {
      setObj({ status: statusObj.failure });
    }
  };

  const noSearchResults=()=>{

    return ( 
    <div className='no-search-container'>
     <img src='https://cdn.dribbble.com/users/1121009/screenshots/11030107/media/25be2b86a12dbfd8da02db4cfcbfe50a.jpg?resize=400x0' alt="No results"/>
     <p className='oops1'> Oops!!! </p>
     <p className='noFound1'> No Transaction History!!</p>
    </div>
    )
 }

  const successFunc = () => {
    const { arr } = obj;
    const p = arr.filter((i) => i.status === "COMPLETED" || i.status === "FAILED");

    return (

      <div>
      {p.length==0? noSearchResults():
      
        <div>
        <h3 className="h33"> Transaction History </h3>
      <div className="table-container">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {p.map((i) => (
              <Record key={i.id} item={i} />
            ))}
          </tbody>
        </table>
      </div>
      </div>
          }
      </div>
    );
  };

  const loaderFunc = () => {

    return (
    <div className='loading-container'>
            <Oval 
                height={80} 
                width={80} 
                color="blue" 
                ariaLabel="loading"
            />
    </div>
    )
  }

  const failureFunc = () => {
    return (
    <div className='failure-container'>
    <img src='https://res.cloudinary.com/djzenbn7g/image/upload/v1731671634/error_h2arej.png' alt="Error"/>
  <p className='oops1'> Oops!!! </p>
  <p className='noFound1'> Try Again Later!!</p>
</div>
    )
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  const switchFunc = () => {
    const { status } = obj;

    switch (status) {
      case statusObj.success:
        return successFunc();
      case statusObj.progress:
        return loaderFunc();
      case statusObj.failure:
        return failureFunc();
      default:
        return null;
    }
  };


  const backFunc=()=>{
    navi('/home')
  }

  return (

  <div>
    <button className="back-butt" onClick={backFunc}> &lt;back </button>
  <div className="transactionCon">{switchFunc()}</div>
  </div>
  )
};

export default Transaction_History;
