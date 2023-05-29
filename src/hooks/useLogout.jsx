import { UseAuthContext } from "./useAuthContext";
import { UseActivityContext } from "./useActivityContext";

export const useLogout = () => {
  const { dispatch } = UseAuthContext();
  const { dispatch:activityDispatch } = UseActivityContext();

  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user");

    //dispatch logout action to remove user from the global state
    dispatch({ type: "LOGOUT" });
    activityDispatch({type:"SET_ACTIVITIES",payload:null})
  };
  return {logout}
};

