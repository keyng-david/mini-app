// import BackButton from "pages/Topbar/topbar";
import { useState } from "react";
import logo2 from "../../assets/images/icon1024V3.png";
import Itemview from "../../components/componentEarn/Itemview.js";
import binance from "../../assets/svg/binance.svg";
import check from "../../assets/images/check.png";
import BlackPage from "../blackpage/blackpage.js";
import Itempack from "../../components/componentEarn/ItemPack.js";

import "./wallet.css";
import Modal from "@/components/components/Walletmodal";

const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("Connect your BSC wallet");

  const handleClose = () => {
    setOpen(false);
  };
  const handlepaste = () => {
    navigator.clipboard.readText().then((text) => setText(text));
    setOpen(true);
  };

  const handleOpen = () => {
    setOpen(true);
  };
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
          footer={check}
          backgroundColor="rgb(240, 183, 64)"
          onClick={handlepaste}
        >
          <div style={{ textAlign: "center" }}>{text}</div>
        </Itemview>
      </Itempack>
    </BlackPage>
  );
};

export default Wallet;
