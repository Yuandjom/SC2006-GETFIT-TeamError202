import React from 'react';
import "./Popup.css";

const Modal = props => {

    if (!props.show) {
        return null;
    }

    return (
        <div className="modal" onClick={props.onClose}>
            <div onClick={e => e.stopPropagation()}className="modal-content flex justify-between">
                <div className="modal-body">
                    {props.name} added!
                </div>
                <div className="modal-footer">
                    <button onClick={props.onClose} className="rounded-lg bg-gray-200 px-3 py-1"> Close </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;

