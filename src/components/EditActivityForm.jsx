import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Form from "react-bootstrap/Form";
import { UseActivityContext } from "../hooks/useActivityContext";
import { UseAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
const EditActivityForm = (props) => {
  const { data, newEditData, handleEditFormChange } = props;
  const { dispatch, url } = UseActivityContext();
  const {user}=UseAuthContext()
  // console.log(newEditData)
  // console.log(data._id)

//min Date
  const getFormattedDate=()=>{
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  //max date
  function getFormattedMaxDate() {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 6);
    const year = maxDate.getFullYear();
    let month = maxDate.getMonth() + 1;
    let day = maxDate.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (day < 10) {
      day = '0' + day;
    }

    return `${year}-${month}-${day}`;
  }

  const [currentDate, setCurrentDate] = useState(getFormattedDate());
  const [maxDate, setMaxDate] = useState(getFormattedMaxDate());

  const handleEditFormSubmit = async () => {
    if(!user){
      return
    }
    try {
      const response = await fetch(url + data._id, {
        method: "PUT",
        body: JSON.stringify(newEditData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${user.token}`,
        },
      });
      const newResData = await response.json();
      if (response.ok) {
        console.log(`new activity updated`, newResData);
        dispatch({
          type: "UPDATE_ACTIVITY",
          payload: { id: _id, updatedData: newEditData },
        });
      } else {
        throw new Error(`Api call failed with ${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2>Edit Form :</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "azure" }}>
          <Form onSubmit={handleEditFormSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <Form.Group className="mb-3 fs-4">
                  <Form.Label htmlFor="activity">Activity Type :</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    name="activityType"
                    id="activity"
                    value={newEditData.activityType}
                    onChange={handleEditFormChange}
                    required
                  >
                    <option disabled hidden>
                      Open this select menu
                    </option>
                    <option value="Bicycles">Bicycle</option>
                    <option value="Swimming">Swimming</option>
                    <option value="Boxing">Boxing</option>
                    <option value="Running">Running</option>
                    <option value="Weight Lifting">Weight Lifting</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-lg">
                <Form.Group className="mb-1 fs-5">
                  <Form.Label htmlFor="image">Image :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter image link"
                    name="image"
                    id="image"
                    autoComplete="off"
                    value={newEditData.image}
                    onChange={handleEditFormChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <Form.Group className="mb-3 fs-4">
                  <Form.Label htmlFor="date">Date :</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date"
                    name="date"
                    id="date"
                    max={maxDate}
                    min={currentDate}
                    autoComplete="off"
                    value={newEditData.date}
                    onChange={handleEditFormChange}
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6">
                <Form.Group className="mb-3 fs-4">
                  <Form.Label htmlFor="duration">duration :</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Duration"
                    name="duration"
                    id="duration"
                    autoComplete="off"
                    max="24"
                    min="1"
                    step="0.01"
                    value={newEditData.duration}
                    onChange={handleEditFormChange}
                    required
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-lg">
                <Form.Group className="mb-3 fs-4">
                  <Form.Label htmlFor="description">Description :</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    id="description"
                    maxlength="100"
                    value={newEditData.description}
                    onChange={handleEditFormChange}
                  />
                </Form.Group>
              </div>
            </div>

            <Button variant="primary" type="submit" onClick={props.onHide}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditActivityForm;
