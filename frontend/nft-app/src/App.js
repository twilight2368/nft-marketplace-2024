import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
