import React from 'react'
import Button from "react-bootstrap/Button";
import EditActivityForm from './EditActivityForm';
import { useState } from 'react';

const EditButton = ({data}) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [newEditData, setEditNewData] = useState({
        activityType: "",
        description: "",
        duration: "",
        date: "",
        image:"",
      });
    
      const handleEditFormChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let newEditFormData = { ...newEditData };
        newEditFormData[name] = value;
        setEditNewData(newEditFormData);
      };
      //Test: data is successfully populating
    //   console.log(newEditData)

    // 2) onClick handler for the Edit button 
  const handeleEditclick=(e,editedData)=>{
    e.preventDefault()
  
  //   const formValues={
  //     id: editedData.id,
  //     activityType: editedData.activityType,
  //     description: editedData.description,
  //     duration: editedData.duration,
  //     date: editedData.date,
  //     image:editedData.image
  //   }
  //   setEditNewData(formValues)

      const formValues2={
      activityType: data.activityType,
      description: data.description,
      duration: data.duration,
      date: data.date,
      image:data.image
    }
    setEditNewData(formValues2)
  //   console.log(formValues2)
   }
//    console.log(data)
  return (
   <>
   <Button
          variant="primary"
          style={{ width: "100%" }}
          onClick={(e) => {
            setModalShow(true);
            handeleEditclick(e)
          }}
          className="mb-1"
        >
          Edit
        </Button>
  
        {/* <button className="btn btn-primary text-light " style={{width:"50%"}}>Edit</button> */}
  
        <EditActivityForm
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={data}
          newEditData={newEditData}
          handleEditFormChange={handleEditFormChange}
        />
   </>
  )
}

export default EditButton