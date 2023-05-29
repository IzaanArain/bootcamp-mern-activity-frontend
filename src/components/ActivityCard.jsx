import React from 'react'
import { UseActivityContext } from '../hooks/useActivityContext';
import EditButton from './EditButton';
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { UseAuthContext } from '../hooks/useAuthContext';

const ActivityCard = ({data}) => {
    const {_id,activityType,description,duration,date,createdAt} = data;
    const {dispatch,url}=UseActivityContext()
    const {user}=UseAuthContext()

    const handleDeleteClick=async(id)=>{
      if(!user){
        return
      }
      try {
        const response = await fetch(url + id, {
          method: "DELETE",
          headers:{
            "Authorization":`Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const newResData = await response.json();
          dispatch({type:"DELETE_ACTIVITY",payload:newResData})
          console.log(newResData)
        } else {
          throw new Error(`Api call failed with ${response.status}`);
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  return (
    <>
    <div className="card mb-4 shadow font-monospace" id="myCard">
        <div className="card-body">
          {/* <h4><span className="text-danger fw-bold">id </span>: {_id}</h4>
          <hr /> */}
          <h4><span className="text-danger fw-bold">Name: </span>{user.fname} {user.lname}</h4>
          <hr />
          <h5 className="card-title"><span className="text-danger fw-bold">Acivity type</span> : {activityType}</h5>
          
          {/* <div className="card-text">
            <div className="row">

              <div className="col-lg-5">
                <ul className="list-group fw-bold">
                  <li style={{ color: "red" }} className="list-group-item list-group-item-action">
                    Name : {fname} {lname}
                  </li>
                  <li style={{ color: "purple" }} className="list-group-item list-group-item-action">
                    Age : {age}
                  </li>
                </ul>
              </div>

              <div className="col-lg-7">
                <ul className="list-group fw-bold">
                  <li style={{ color: "blue" }} className="list-group-item list-group-item-action">
                    Contact : {contact}
                  </li>
                  <li style={{ color: "purple" }} className="list-group-item list-group-item-action">
                    Email : {email}
                  </li>
                </ul>
              </div>
              
            </div>
          </div> */}

          <ul className="list-group my-3">
         <li className="list-group-item list-group-item-action">
         <h6 className="text-danger fw-bold">Description : </h6>
         <hr />
          <p className="card-text fw-bold fst-italic">{description}</p>
         </li>
          </ul>

          <ul className="list-group fw-bold">
            <li className="list-group-item list-group-item-action">
              <p className="card-text fs-6"><span className="text-danger">Duration</span> : {duration}</p>
            </li>
            <li className="list-group-item list-group-item-action">
              <p className="card-Text fs-6"><span className="text-danger">Date</span> : {date}</p>
            </li>
          </ul>

          <p className="card-Text fs-6">{formatDistanceToNow(new Date(createdAt),{addSuffix:true})}</p>
          
        </div>
        <div className="d-flex gap-4 justify-content-start mb-4 mx-4">
         <EditButton data={data}/>
          <button
            className="btn btn-danger"
            style={{ width: "100%" }}
            onClick={()=>handleDeleteClick(_id)}
          > 
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

export default ActivityCard