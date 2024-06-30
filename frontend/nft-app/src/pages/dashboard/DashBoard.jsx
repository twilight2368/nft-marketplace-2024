import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import { Tabs, Tab } from "@nextui-org/react";
export default function DashBoard() {
  return (
    <div>
      <Navbar>
        <div className=" pt-10 px-40">
          <div className="flex w-full flex-col">
            <Tabs aria-label="Options">
              <Tab key="MyNFTs" title="My NFTs">
                2
              </Tab>
              <Tab key="MintedNFTs" title="Minted NFTs">
                3
              </Tab>
            </Tabs>
          </div>
        </div>
      </Navbar>
      <MainFooter />
    </div>
  );
}
