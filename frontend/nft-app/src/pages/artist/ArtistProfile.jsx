import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import { useParams } from "react-router-dom";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import TopNFTHome from "../../components/nfts/TopNFTHome";

export default function ArtistProfile() {
  const { id } = useParams();
  const [dataReady, setDataReady] = useState(false);
  const [userData, setUserData] = useState(null);
  const [owned, setOwned] = useState();
  const [created, setCreated] = useState();

  useEffect(() => {
    setDataReady(false);
    fetch("http://localhost:8080/user/" + id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserData(data.user_data);
        setOwned(data.owned_nft);
        setCreated(data.created_nfts);
        setDataReady(true);
      })
      .catch((error) => {
        console.log(error.messages);
      });
  }, [id]);
  return (
    <div>
      <Navbar>
        <div>
          {dataReady ? (
            <>
              <div className=" h-60 w-full  pt-10 pl-20">
                <div className=" text-5xl poetsen-one-regular">
                  Name: {userData.user_name}
                </div>
                <div className=" text-xl nunito">
                  Artist: {userData.account_name}
                </div>
                <div className=" text-xl nunito">Email: {userData.email}</div>
              </div>
              <div className="px-32">
                <Tabs aria-label="Dynamic tabs">
                  <Tab key={"Minted NFTs"} title={"Minted NFTs"}>
                    <Card>
                      <CardBody>
                        <div className="grid grid-cols-5 gap-10">
                          {created.map((e) => {
                            return (
                              <>
                                <TopNFTHome
                                  id={e.nft_id}
                                  image={e.image_url}
                                  name={e.nft_name}
                                  price={e.price}
                                />
                              </>
                            );
                          })}
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                  <Tab key={"Owned NFTs"} title={"Owned NFTs"}>
                    <Card>
                      <CardBody>
                        <div className="grid grid-cols-5 gap-10 ">
                          {owned.map((e) => {
                            return (
                              <>
                                <TopNFTHome
                                  id={e.nft_id}
                                  image={e.image_url}
                                  name={e.nft_name}
                                  price={e.price}
                                />
                              </>
                            );
                          })}
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              </div>
            </>
          ) : (
            <>
              <span className="loading loading-dots loading-lg"></span>
            </>
          )}
        </div>
      </Navbar>
      <MainFooter />
    </div>
  );
}
