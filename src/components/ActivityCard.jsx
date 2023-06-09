import { useState } from "react";
import { UseActivityContext } from "../hooks/useActivityContext";
import EditButton from "./EditButton";
//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { UseAuthContext } from "../hooks/useAuthContext";
import DeleteButton from "./DeleteButton";

const ActivityCard = ({ data }) => {
  const defaultImg =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
  const { _id, activityType, description, duration, date, createdAt, image } =
    data;
  const { dispatch, url } = UseActivityContext();
  const { user } = UseAuthContext();

  const handleDeleteClick = async (id) => {
    if (!user) {
      return;
    }
    try {
      const response = await fetch(url + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const newResData = await response.json();
        dispatch({ type: "DELETE_ACTIVITY", payload: newResData });
        // console.log(newResData);
      } else {
        throw new Error(`Api call failed with ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="card mb-4 shadow font-monospace" id="myCard">
        <img
          src={!image ? defaultImg : image}
          className="card-img-top"
          alt="my image"
          style={{ height: "18rem" }}
        />
        <div className="card-body">
          {/* <h4><span className="text-danger fw-bold">id </span>: {_id}</h4>
          <hr /> */}
          <h4>
            <span className="text-danger fw-bold">Name: </span>
            {user.fname} {user.lname}
          </h4>
          <hr />
          <h6 className="card-title">
            <span className="text-danger fw-bold">Activity type</span> :{" "}
            {activityType}
          </h6>

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
              <p className="card-text fs-6">
                <span className="text-danger">Duration</span> : {duration} hours
              </p>
            </li>
            <li className="list-group-item list-group-item-action">
              <p className="card-Text fs-6">
                <span className="text-danger">Date</span> : {date}
              </p>
            </li>
          </ul>

          <ul className="list-group fw-bold mt-3">
            <li className="list-group-item list-group-item-action">
              <p className=" card-text fs-6">
                {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </p>
              {/* <p className="card-Text fs-6">{createdAt}</p> */}
            </li>
          </ul>
        </div>
        <div className="card-footer d-flex gap-4 justify-content-start">
          <EditButton data={data} />
          {/* <button
            className="btn btn-danger"
            style={{ width: "100%" }}
            onClick={() => handleDeleteClick(_id)}
          >
            Delete
          </button> */}
          <DeleteButton data={data}/>
        </div>
      </div>
    </>
  );
};

export default ActivityCard;
