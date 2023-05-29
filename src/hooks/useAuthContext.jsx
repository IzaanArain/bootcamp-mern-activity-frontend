import { AuthContext } from "../context/Context";
import { useContext } from "react";

export const UseAuthContext=()=>{
    const context=useContext(AuthContext)
    if(!context){
        throw Error("useAuthContext must be used inside ontextProvider")
    }
    return context
}