import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { UseActivityContext } from "../hooks/useActivityContext";
import { UseAuthContext } from "../hooks/useAuthContext";

const ActivityForm = ({url}) => {
  const [select, setSelect] = useState("");
  const [error,setError]=useState(null)
  const [newData, setNewData] = useState({
    activityType: "",
    description: "",
    duration: "",
    date: "",
    image:""
  });
  const {user}=UseAuthContext()
  
const {dispatch}=UseActivityContext()
//POST REQUEST
const postActivity = async (data) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 
        "Content-type": "application/json; charset=UTF-8" ,
        "Authorization":`Bearer ${user.token}`
      },
      });
      const newResData = await response.json();
      if (response.ok) {
        setError(null)
        dispatch({type:"CREATE_ACTIVITY",payload:newResData})
        console.log(`new activity added`,newResData)
      } else {
        setError(newResData.error)
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

  //*******Activity selection*********************//
  // console.log(select)
  const handleSelectChange = (e) => {
    setSelect(e.target.value);
  };

  //******Adding card from the form************//

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...newData };
    newFormData[name] = value;
    // setNewUser({ ...newData, [name]: value });
    setNewData(newFormData);
  };
  //Test: to see data has been populated into newData from addForm
//    console.log(newData)

  const clickFormHandler = (e) => {
    e.preventDefault();

    if(!user){
      setError("you must be logged in")
      return
    }
    const newDataWithSelect = {
      ...newData,
      activityType: select,
    };
    postActivity(newDataWithSelect)
    setNewData({
      activityType: "",
      description: " ",
      duration: "",
      date: "",
      image:""
    });
  };

  return (
    <>
    <div className="card mb-4" id="form_card">
      <div className="card-body">
        <h2 className="card-title">Form</h2>

        <Form onSubmit={clickFormHandler}>

        <div className="row">
            <div className="col-lg">
              <Form.Group className="mb-1 fs-5">
                <Form.Label htmlFor="activity">Activity Type :</Form.Label>

                <Form.Select
                  aria-label="Default select example"
                  name="activity"
                  id="activity"
                  required
                  value={select}
                  onChange={handleSelectChange}
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
          </div>

          <div className="row">
            <div className="col-lg">
              <Form.Group className="mb-1 fs-5">
                <Form.Label htmlFor="duration">duration :</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Duration"
                  name="duration"
                  id="duration"
                  autoComplete="off"
                  value={newData.duration}
                  onChange={handleFormChange}
                  max="24"
                  min="1"
                  required
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
          <div className="col-lg">
              <Form.Group className="mb-1 fs-5">
                <Form.Label htmlFor="date">Date :</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  name="date"
                  id="date"
                  autoComplete="off"
                  max="2023-06-31"
                  min="2023-04-31"
                  value={newData.date}
                  onChange={handleFormChange}
                //   required
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-lg">
              <Form.Group className="mb-1 fs-5">
                <Form.Label htmlFor="description">Description :</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  id="description"
                  maxlength="50"
                  value={newData.description}
                  onChange={handleFormChange}
                />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-lg">
              <Form.Group className="mb-1 fs-5">
                <Form.Label htmlFor="image">Image :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter image link"
                  name="image"
                  id="image"
                  autoComplete="off"
                  value={newData.image}
                  onChange={handleFormChange}
                />
              </Form.Group>
            </div>
          </div>
<div className="row">
    <div className="col">
    <Button variant="primary" type="submit" className="btn btn-primary mt-2" style={{width:"100%"}}>
            Submit
          </Button>
    </div>
</div>

          {/* <div className="row">
            <div className="col">
              <Form.Group className="mb-3 fs-4">
                <Form.Label htmlFor="search">Search :</Form.Label>
                <Form.Control
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Enter first Name"
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                />
              </Form.Group>
            </div>
          </div> */}
        </Form>
        {error && <div className="btn btn-outline-danger mt-2">{error}</div>}
      </div>
    </div>
    </>
  )
}

export default ActivityForm