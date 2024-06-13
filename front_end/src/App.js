import ChatContainer from "./container/ChatContainer";
import HomeContainer from "./container/HomeContainer";
import { Routes, Route,Navigate } from "react-router-dom";

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
