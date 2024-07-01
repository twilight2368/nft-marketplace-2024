import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import MainFooter from "../../components/footer/MainFooter";
import { Tabs, Tab, Card, CardBody, Image, Button } from "@nextui-org/react";
import { useLoginContext } from "../../context/LoginProvider";
import TopNFTHome from "../../components/nfts/TopNFTHome";
import CoinImg from "../../assets/icons/pizza.png";
import LogoImg from "../../assets/icons/nothing.png";
import { useNavigate } from "react-router-dom";
import CoinTran from "../../components/transactions/CoinTran";
import NftTran from "../../components/transactions/NftTran";
export default function DashBoard() {
  const { userID } = useLoginContext();

  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [dataUser, setDataUser] = useState();
  const [coinTran, setCoinTran] = useState();
  const [nftTran, setNftTran] = useState();
  const [created, setCreated] = useState();
  const [owned, setOwned] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    if (userID) {
      fetch("http://localhost:8080/dashboard/" + userID, {
        credentials: "include",
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setDataUser({
            amount: data.amount.amount,
            total_created: data.total_created,
            total_owned: data.total_owned,
            volume_created: data.volume_created["sum"],
            volume_owned: data.volume_owned["sum"],
          });

          setCreated(data.created_nfts);
          setOwned(data.owned_nft);

          setLoading(false);
        });
    }
  }, [userID]);

  useEffect(() => {
    setLoading1(true);
    if (userID) {
      fetch("http://localhost:8080/coin_transaction_by_use/" + userID, {
        credentials: "include",
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(1);
          setCoinTran(data);
          setLoading1(false);
        });
    }
  }, [userID]);

  useEffect(() => {
    setLoading2(true);
    if (userID) {
      fetch("http://localhost:8080/nfts_transaction_by_use/" + userID, {
        credentials: "include",
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          console.log(2);
          setNftTran(data);
          setLoading2(false);
        });
    }
  }, [userID]);

  return (
    <div>
      <Navbar>
        <div className=" pt-10 px-40">
          <div className="flex w-full flex-col">
            {loading ? (
              <>
                <div className="w-full flex justify-center items-center">
                  <span className="loading loading-ball loading-lg"></span>
                </div>
              </>
            ) : (
              <>
                <div>
                  <Tabs aria-label="Options">
                    <Tab key="Overall" title="Overall">
                      <div className="w-full flex flex-row gap-20">
                        <Card className="w-1/2 p-5">
                          <CardBody>
                            <div>
                              <div className="poetsen-one-regular flex flew-row items-center gap-1 text-4xl mb-5">
                                <div>
                                  <span className=" bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-white/0 ">
                                    Balance:
                                  </span>{" "}
                                  {dataUser.amount}
                                </div>
                                <Image src={CoinImg} className="h-10 w-10" />
                              </div>
                              <div className="grid grid-cols-2 grid-rows-2 gap-10">
                                <div className=" min-h-40 flex flex-col justify-center items-center nunito">
                                  <div className=" text-6xl font-bold roboto">
                                    {dataUser.total_created}
                                  </div>
                                  <div>NFTs minted</div>
                                </div>
                                <div className=" min-h-40 flex flex-col justify-center items-center nunito">
                                  <div className=" text-6xl font-bold roboto flex items-end">
                                    {dataUser.volume_created
                                      ? dataUser.volume_created
                                      : 0}
                                    <Image
                                      src={CoinImg}
                                      className="h-6 w-6 -translate-y-2"
                                    />
                                  </div>
                                  <div>Total volume of minted NFTs</div>
                                </div>
                                <div className=" min-h-40 flex flex-col justify-center items-center nunito">
                                  <div className=" text-6xl font-bold roboto">
                                    {dataUser.total_owned}
                                  </div>
                                  <div>NFTs owning</div>
                                </div>
                                <div className=" min-h-40 flex flex-col justify-center items-center nunito">
                                  <div className=" text-6xl font-bold roboto flex items-end ">
                                    {dataUser.volume_owned
                                      ? dataUser.volume_owned
                                      : 0}
                                    <Image
                                      src={CoinImg}
                                      className="h-6 w-6 -translate-y-2"
                                    />
                                  </div>
                                  <div>Total volume of owning NFTs</div>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                        <div className="w-1/2 flex flex-col justify-center items-center">
                          <Image
                            src={LogoImg}
                            className="h-96 w-96"
                            isBlurred
                          />
                          <Button
                            variant="ghost"
                            color="warning"
                            onClick={(e) => {
                              navigate("/managenft");
                            }}
                          >
                            Manage your nfts
                          </Button>
                        </div>
                      </div>
                    </Tab>
                    <Tab key="MyNFTs" title="My NFTs">
                      <div className="grid grid-cols-5 gap-5">
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
                    </Tab>
                    <Tab key="MintedNFTs" title="Minted NFTs">
                      <div className="grid grid-cols-5 gap-5">
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
                    </Tab>
                    <Tab key="Coin-transactions" title="Coin transaction">
                      {loading1 ? (
                        <>
                          <div className="w-full flex justify-center items-center">
                            <span className="loading loading-ball loading-lg"></span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col gap-10">
                            {coinTran.map((e) => {
                              return (
                                <>
                                  <CoinTran
                                    time={e.transaction_date}
                                    amount={e.amount_coin}
                                  />
                                </>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </Tab>
                    <Tab key="NFTs-transactions" title="NFTs transactions">
                      {loading2 ? (
                        <>
                          <div className="w-full flex justify-center items-center">
                            <span className="loading loading-ball loading-lg"></span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col gap-2">
                            {nftTran.map((e) => {
                              return (
                                <>
                                  <NftTran
                                    time={e.transaction_date}
                                    user={userID}
                                    from_user={e.from_user}
                                    to_user={e.to_user}
                                    amount={e.amount}
                                    nft_id={e.nft_id}
                                  />
                                </>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </Tab>
                  </Tabs>
                </div>
              </>
            )}
          </div>
        </div>
      </Navbar>
      <MainFooter />
    </div>
  );
}
