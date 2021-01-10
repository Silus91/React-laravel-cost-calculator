import React, { useEffect } from 'react';
import M from "materialize-css";
import { Button } from './Button';


const DeleteModal =({...props}) => {

  useEffect(() => {
    M.AutoInit();
  }, []);

    return (
      <div>
        <a
          className='btn red darken-1 modal-trigger'
          data-target={props.name}
        >
          X
        </a>
        <div id={props.name} className='modal'>
          <div className="modal-content">
            <h4>Delete {props.content} {props.name}</h4>
            <h6>Do you really want to Delete {props.name}?</h6>
            <div className='modal-footer'>
              <Button className='modal-close waves-effect waves-green btn-flat' text="Cancel"/>
              <button className='btn red darken-1' onClick={props.onClick}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
}

export default DeleteModal;
