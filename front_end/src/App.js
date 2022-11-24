import ChatContainer from "./container/ChatContainer";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatContainer />} />
    </Routes>
  );
}

export default App;
