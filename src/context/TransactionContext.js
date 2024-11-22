import React from 'react'

const TransactionContext=React.createContext({
   
   UserDetails:{userId:'',userName:''},
   modDetails:()=>{}

})

export default TransactionContext