import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome";
import Notfound from "./pages/Notfound";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import Register from "./pages/register/Register";
import MarketplaceNFT from "./pages/marketNFT/MarketplaceNFT";
import CollectionsPage from "./pages/collections/CollectionsPage";
import Minting from "./pages/minting/Minting";
import NFTdetails from "./pages/nft/NFTdetails";
import DashBoard from "./pages/dashboard/DashBoard";
import UserInfor from "./pages/user/UserInfor";

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
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="minting" element={<Minting />} />
          <Route path="nft/:id/" element={<NFTdetails />}/>
          <Route path="dashboard" element={<DashBoard/>} />
          <Route path="account" element={<UserInfor/>} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Routes></Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
