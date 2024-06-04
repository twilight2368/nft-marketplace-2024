import React from "react";
import CollectionHome from "../collections/CollectionHome";

export default function CollectionDisplay() {
  return (
    <div>
      <div className=" min-h-96 mb-20 ">
        <h2 className="poetsen-one-regular text-3xl mb-10">👑 Collections</h2>
        <div className=" grid grid-cols-3  gap-10">
          <CollectionHome />
          <CollectionHome />
          <CollectionHome />
          <CollectionHome />
          <CollectionHome />
          <CollectionHome />
          <CollectionHome />
          <CollectionHome />
          <CollectionHome />
        </div>
      </div>
    </div>
  );
}
