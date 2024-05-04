import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Home from '../component/Home';
const HomeContainer=()=>{
  const location = useLocation();
  const navigate=useNavigate();

  const EnterChat = (name) => {
    navigate(`/chat?name=${name}`);
  };
  return(
    <div>home</div>
  )
  /*return (
      <Home
      navigate={EnterChat}
       />
  );
  */
}

export default HomeContainer;