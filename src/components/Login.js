import React,{useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import TransactionContext from "../context/TransactionContext";
import './Login.css'



const Login=()=>{

    const {modDetails}=useContext(TransactionContext)

    const navigate=useNavigate()

    const [mail,setMail]=useState('')
    const [pswrd,setPswrd]=useState('')
    const [err,setErr]=useState('')



    const mailFunc=(e)=>{
        setMail(e.target.value)
    }

    const pswrdFunc=(e)=>{
        setPswrd(e.target.value)
    }

    const loginFunc=async (e)=>{
        e.preventDefault()

        if(mail.trim()===''|| pswrd.trim()===''){
            setErr('* fields are required')
        }

        const bdy={
            email:mail,
            password:pswrd
        }
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(bdy)
        }
        const response=await fetch('https://transaction-backend-qpm8.onrender.com/login',options)

        const jsondata=await response.json()

        const existTkn=Cookies.get(jsondata.idn)

        if (response.ok){
            setErr('')

            if (existTkn){
               navigate('/home')  
            }
            
            modDetails(jsondata.idn,jsondata.name)
            Cookies.set(jsondata.idn,jsondata.jwtToken)
            navigate('/home')
            //Add navigation
            //Add details to context
        }
        else{
            setErr(jsondata.message)
        }
    }

    const forgetFunc=async(e)=>{

        e.preventDefault()

        const body={
            email:mail
        }

        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(body)
        }

        const response=await fetch('https://transaction-backend-qpm8.onrender.com/forgot-password',options)
        const jsdata=await response.json()

        if (response.ok){
            setErr('')
            //Add navigation to otp page 
            navigate('/otpVerification',{state:mail})
        }
        else{
            setErr(jsdata.message)
        }
    }

    const backFunc=()=>{
        navigate('/')
    }


     return(
        <div>
        <button className="back-butt" onClick={backFunc}> &lt;back </button>
        <div className="final-reg-con">
        <div className="login_container">
            <h3 className="login-main-head"> Login </h3>
            <form className="reg-form" onSubmit={loginFunc}>
                

                <div className="lg-inp-label-con">
                    <label htmlFor="email"  className="lg-label"> email* </label>
                    <br/>
                    <input type="email" placeholder="Enter your email" id="email" className="lg-inp" value={mail} onChange={mailFunc}/>
                </div>

                <div className="lg-inp-label-con">
                    <label htmlFor="Password"  className="lg-label"> Password* </label>
                    <br/>
                    <input type="password" placeholder="Enter your password" id="Password" className="lg-inp" value={pswrd} onChange={pswrdFunc}/>
                </div>

                <div className="lg-button-con">
                    <button className="lg-button" type="submit"> Submit </button>
                    <button className="forgot-password" onClick={forgetFunc}> Forgot Password?</button>
                </div>

                <p className="lg-err-para"> {err.trim()!==''?err:''}</p>
            </form>
        </div>
        </div> 
        </div>
     )
}

export default Login 