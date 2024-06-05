import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import { motion } from "framer-motion";
import MarketFilter from "../../components/filter/MarketFilter";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
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
