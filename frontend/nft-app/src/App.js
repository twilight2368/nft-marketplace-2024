import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome";
import Notfound from "./pages/Notfound";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import Register from "./pages/register/Register";
import MarketplaceNFT from "./pages/marketNFT/MarketplaceNFT";
import Minting from "./pages/minting/Minting";
import NFTdetails from "./pages/nft/NFTdetails";
import DashBoard from "./pages/dashboard/DashBoard";
import UserInfor from "./pages/user/UserInfor";
import { LoginProvider } from "./context/LoginProvider";
import PaymentProcess from "./pages/payments/PaymentProcess";


function App() {
  return (
    <div className="App dark">
      <BrowserRouter>
        <LoginProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<Register />} />
            <Route path="marketplace" element={<MarketplaceNFT />} />
            <Route path="minting" element={<Minting />} />
            <Route path="nft/:id" element={<NFTdetails />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="account" element={<UserInfor />} />
            <Route path="payment" element={<PaymentProcess/>} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </LoginProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
