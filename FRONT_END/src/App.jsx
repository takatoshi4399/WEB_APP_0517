import React, { useEffect, useState } from 'react';
import { AnnotatedHeatmap, ClickablePlot, GlobalMap, FortuneTellingGame} from './cards';
import {globalMapData} from './data';


function App() {
  const [message, setMessage] = useState('');


  useEffect(() => {
    fetch('http://localhost:4000/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>こちらはデモのグラフです</h1>
      <p>{message}</p>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%', height: '100%'}}>
        <FortuneTellingGame />
      </div>
    </div>
    // <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%', height: '100%'}}>
    //     <FortuneTellingGame />
    // </div>
  );
}

export default App;