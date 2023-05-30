import { Fragment } from "react";
import ActivityCard from "../components/ActivityCard";

const ActivityList = ({activities}) => {
  return (
    <>
    <div className="card_scrollable">
    <div id="activity-list">
    {activities && activities.map((value)=>{
            return(
                <Fragment key={value._id}>
                    <ActivityCard data={value}/>
                </Fragment>
            )
        })}
    </div>
    </div>
    </>
  )
}

export default ActivityList