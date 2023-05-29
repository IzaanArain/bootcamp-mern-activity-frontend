import { useEffect, useState, Fragment } from "react";
// import ActivityCard from "../components/ActivityCard";
import ActivityList from "../components/ActivityList";
import ActivityForm from "../components/ActivityForm";
import { UseActivityContext } from "../hooks/useActivityContext";
import { UseAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  // const [activities, setActivities] = useState(null);
  const {activities,dispatch,url}=UseActivityContext()
  const{user}=UseAuthContext()

  useEffect(() => {
    const FetchActivites = async () => {
      try {
        const response = await fetch(url,{
          headers:{
            "Authorization":`Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const fetchData = await response.json();
          //   console.log(fetchData);
          // setActivities(fetchData);
          dispatch({type:"SET_ACTIVITIES",payload:fetchData})
        } else {
          throw new Error(`Api call failed with ${response.status}`);
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          setError(`something went wrong ${error.message}`);
        } else {
          setError(`An error occured, ${error.message}`);
        }
      }
    };
    if(user){
      FetchActivites();
    }
  }, [dispatch,user]);

  //   console.log(activities)
  return (
    <>
      <div className="home">
        <div className="container-fluid">
            <div className="row mt-4">
            <div className="col-lg-3">
                    <ActivityForm url={url}/>
                </div>
                <div className="col-lg-9 ">
                <ActivityList activities={activities} />
                </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Home;
