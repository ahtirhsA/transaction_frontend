import React, { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import './ResetPassword.css';

const ResetPassword = () => {

  const Location=useLocation()
  const mail1=Location.state

   const navigate=useNavigate()

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [err,setErr]=useState('')

    const handleSubmit=async (e)=>{
       e.preventDefault()

       const body={
        email:mail1,
        createNewPassword:newPassword,
        confirmNewPassword:confirmPassword
       }

       const options={
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(body)
       }

       const response=await fetch('https://transaction-backend-qpm8.onrender.com/updatePassword',options)
       const jsondata=await response.json()

       if (response.ok){

           setErr('')
          //  navigate to login page 
          navigate('/login')

       }
       else{
        setErr(jsondata.message)
       }

    }

    
    return (
        <div className="final-reset-con">
        <div className="reset-password-container">
            <h3 className="h3">Reset Password</h3>
            <form onSubmit={handleSubmit} className="reset-password-form">
                <div className="reset-inp-label-con">
                    <label htmlFor="newPassword" className="reset-label">Create New Password*</label>
                    <input
                        type="password"
                        id="newPassword"
                        className="reset-inp"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                    />
                </div>

                <div className="reset-inp-label-con">
                    <label htmlFor="confirmnewPassword" className="reset-label">Confirm New Password*</label>
                    <input
                        type="password"
                        id="confirmnewPassword"
                        value={confirmPassword}
                        className="reset-inp"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                    />
                </div>
               
               <div className="reset-butt-con">
                  <button type="submit" className="submit-button">Reset Password</button>
                </div>
                <p className="errr-para"> {err.trim()!==''?err:''}</p>

            </form>
        </div>
        </div>
    );
};

export default ResetPassword;
