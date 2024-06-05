import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import React, { useState } from "react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import Logotext from "../../components/logo/Logotext";
import { motion } from "framer-motion";
import LogoImg from "../../assets/icons/logo1.png";
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
              type="email"
              label="Email"
              variant="flat"
              placeholder="Enter your email"
              className="w-full mb-2"
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
            />
            <Button
              color="secondary"
              variant="bordered"
              size="lg"
              className="nunito mt-2 mb-1"
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
