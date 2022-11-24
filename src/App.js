import logo from "./logo.svg";
import "./App.css";
import ChatContainer from "./container/ChatContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatContainer />} />
    </Routes>
  );
}

export default App;
