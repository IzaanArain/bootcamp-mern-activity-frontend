import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UseAuthContext } from '../hooks/useAuthContext';
import { UseActivityContext } from '../hooks/useActivityContext';

function DeleteModal(props) {
    const {data}=props
    // console.log(data)
    const  {_id}=data
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
    props.onHide
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         <h1>Warning!!</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1>You are going to remove a activity</h1>
        {/* <button
            className="btn btn-danger"
            // style={{ width: "100%" }}
            onClick={() => handleDeleteClick(_id)}
          >
            Delete
          </button> */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <button
            className="btn btn-danger"
            // style={{ width: "100%" }}
            onClick={() => handleDeleteClick(_id)}
          >
            Delete
          </button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;