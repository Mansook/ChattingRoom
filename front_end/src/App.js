import ChatContainer from "./container/ChatContainer";
import ApiTest from "./container/ApiTest";
import HomeContainer from "./container/HomeContainer";
import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
function App() {
  return (
    <Routes>
      <Route path="/test" element={<ApiTest/>}/>
      <Route path="/" element={<ChatContainer />} />
      <Route path="/home" element={<HomeContainer/>}/>
    </Routes>
  );
}

export default App;
