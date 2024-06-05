import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import CollectionDisplay from "../../components/collections/CollectionDisplay";

export default function CollectionsPage() {
  return (
    <div>
      <Navbar>
        <CollectionDisplay />
      </Navbar>
      <MainFooter />
    </div>
  );
}
