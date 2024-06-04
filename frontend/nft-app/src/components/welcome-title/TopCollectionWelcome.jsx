import React from 'react'
import CollectionWelcome from '../collections/CollectionWelcome';
import { Button } from '@nextui-org/react';
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function TopCollectionWelcome() {
  return (
    <div className="mb-24">
      <div className=" w-full pl-20 text-4xl font-bold mb-14">
        <h2>🌈Explore best combos</h2>
      </div>
      <div className="px-60 grid grid-cols-2 grid-rows-2 gap-x-20 gap-y-10 mb-16">
        <CollectionWelcome />
        <CollectionWelcome />
        <CollectionWelcome />
        <CollectionWelcome />
      </div>
      <div className="w-full text-center">
        <Button variant="bordered" color="warning">
          <div>Explore all collections</div>
          <div>
            <ArrowRightIcon className="h-3 w-3 " />
          </div>
        </Button>
      </div>
    </div>
  );
}
