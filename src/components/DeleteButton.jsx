import DeleteModal from "./DeleteModal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React  from "react";
const DeleteButton=({data})=>{
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button variant="danger" 
        onClick={() => setModalShow(true)}
        style={{ width: "100%" }}>
         Delete
        </Button>
  
        <DeleteModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={data}
        />
      </>
    );
  }
  export default DeleteButton;