import React from 'react'
import LogoFooter from "../../assets/icons/logo1.png";
import Logotext from "../logo/Logotext";
export default function NorfoundFooter() {
  return (
    <div>
      <div className="w-full mt-20 absolute bottom-0">
        <footer class=" w-full">
          <div class="w-full max-w-screen-xl mx-auto p-4 py-8">
            <div class="sm:flex sm:items-center sm:justify-between">
              <a
                href="#"
                class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
              >
                <img src={LogoFooter} className="h-12" alt="Flowbite Logo" />
                <div className="font-black text-2xl text-white/0 poetsen-one-regular">
                  <Logotext />
                </div>
              </a>
              <ul class="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 ">
                <li>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline me-4 md:me-6">
                    Licensing
                  </a>
                </li>
                <li>
                  <a href="#" class="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <hr class="my-6 border-purple-600/30 sm:mx-auto lg:my-8" />
            <span class="block text-sm  sm:text-center ">
              © 2024{" "}
              <a href="#" class="hover:underline text-blue-500 ">
                FastFoodie™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
