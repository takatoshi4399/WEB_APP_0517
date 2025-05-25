import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  console.log(message);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Flask Blueprint APIからのメッセージ</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;