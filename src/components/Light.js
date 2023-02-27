import React, { useEffect,useState } from 'react'
import axios from 'axios';
import LightOn from '../images/bulb-on.png';
import LightOff from '../images/bulb-off.png';
import './light.css';

let lightStatus = false;


function Light({ socket }) {
  
    const [type, setType] = useState();
    const [value, setValue] = useState();
    const [createdAt, setCreateAt] = useState();
    const [clock, setClock] = useState();



const setEvents = (type, condition, created) => {
     
    setType(type);
    setValue(condition);
    setCreateAt(created);


    let localTime = new Date(created).toLocaleTimeString();

    setClock(localTime);

    const lightButton = document.getElementById("lightButton");

    
    if (condition === 'on') {
        lightStatus = true;
        lightButton.checked = true;
        
    } else if(condition === 'off'){
        lightStatus = false;
        lightButton.checked = false;
    }

};


    const changeStatus = async () => {
    console.log("lightStatus",lightStatus)
    console.log('changeStatus() called');
    if (!lightStatus) {
        console.log('Light ON');
        socket.emit('client_light', JSON.parse('{"type":"light","serialnumber":"122334","condition":"on"}'));
    }else if(lightStatus){
        console.log('Light OFF');
        socket.emit('client_light', JSON.parse('{"type":"light","serialnumber":"122334","condition":"off"}'));
    }
}


    socket.on("client_light", (condition) => {
        let data = JSON.parse(condition);

        let type = data.type
        let value = data.condition
        let createdAt = data.createdAt
        setEvents(type, value, createdAt);
    });

    const handleData = async (events) => {
        events.forEach(event => {

            let type = event.type;
            let value = event.condition;
            let createdAt = event.createdAt;


            setEvents(type, value, createdAt);
        });
    };


    useEffect(() => {
        axios.get('http://localhost:3008/events')
            .then(response => {
                // access parsed JSON response data using response.data field
                let events = response.data;

                handleData(events);
            })
            .catch(error => {
                if (error.response) {
                    //get HTTP error code
                    console.log(error.reponse.status)
                } else {
                    console.log(error.message)
                }
            })
    }, []);
  return (
      <div>
          <div className='light'>
              <h3>Kitchen Light</h3>
              <img alt="lght" src={value === "on" ? LightOn : LightOff}></img>
              <p>Light is {value}</p>
              <label className="switch">
             <input onClick={changeStatus} id="lightButton" type="checkbox"/>
               <span className="slider round"></span>
              </label>
              
              <div>
                  <p>Last Time Updated At : {clock}</p>
              </div>
          </div>
    </div>
  )
}

export default Light