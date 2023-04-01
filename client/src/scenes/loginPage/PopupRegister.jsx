import React from 'react';
import "./PopupRegister.css";

const Modal = props => {

    if (!props.show) {
        return null;
    }

    return (
        <div className="modal1" onClick={props.onClose}>
            <div onClick={e => e.stopPropagation()}className="modal-content flex justify-between">
                <div className="modal1-body">
                    Existing Email! Try Again 
                </div>
                <div className="modal1-footer">
                    <button onClick={props.onClose} className="rounded-lg bg-gray-200 px-3 py-1"> Close </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;
