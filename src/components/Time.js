import React, { useState } from 'react'


function Time({socket}) {
const [time, setTime] = useState();

socket.on('time', (timeString) => {
  setTime(timeString)
});
    
  return (
      <div>
          <h3>Your Damn Clock</h3>
          <p>{time}</p>
    </div>
  )
}

export default Time