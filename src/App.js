import React from 'react'
import Light from './components/Light';
import Time from './components/Time';

function App({ socket }) {

  return (
      <div>
          <Time socket={socket} />
          <Light socket={socket} />
      </div>
  )
}

export default App