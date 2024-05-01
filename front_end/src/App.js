import ChatContainer from "./container/ChatContainer";
import ApiTest from "./container/ApiTest";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/test" element={<ApiTest/>}/>
      <Route path="/" element={<ChatContainer />} />
    </Routes>
  );
}

export default App;
