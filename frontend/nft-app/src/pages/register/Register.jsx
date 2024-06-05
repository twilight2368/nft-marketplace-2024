import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Input,
  Image,
  Link,
  Button
} from "@nextui-org/react";
import React, { useState } from "react";
import ImgHero from "../../assets/icons/nothing.png";
import Logotext from "../../components/logo/Logotext";
import { EyeFilledIcon } from "../login/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../login/EyeSlashFilledIcon";
import Logoimg from "../../assets/icons/logo1.png"
import { motion } from "framer-motion";

export default function Register() {
  return (
    <div>
      <div className=" bg-purple-900/30 h-screen">
        <div className=" h-full w-full flex justify-center items-center">
          <InputForm></InputForm>
        </div>
      </div>
    </div>
  );
}

function InputForm(params) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <>
      <motion.div
        className=" h-2/3 w-1/2"
        initial={{ y: -150 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.4,
        }}
      >
        <Card className=" w-full h-full border-2 border-blue-600 shadow-md shadow-purple-600 ">
          <CardBody>
            <div className=" w-full h-full grid grid-cols-2">
              <div className=" flex justify-center items-center">
                <Image isBlurred src={ImgHero} />
              </div>
              <div>
                <div className=" flex flex-row gap-3 items-center justify-center ">
                  <div>
                    <img
                      src={Logoimg}
                      alt=""
                      className=" h-14 w-14 -translate-y-2"
                    />
                  </div>
                  <div className="text-2xl font-bold text-center text-white/0 poetsen-one-regular mt-5 mb-10">
                    <Logotext />
                  </div>
                </div>
                <div className=" px-10 ">
                  <Input
                    size="lg"
                    color="secondary"
                    isClearable
                    type="text"
                    label="Username"
                    variant="flat"
                    placeholder="Enter your username"
                    className="w-full mb-2"
                  />
                  <Input
                    size="lg"
                    color="secondary"
                    isClearable
                    type="email"
                    label="Email"
                    variant="flat"
                    placeholder="Enter your email"
                    className="w-full mb-2"
                  />
                  <Input
                    size="lg"
                    color="secondary"
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
                  <Input
                    size="lg"
                    color="secondary"
                    label="Confirm password"
                    variant="flat"
                    placeholder="Confirm your password"
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
                  <div className="px-3 mt-3">
                    <Checkbox defaultSelected color="secondary">
                      Agree to the Terms and Conditions <Link>learn more</Link>
                    </Checkbox>
                  </div>
                  <div className=" text-center mt-3">
                    <Button
                      color="primary"
                      variant="ghost"
                      size="lg"
                      className="nunito mt-2 mb-1"
                    >
                      Register
                    </Button>
                    <div>
                      <a href="/login" className="mt-1 text-sm nunito hover:underline text-blue-500 ">
                        Already have an account
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
