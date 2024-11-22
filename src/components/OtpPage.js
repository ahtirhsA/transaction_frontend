import React,{useState} from "react";
import { useNavigate,useLocation } from "react-router-dom";
import './OtpPage.css'


const OtpPage=()=>{

    const navigation=useNavigate()

    const location=useLocation()
    const nEmail=location.state


    const [otp,setOtp]=useState('')
    const [error,setError]=useState('')

    const otpFunc=(e)=>{
        setOtp(e.target.value)
    }

    const verifyOtpFunc=async ()=>{

        const bdy={
            email:nEmail,
            otp
        }

        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(bdy)
        }

        const response=await fetch('https://transaction-backend-qpm8.onrender.com/verify-otp',options)
        const jsnData=await response.json()

        if (response.ok){
            setError('')
            //Add navigation to reset-password page and send email while navigating
            navigation('/reset-password',{state:nEmail})

        }
        else{
            setError(jsnData.message)
        }

    }


    return (
        <div className="final-otp-con">
        <div className="otp-container">
            <h2 className="h2"> Enter the otp</h2>
            <input type="text" className="otp-input" maxLength="6" value={otp} onChange={otpFunc}/>
            <button className="otp-button" onClick={verifyOtpFunc}> verify </button>
            <p className="error-para"> {error.trim()!==''?error:''}</p>
        </div>
        </div>
    )
}

export default OtpPage