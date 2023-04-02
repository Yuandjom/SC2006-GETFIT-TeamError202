import React from 'react';
import "./PopupFriend.css";

const Modal = props => {

    if (!props.show) {
        return null;
    }

    return (
        <div className="modalF" onClick={props.onClose}>
            <div onClick={e => e.stopPropagation()}className="modalF-content flex justify-between">
                <div className="modalF-body">
                    {props.friendOrNot? "Friend added": "Friend removed"}
                </div>
                <div className="modalF-footer">
                    <button onClick={props.onClose} className="rounded-lg bg-gray-200 px-3 py-1"> Close </button>
                </div>
            </div>
        </div>
    )
}

export default Modal;
