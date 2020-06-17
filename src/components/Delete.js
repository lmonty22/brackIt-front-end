import React from 'react'
import { Modal, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {deleteTournament} from '../redux/actions'

const handleDelete = (close, func, tournamentId) =>{
    close()
    func(tournamentId)
}

const Delete = (props) => {
    return(
    <Modal show={props.show} onHide={props.handleClose} animation={false}>
    <Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete this BrackIt?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={() => handleDelete(props.handleClose, props.delete,props.tournamentDelete)}>
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
