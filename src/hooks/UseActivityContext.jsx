import { Context } from "../context/Context";
import { useContext } from "react";

export const UseActivityContext=()=>{
    const context=useContext(Context)
    if(!context){
        throw Error("useActivityContext must be used inside ontextProvider")
    }
    return context
}