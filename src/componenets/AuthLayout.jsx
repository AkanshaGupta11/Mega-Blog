//mechanism kis tarah se pages or routes ko protect kiya jaat a
import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
//ki child ko render krna ki nhi 

export default function Protected({children, authentication = true}){
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status)

    useEffect(()=>{
        //true && true 
        //ap authenticated ho hi nhi 

        // if(authStatus === true){
        //     navigate("/");
        // }
        // else if(authStatus == false){
        //     navigate("/home")
        // }

        if(authentication && authStatus !== authentication){
            navigate("/login")

        }
        //false  && 
        else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false);
    },[authStatus,navigate,authentication])

  return (
    loader ? <h1>Loading...</h1> : <>{children}</>
  )
}

