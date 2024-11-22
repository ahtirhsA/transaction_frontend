import React,{useState,useContext} from "react";
import { useNavigate,useParams} from "react-router-dom";
import TransactionContext from "../context/TransactionContext";
import Cookies from 'js-cookie'
import './TForm.css';

const TForm = () => {

 const navg=useNavigate()

 const {UserDetails}=useContext(TransactionContext)
 const {userId}=UserDetails

 const tknn=Cookies.get(userId)

 const {id}=useParams()

 console.log(id)

  const [amount,setAmount]=useState('')
  const [type,setType]=useState('')

  const [sts,setSts]=useState('')

  

  const [errMsg,setErrMsg]=useState('')


  const createTransactionFunc=async (e)=>{

    e.preventDefault()


    if(amount.trim()===''||type.trim()===''){
        setErrMsg('* fields are required')
    }

    const body={
        amount,
        transaction_type:type,
        user:userId
    }

    const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${tknn}`
        },
        body:JSON.stringify(body)
    }

    const response=await fetch('https://transaction-backend-qpm8.onrender.com/createTransaction',options)
    const jsonData=await response.json()

    console.log(jsonData.message)

    if (response.ok){
        setErrMsg('')
        navg('/home')

    }
    else{
        setErrMsg(jsonData.message)
    }



  }



 const addFunc=()=>{
   return (

      <div className="form-container">
        <h2 className="form-title">Transaction Form</h2>
        <form onSubmit={createTransactionFunc}>
            <div className="form-field">
                <label htmlFor="amount" className="label-text">*Amount:</label>
                <input type="number" id="amount" name="amount" className="input-field" step="0.01" min="0" placeholder="Enter amount" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
            </div>
            <div className="form-field">
                <label htmlFor="transaction_type" className="label-text">*Transaction Type:</label>
                <select id="transaction_type" className="select-field" value={type} onChange={(e)=>setType(e.target.value)}>
                    <option value="" selected>Select the transaction type</option>
                    <option value="DEPOSIT">DEPOSIT</option>
                    <option value="WITHDRAWAL">WITHDRAWAL</option>
                </select>
            </div>

            <div className="sub-button-con">
             <button type="submit" className="sub-button">Submit</button> 
             </div> 
             <p className="err-msg"> {errMsg.trim()!==''?errMsg:''}</p>
        </form>
      </div>
   )
}


const updateStatusFunc=async (e)=>{
    e.preventDefault()


    if (sts.trim()===''){
        setErrMsg('status is required')
    }

    const bdy={
        status:sts
    }

    const options={
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${tknn}`
        },
        body:JSON.stringify(bdy)
    }

    const response=await fetch(`https://transaction-backend-qpm8.onrender.com/updateTrans/${userId}`,options)
    const jsondata=await response.json()

    console.log(jsondata.message)

    if (response.ok){
        setErrMsg('')
        navg('/home')
    }
    else{
        setErrMsg(jsondata.message)
    }

}

const updFunc=()=>{

    return (

        <div className="form-container">

          <h2 className="form-title">Transaction Update Form</h2>

          <form onSubmit={updateStatusFunc}>
              
              <div className="form-field">
                  <label htmlFor="status_type" className="label-text">*Status:</label>
                  <select id="status_type" className="select-field" value={sts} onChange={(e)=>setSts(e.target.value)}>
                      <option value=""  disabled>Select the Status </option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="FAILED">FAILED</option>
                  </select>
              </div>
  
              <div className="sub-button-con">
               <button type="submit" className="sub-button">Update</button> 
               </div> 
               <p className="err-msg"> {errMsg.trim()!==''?errMsg:''}</p>
          </form>
        </div>
     )
}


return(
    <div>
      {id==1?addFunc():updFunc()}
    </div>
)


}

export default TForm;
