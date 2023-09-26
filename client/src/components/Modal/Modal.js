import React, { useState} from 'react';
import SocketIO from "socket.io-client"
const socket = SocketIO("http://localhost:3001", {transports: ['websocket']})

function Modal(props) {
    const [time, setTime] = useState(Date.now())

    const whiteList = ['text', 'email', 'password', 'checkbox']

    const onClickTest = (props) => {
        if (whiteList.includes(props.target.type)){
            socket.emit('targetObje', {
                islem: props.type,
                type: props.target.type,
                target_name: props.target.id,
                time: ((Date.now() - time) / 1000).toFixed(2) + ' Saniye'
            })
        }
    }


    return (
        <div>
            <button type="button" className="btn btn-primary mb-5 mt-4" data-bs-toggle="modal"  data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo">Open modal Table
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label" style={{color:'black'}}>Recipient:</label>
                                    <input type="text" onClick={onClickTest} className="form-control" id="recipient-name"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label" style={{color:'black'}}>Message:</label>
                                    <textarea className="form-control" onClick={onClickTest} id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;