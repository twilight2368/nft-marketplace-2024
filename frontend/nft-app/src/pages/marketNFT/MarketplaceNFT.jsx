import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import MarketplaceMenu from "../../components/menu/MarketplaceMenu";

export default function MarketplaceNFT() {
  return (
    <div>
      <Navbar>
        <MarketplaceMenu />
      </Navbar>
      <MainFooter />
    </div>
  );
}
