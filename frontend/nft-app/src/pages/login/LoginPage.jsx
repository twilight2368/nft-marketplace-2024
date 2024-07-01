import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import Logotext from "../../components/logo/Logotext";
import { motion } from "framer-motion";
import LogoImg from "../../assets/icons/logo1.png";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../../context/LoginProvider";

export default function LoginPage() {
  return (
    <div className=" bg-purple-900/30 h-screen">
      <div className=" h-full w-full">
        <FormInput></FormInput>
      </div>
    </div>
  );
}

function FormInput(params) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();
  const { login, setLogin, setUserID, setUsername, setAccountname } =
    useLoginContext();

  const navigate = useNavigate();

  const loginProceed = async () => {
    const data = {
      email: inputEmail,
      password: inputPassword,
    };

    fetch("http://localhost:8080/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        //console.log("response status: ", response.status);
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setLogin(true);
        setUsername(data.username);
        setUserID(data.userid);
        setAccountname(data.accountname);
        localStorage.setItem("login-marketplace-ffnft", "true");
        localStorage.setItem("username", data.username);
        localStorage.setItem("accountname", data.accountname);
        localStorage.setItem("userid", data.userid);
        navigate("/home");
      })
      .catch((e) => {
        setLogin(false);
        localStorage.setItem("login", "false");
      });
  };

  return (
    <>
      <motion.div
        className="h-full w-full  flex flex-col gap-3 items-center pt-10 "
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.75,
          type: "spring",
        }}
      >
        <div className=" pt-3">
          <img src={LogoImg} alt="" className=" h-40 w-40" />
        </div>
        <Card className=" border-2 border-purple-600 shadow-md shadow-blue-600 h-[480px] w-1/4 ">
          <CardHeader className=" flex flex-col">
            <div className="poetsen-one-regular text-3xl pt-5 pb-5 text-white/0 h-full w-full flex justify-center items-center">
              <Logotext />
            </div>
          </CardHeader>
          <CardBody className=" px-14 flex items-center gap-y-3">
            <Input
              size="lg"
              color="primary"
              isClearable
              type="text"
              label="Email"
              variant="flat"
              placeholder="Enter your email"
              className="w-full mb-2"
              onChange={(e) => {
                setInputEmail(e.target.value);
              }}
            />
            <Input
              size="lg"
              color="primary"
              label="Password"
              variant="flat"
              placeholder="Enter your password"
              className="w-full mb-2"
              type={isVisible ? "text" : "password"}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              onChange={(e) => {
                setInputPassword(e.target.value);
              }}
            />
            <Button
              color="secondary"
              variant="bordered"
              size="lg"
              className="nunito mt-2 mb-1"
              isDisabled={!(inputPassword && inputEmail)}
              onClick={loginProceed}
            >
              Login
            </Button>
            <div className=" text-sm text-center  ">
              <a href="#" class="hover:underline text-blue-500 ">
                Forgot your password
              </a>{" "}
              <br />
              Or{" "}
              <a href="/register" class="hover:underline text-blue-500 ">
                haven't had an account yet
              </a>
            </div>
          </CardBody>
          <CardFooter>
            <div className=" w-full h-full text-center">
              <span class="block text-sm nunito text-gray-500  sm:text-center ">
                © 2024{" "}
                <a href="#" class="hover:underline text-blue-500 ">
                  FastFoodie™
                </a>
                . All Rights Reserved.
              </span>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </>
  );
}
