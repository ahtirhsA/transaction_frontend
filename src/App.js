import React,{useState} from 'react'
import {Routes,Route} from 'react-router-dom'
import Registration from './components/Registration'
import Login from './components/Login'
import OtpPage from './components/OtpPage'
import ResetPassword from './components/ResetPassword'
import TransactionContext from './context/TransactionContext'
import Transaction_History from './components/Transaction_History'
import HomePage from './components/HomePage'
import TForm from './components/TForm'
import Balance from './components/Balance'

const App=()=>{

   const [UserDetails,setUserDetails]=useState({userId:'',userName:''})

   const modDetails=(id,name)=>{
      setUserDetails({userId:id,userName:name})
   }

   return (


   <TransactionContext.Provider 
    value={{
      UserDetails,
      modDetails
    }}
   >
   <Routes>
      <Route path='/' element={<Registration/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/otpVerification' element={<OtpPage/>}/>
      <Route path='/reset-password' element={<ResetPassword/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/tform/:id' element={<TForm/>}/>
      <Route path='/thistory' element={<Transaction_History/>}/>
      <Route path='/balance' element={<Balance/>}/>
    </Routes>
    </TransactionContext.Provider>
   )
}

export default App 