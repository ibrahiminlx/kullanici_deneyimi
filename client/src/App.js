import './App.css';
import Inputs from "./components/Inputs/Inputs";
import React from 'react'
// import SocketIO from "socket.io-client"
// const socket = SocketIO("http://localhost:3001",{transports:['websocket']})
function App() {

  return (
    <div className="App">
      <Inputs/>
    </div>
  );
}

export default App;
