// import BackButton from "pages/Topbar/topbar";
import { useEffect, useState, useMemo } from "react";
import logo2 from "../../assets/images/icon1024V3.png";
import Itemview from "../../components/componentEarn/Itemview.js";
import binance from "../../assets/svg/binance.svg";
import check from "../../assets/images/check.png";
import BlackPage from "../blackpage/blackpage.js";
import Itempack from "../../components/componentEarn/ItemPack.js";
import {
  fetchAddress,
  registAddress,
  users,
} from "@/components/api/loadaxiosFunc";
import pasteImg from "../../assets/images/paste.png";
import { useInitData } from "@tma.js/sdk-react";

import "./wallet.css";

const Wallet = () => {
  const NEEDED_COIN_THRESHOLD = 20;
  const GENERAL_TEXT = "Connect your BSC wallet";
  const ALERT_TEXT = "More coins are needed!!";
  const [text, setText] = useState(GENERAL_TEXT);
  const [totalScore, setTotalScore] = useState(0);
  const initData = useInitData();
  const user = useMemo(() => {
    return initData && initData.user ? initData.user : "unknown";
  });
  const handlepaste = () => {
    navigator.clipboard.readText().then((text) => {
      setText(text);
      const registry = async () => {
        try {
          const res = await registAddress({
            tgid: user.id,
            walletAddress: text,
          });
          console.log("=====", res);
        } catch (err) {
          console.log("error");
        }
      };
      registry();
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res1 = await fetchAddress();
        //
        const res = await users({
          tgid: user.id || "",
          username: user.username || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
        });
        console.log("-------", res);
        setText(res.walletAddress);
        setTotalScore(res.totalScore);
      } catch (err) {}
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
      {console.log({ totalScore })}
      <Itempack title="Tasks list">
        <Itemview
          header={binance}
          footer={pasteImg || check}
          backgroundColor="rgb(240, 183, 64)"
          onClick={totalScore > NEEDED_COIN_THRESHOLD ? handlepaste : () => {}}
          modalContent={totalScore > NEEDED_COIN_THRESHOLD ? text : ALERT_TEXT}
          buttonName="Connect"
        >
          <div style={{ textAlign: "center" }}>Connect your BSC wallet</div>
        </Itemview>
      </Itempack>
    </BlackPage>
  );
};

export default Wallet;
