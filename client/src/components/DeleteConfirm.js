import React from 'react'
import { Modal,Form } from 'react-bootstrap';
function DeleteConfirm({show,handleClose,setShow,handleDelete}) {
  return (
    <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
        
        </Modal.Header>
        <Modal.Body > 
            <div className='delete-confirm-container'>
              <p>Are you sure you want to delete this post?</p>
              <div className='delele-confirm'>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={()=>setShow(false)}>Cancel</button>
              </div>
          </div></Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
  )
}

export default DeleteConfirm