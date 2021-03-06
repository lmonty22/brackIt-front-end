import React from 'react'
import { Modal, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {deleteTournament} from '../redux/actions'

// if a user confirms delete, close the Modal, call deleteToruanemnt in action stack and pass through Tournament ID. 
const handleDelete = (close, deleteFunc, tournamentId) =>{
    close()
    deleteFunc(tournamentId)
}

const Delete = (props) => {
    return(
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
    <Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete this BrackIt?</Modal.Body>
    <Modal.Footer>
      <Button className='btn-light' onClick={props.handleClose}>
        Cancel
      </Button>
      <Button className='btn-dark' onClick={() => handleDelete(props.handleClose, props.delete,props.tournamentDelete)}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {delete: (tournamentID) => {dispatch(deleteTournament(tournamentID))}
    }
}

export default connect(null, mapDispatchToProps)(Delete)
