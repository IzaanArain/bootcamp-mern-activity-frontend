import { createContext, useReducer } from "react";
import { AuthContext } from "./Context";
import { useEffect } from "react";

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  console.log("AUthContext state: ", state);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
        dispatch({type:"LOGIN",payload:user})
    }
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
