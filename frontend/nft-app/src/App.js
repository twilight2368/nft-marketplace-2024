import "./App.css";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome";
import Notfound from "./pages/Notfound";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import Register from "./pages/register/Register";
import MarketplaceNFT from "./pages/marketNFT/MarketplaceNFT";

function App() {
  return (
    <div className="App dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<Register />} />
          <Route path="marketplace" element={<MarketplaceNFT />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
