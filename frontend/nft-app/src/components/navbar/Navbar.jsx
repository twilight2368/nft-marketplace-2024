import React, { useState } from "react";
import Logotext from "../logo/Logotext";
import {
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
  Badge,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/solid";
import { useLoginContext } from "../../context/LoginProvider";

const listOfLink = [
  {
    label: "Home",
    route: "home",
  },
  {
    label: "Marketplace",
    route: "marketplace",
  },
  {
    label: "Contact",
    route: "contact",
  },
];

export default function Navbar(props) {
  const navigate = useNavigate();
  const { login, userID, username, accountname } = useLoginContext();
  const { setLogin, setUserID, setUsername, setAccountname } =
    useLoginContext();

  const logOut = async () => {
    fetch("http://localhost:8080/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("successfull logout");
        localStorage.removeItem("username");
        localStorage.removeItem("accountname");
        localStorage.removeItem("userid");
        setLogin(false);
        setUserID(null);
        setUsername(null);
        setAccountname(null);
        localStorage.setItem("login-marketplace-ffnft", "fasle");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className=" min-h-screen w-full ">
      <div className=" bg-black/80 backdrop-blur-sm w-full h-20 px-6 flex flex-row items-center gap-3 fixed z-50">
        <div className=" text-white/0 text-3xl poetsen-one-regular  mr-10 pl-5">
          <Logotext />
        </div>
        <div className=" flex flex-row justify-center w-1/3 items-center gap-20">
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
        <div className="dark mr-0 nunito p-0 pl-20">
          <Input
            color="primary"
            size="lg"
            variant="bordered"
            type="search"
            label="Search"
            fullWidth={true}
            labelPlacement="outside-left"
            placeholder="Type here..."
          />
        </div>
        <div className=" pl-40 ">
          {login ? (
            <>
              <div className=" pl-0 flex flex-row gap-10 ">
                <Popover className="dark">
                  <Badge content="" color="primary">
                    <PopoverTrigger>
                      <Button isIconOnly radius="full" variant="light">
                        <BellIcon className="h-8 w-8 text-blue-600 p-0" />
                      </Button>
                    </PopoverTrigger>
                  </Badge>
                  <PopoverContent>
                    <div className="px-1 py-2">
                      <div className="text-small font-bold">
                        Popover Content
                      </div>
                      <div className="text-tiny">
                        This is the popover content
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <Dropdown placement="bottom-start" className="dark">
                  <DropdownTrigger>
                    <User
                      as="button"
                      avatarProps={{
                        src: require("../../assets/images/artistavatar.jpg"),
                      }}
                      className="transition-transform"
                      description={"@" + accountname}
                      name={username}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Actions" variant="flat">
                    <DropdownItem
                      key="dashboard"
                      onClick={(e) => {
                        navigate("/dashboard");
                      }}
                    >
                      Dashboard
                    </DropdownItem>
                    <DropdownItem
                      key="accounts"
                      onClick={(e) => {
                        navigate("/account");
                      }}
                    >
                      Account
                    </DropdownItem>
                    <DropdownItem
                      key="settings"
                      onClick={(e) => {
                        navigate("/minting");
                      }}
                    >
                      Minting
                    </DropdownItem>
                    <DropdownItem
                      key="payment"
                      onClick={(e) => {
                        navigate("/payment");
                      }}
                    >
                      Add coins
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={logOut}>
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      <div className="pt-20">{props.children}</div>
    </div>
  );
}
