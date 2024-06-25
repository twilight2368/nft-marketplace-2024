import React from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import { Card, CardBody } from "@nextui-org/react";

export default function UserInfor() {
  return (
    <>
      <Navbar>
        <div className=" p-20">
          <Card className=" min-h-96">
            <CardBody>User infor</CardBody>
          </Card>
        </div>
      </Navbar>
      <MainFooter />
    </>
  );
}
