import { useState } from "react";
import { UseAuthContext } from "./useAuthContext";

export const useSignUp=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(null)
    const {dispatch}=UseAuthContext()

    const signup=async(fname,lname,email,password)=>{
        setIsLoading(true)
        setError(null)
        const response=await fetch('http://localhost:5000/api/users/register',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({email,password,fname,lname})
        })
        const ResData=await response.json()

        if(!response.ok){
            setIsLoading(false)
            setError(ResData.error)
        }
        if(response.ok){
            //save the user to local storage
            localStorage.setItem('user',JSON.stringify(ResData))

            //update the auth context
            dispatch({type:"LOGIN",payload:ResData})
            setIsLoading(false)
        }
    }
    return {signup,isLoading,error}
}