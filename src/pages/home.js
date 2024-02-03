import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./home.css"

const Home = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data')  // Update with your Flask API endpoint
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (<div>
    <div className='card'>
      <div className='input'>
        <p>Customer Info</p>
        <input type="text" className="login-input" placeholder="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type='text' className="login-input" placeholder="Phone no" id="phoneno" value={phoneno} onChange={(e) => setPhoneno(e.target.value)} />
        <input type="number" className="login-input" placeholder="Quantity" min={1} id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button className='addBtn'>
          <span>
            Add Order
          </span>
        </button>
      </div>
    </div>
    <div>
      <h1>Data from Flask API:</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  </div>);
}

export default Home;
