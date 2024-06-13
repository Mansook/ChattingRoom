import ChatContainer from "./container/ChatContainer";
import ApiTest from "./container/ApiTest";
import HomeContainer from "./container/HomeContainer";
import { Routes, Route,Navigate } from "react-router-dom";
import styled from 'styled-components';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/chat" element={<ChatContainer />} />
        <Route path="/home" element={<HomeContainer/>}/>
      </Routes>
  );
}

export default App;
