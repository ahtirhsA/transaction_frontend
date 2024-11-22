import React,{useState} from "react"
import { useNavigate } from "react-router-dom"
import './Registration.css'


const Registration=()=>{

    const navig=useNavigate()

   const [username,setUsername]=useState('')
   const [email,setEmail]=useState('')
   const [createPswrd,setCreatePswrd]=useState('')
   const [confirmPswrd,setConfirmPswrd]=useState('')



   const [msg,setMsg]=useState('')


   const usernameFunc=(e)=>{
        setUsername(e.target.value)
   }

   const emailFunc=(e)=>{
     setEmail(e.target.value)
   }

   const pswrd1Func=(e)=>{
    setCreatePswrd(e.target.value)
   }

   const pswrd2Func=(e)=>{
    setConfirmPswrd(e.target.value)
   }


   const userRegFunc=async (e)=>{
     e.preventDefault()

     

     const userBdy={
        username,
        email,
        createPassword:createPswrd,
        newPassword:confirmPswrd        
     }

     const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(userBdy)
     }


     const response=await fetch('https://transaction-backend-qpm8.onrender.com/register',options)

     const jsonData=await response.json()

     if (response.ok){
        setMsg('')
        alert(jsonData.message)
     }
     else{
        setMsg(jsonData.message)
     }


   }

  

  const loginPageFunc=()=>{
    navig('/login')
  }

    return (
        <div>
        <div className="lg-page-con">
        <button className="lg-page-button" onClick={loginPageFunc}> Login </button>
        </div> 
        <div className="final-reg-con">
        <div className="reg_container">
            <h3 className="reg-main-head"> Registration </h3>
            <form className="reg-form" onSubmit={userRegFunc}>
                <div className="reg-inp-label-con" >
                    <label htmlFor="name"  className="reg-label"> username* </label>
                    <br/>
                    <input type="text" placeholder="Enter your name" id="name" className="registration-inp" value={username} onChange={usernameFunc}/>
                </div>

                <div className="reg-inp-label-con">
                    <label htmlFor="email"  className="reg-label"> email* </label>
                    <br/>
                    <input type="email" placeholder="Enter your email" id="email" className="registration-inp" value={email} onChange={emailFunc}/>
                </div>

                <div className="reg-inp-label-con">
                    <label htmlFor="createPassword"  className="reg-label"> createPassword* </label>
                    <br/>
                    <input type="password" placeholder="Enter your password" id="createPassword" className="registration-inp" value={createPswrd} onChange={pswrd1Func}/>
                </div>

                <div className="reg-inp-label-con">
                    <label htmlFor="confirmPassword"  className="reg-label"> confirmPassword* </label>
                    <br/>
                    <input type="password" placeholder="Confirm your password" id="confirmPassword" className="registration-inp" value={confirmPswrd} onChange={pswrd2Func}/>
                </div>

                <div className="button-con">
                    <button className="reg-button" type="submit"> Register </button>
                </div>
                <p className="reg-err-para"> {msg.trim()!==''?msg:''}</p>

            </form>
        </div>
        </div>
        </div>
    )
}

export default Registration