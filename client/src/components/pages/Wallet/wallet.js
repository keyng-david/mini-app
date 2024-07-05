// import BackButton from "pages/Topbar/topbar";
import { useEffect, useState } from "react";
import logo2 from "../../assets/images/icon1024V3.png";
import Itemview from "../../components/componentEarn/Itemview.js";
import binance from "../../assets/svg/binance.svg";
import check from "../../assets/images/check.png";
import BlackPage from "../blackpage/blackpage.js";
import Itempack from "../../components/componentEarn/ItemPack.js";
import { fetchAddress, registAddress } from "@/components/api/loadaxiosFunc";
import pasteImg from "../../assets/images/paste.png";

import "./wallet.css";

const Wallet = () => {
  const [text, setText] = useState("Connect your BSC wallet");
  const handlepaste = () => {
    navigator.clipboard.readText().then((text) => {
      setText(text);
      const fetchData = async () => {
        try {
          await registAddress({ adress: text });
        } catch (err) {}
      };
      fetchData();
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const res =
        (await fetchAddress()?.address.toString()) || "Connect your BSC wallet";
      setText(res);
    };
    fetchData();
  }, []);
  return (
    <BlackPage
      mainImg={logo2}
      bigDes="Airdrops"
      smallDes="Hello. Wellcome to here!!"
      radius={true}
    >
      <Itempack title="Tasks list">
        <Itemview
          header={binance}
          footer={pasteImg || check}
          backgroundColor="rgb(240, 183, 64)"
          onClick={handlepaste}
          content={text}
          buttonName="Connect"
        >
          <div style={{ textAlign: "center" }}>Connect your BSC wallet</div>
        </Itemview>
      </Itempack>
    </BlackPage>
  );
};

export default Wallet;
