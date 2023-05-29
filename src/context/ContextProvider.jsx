import { useReducer } from "react";
import {Context} from "./Context";

export const activityReducer = (state, action) => {
  switch (action.type) {
    case "SET_ACTIVITIES":
      return {
        activities: action.payload,
      };
    case "CREATE_ACTIVITY":
      // console.log(state.activities)
      return {
        activities: [action.payload, ...state.activities],
      };
    case "DELETE_ACTIVITY":
      return {
        activities: state.activities.filter(
          (value) => value._id !== action.payload._id
        ),
      };
    case "UPDATE_ACTIVITY":
      const updatedActivities = state.activities.map((activity) => {
        if (activity._id === action.payload._id) {
          return { ...activity, ...action.payload.updatedData };
        }
        return activity;
      });
      return {
        activities: updatedActivities,
      };
    default:
      return state;
  }
};
const ContextProvider = ({ children }) => {
  const url = "http://localhost:5000/api/activities/";
  const [state, dispatch] = useReducer(activityReducer, {
    activities: null,
  });
  //   console.log(state.activities)
  return (
    <>
      <Context.Provider value={{ ...state, dispatch, url }}>
        {children}
      </Context.Provider>
    </>
  );
};

export default ContextProvider;
