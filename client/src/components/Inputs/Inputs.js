import React, {useEffect, useState} from 'react';
import SocketIO from "socket.io-client"
import Modal from "../Modal/Modal";
import axios from 'axios'

const socket = SocketIO("http://localhost:3001", {transports: ['websocket']})


function Inputs(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [time, setTime] = useState(Date.now())
    const [autoRender,setAutoRender]=useState(false)
    const [name,setName] = useState(0);

    useEffect(() => {
        setName(Date.now())
    }, [])

    const sendSubmit = () => {
        socket.emit('sendData', {
            name: 'Submit Button',
            email,
            password,
            gonderilmeTime: ((Date.now() - time) / 1000).toFixed(2) + ' saniye',
            // yerelSaat:(Date.now()).toTimeString()
        })
    }
    const modalOpen=(e)=>{
        e.preventDefault()
        // const a =document.getElementById('modalOpenDiv')
        // console.log('modal ac',a.innerHTML=)
        setAutoRender(true)
    }

    const whiteList = ['text', 'email', 'password', 'checkbox']


    const onClickTest = (props) => {
        if (whiteList.includes(props.target.type)){
            socket.emit('targetObje', {
                name:name,
                islem: props.type,
                type: props.target.type,
                target_name: props.target.id,
                time: ((Date.now() - time) / 1000).toFixed(2) + ' Saniye'
            })
        }

        // socket.emit('targetObje', {
        //     islem: props.type,
        //     type: props.target.type,
        //     target_name: props.target.id,
        //     time: ((Date.now() - time) / 1000).toFixed(2) + ' Saniye'
        // })


        // console.log('test',props)
        // console.log('islem',props.type)
        // console.log('type',props.target.type)
        // console.log('target Name',props.target.id)
    }

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" onClick={onClickTest} onChange={event => setEmail(event.target.value)}
                           className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">test1</label>
                    <input type="email" onClick={onClickTest} className="form-control" id="exampleInputEmail2"
                           aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">test2</label>
                    <input type="text" onClick={onClickTest} className="form-control" id="exampleInputEmail3"
                           aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" onClick={onClickTest} onChange={event => setPassword(event.target.value)}
                           className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="checkbox" onClick={onClickTest} onChange={event => setPassword(event.target.value)}
                           className="form-control" id="exampleInputPassword5"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="color" onClick={onClickTest} onChange={event => setPassword(event.target.value)}
                           className="form-control" id="exampleInputPassword6"/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="button" className="btn btn-secondary mb-3" onClick={modalOpen}>
                    Open Modal
                    {autoRender===true?<Modal/>:''}
                </button>
                {/*<Modal/>*/}
                <div id={'modalOpenDiv'}>

                </div>

                <button type="submit" onClick={sendSubmit} className="btn btn-primary">Submit</button>

            </form>
        </div>
    );
}

export default Inputs;