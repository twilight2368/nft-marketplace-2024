import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import { Button, Card, CardBody, Chip, Input } from "@nextui-org/react";
import { useLoginContext } from "../../context/LoginProvider";

export default function UserInfor() {
  const [dataLoad, setDataLoad] = useState(null);
  const { userID } = useLoginContext();

  useEffect(() => {
    console.log(userID);
    fetch("http://localhost:8080/account/" + userID, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDataLoad(data);
        console.log(data);
      })
      .then((error) => {
        console.log(error);
      });
  }, [userID]);

  return (
    <>
      <Navbar>
        <div className=" p-20 flex justify-center">
          <Card className=" min-h-96 w-1/2">
            <CardBody>
              {dataLoad ? (
                <>
                  <div className=" text-center nunito text-xl mb-3">
                    User information
                  </div>
                  <div className=" flex justify-start items-center mb-5">
                    <Input
                      label="Username"
                      defaultValue={dataLoad.user_name}
                      value={dataLoad.user_name}
                      isReadOnly
                    />
                  </div>
                  <div>
                    <Input
                      label="Account identifier"
                      value={dataLoad.account_name}
                      isReadOnly
                      className="mb-5"
                    />
                  </div>
                  <div>
                    <Input
                      label="Email"
                      value={dataLoad.email}
                      isReadOnly
                      className="mb-5"
                    />
                  </div>
                  <div className=" flex flex-row gap-5 ">
                    <Input
                      label="Gender"
                      value={dataLoad.gender}
                      isReadOnly
                      className="mb-5"
                    />
                    <Input
                      label="Age"
                      value={dataLoad.age}
                      isReadOnly
                      className="mb-5"
                    />
                  </div>

                  <div className="mb-5">
                    Amount: <Chip>{dataLoad.amount} coin</Chip>
                  </div>
                  <div className="mb-5">
                    Password: 
                    <Button color="primary" variant="flat" className="ml-5">
                      Change password
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className=" h-full w-full flex justify-center items-center">
                    <span className="loading loading-infinity loading-lg"></span>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </div>
      </Navbar>
      <MainFooter />
    </>
  );
}
