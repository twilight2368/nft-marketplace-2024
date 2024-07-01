import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import { useLoginContext } from "../../context/LoginProvider";
import { Tabs, Tab } from "@nextui-org/tabs";
import NotSaleNFT from "../../components/nfts/NotSaleNFT";
import SaleNFT from "../../components/nfts/SaleNFT";
export default function ManageNFT() {
  const { userID } = useLoginContext();
  const [reload, setReload] = useState(false);
  const [dataLoad1, setDataLoad1] = useState();
  const [dataLoad2, setDataLoad2] = useState();

  const reloadData = () => {
    setReload(true);
  };

  useEffect(() => {
    if (userID === undefined || userID === null) {
      return;
    } else {
      fetch("http://localhost:8080/nft_owner_sale/" + userID, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setDataLoad1(data);
          setReload(false);
        })
        .catch((e) => {
          console.log(e.messages);
        });
    }
  }, [userID, reload]);

  useEffect(() => {
    if (userID === undefined || userID === null) {
      return;
    } else {
      fetch("http://localhost:8080/nft_owner_not_sale/" + userID, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setDataLoad2(data);
          setReload(false);
        })
        .catch((e) => {
          console.log(e.messages);
        });
    }
  }, [userID, reload]);
  return (
    <div>
      <Navbar>
        <div className="p-20">
          <Tabs>
            <Tab key="archive" title="Archive NFTs">
              <div className="flex flex-col gap-2">
                {dataLoad2 ? (
                  <>
                    {dataLoad2.map((e) => {
                      return (
                        <>
                          <NotSaleNFT
                            id={e.nft_id}
                            name={e.nft_name}
                            image={e.image_url}
                            price={e.price}
                            reloadPage={reloadData}
                            owner={userID}
                          />
                        </>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Tab>
            <Tab key="sale-nft" title="Sale NFTs">
              <div className="flex flex-col gap-2">
                {dataLoad1 ? (
                  <>
                    {dataLoad1.map((e) => {
                      return (
                        <>
                          <SaleNFT
                            id={e.nft_id}
                            name={e.nft_name}
                            image={e.image_url}
                            price={e.price}
                            reloadPage={reloadData}
                            owner={userID}
                          />
                        </>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </div>
            </Tab>
          </Tabs>
        </div>
      </Navbar>
      <MainFooter />
    </div>
  );
}
