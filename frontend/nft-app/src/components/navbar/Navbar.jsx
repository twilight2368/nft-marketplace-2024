import React from "react";
import Logotext from "../logo/Logotext";
import { Input, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const listOfLink = [
  {
    label: "Home",
    route: "home",
  },
  {
    label: "Marketplace",
    route: "marketplace",
  },
  { label: "Collections", route: "collections" },
  {
    label: "Restaurant",
    route: "restaurant",
  },
];

export default function Navbar(props) {
  const navigate = useNavigate();
  return (
    <div className=" min-h-screen w-full ">
      <div className=" bg-black/80 backdrop-blur-sm w-full h-20 px-6 flex flex-row items-center gap-3 fixed z-50">
        <div className=" text-white/0 text-3xl poetsen-one-regular  mr-10 pl-5">
          <Logotext />
        </div>
        <div className=" flex flex-row justify-center w-1/2 items-center gap-20">
          {listOfLink.map((e) => {
            return (
              <>
                <div>
                  <Link
                    to={"/" + e.route}
                    className=" hover:text-blue-500 nunito"
                  >
                    {e.label}
                  </Link>
                </div>
              </>
            );
          })}
        </div>
        <div className="dark mr-5 nunito">
          <Input
            color="primary"
            size="lg"
            variant="bordered"
            type="search"
            label="Search"
            labelPlacement="outside-left"
            placeholder="Type here..."
          />
        </div>
        <div className=" pl-16 ">
          <div className="w-full  grid grid-cols-2 gap-10 ">
            <div>
              <Button
                color="danger"
                variant="flat"
                size="lg"
                onClick={() => {
                  navigate("/register");
                }}
              >
                <span className=" text-lg nunito font-bold text-orange-500 ">
                  Sign up
                </span>
              </Button>
            </div>
            <div>
              <Button
                color="primary"
                variant="shadow"
                size="lg"
                className=" bg-black/0 border-2 border-blue-800"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <span className=" text-lg nunito font-bold text-purple-600 ">
                  Log in
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-20">{props.children}</div>
    </div>
  );
}
