import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

const Home=({navigate})=>{
   
    const [input, setInput] = useState('');

    return (
      <div>
        <h2>Login Page</h2>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={()=>navigate(input)}>Login</button>
      </div>
    );
}

export default Home;