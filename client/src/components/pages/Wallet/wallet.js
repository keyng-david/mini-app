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
  const [text, setText] = useState("Connect your BSC wallet");
  const [totalScore, setTotalScore] = useState(0);
  const initData = useInitData();
  const user = useMemo(() => {
    return initData && initData.user ? initData.user : "unknown";
  });
  const handlepaste = () => {
    navigator.clipboard.readText().then((text) => {
      setText(text);
      const fetchData = async () => {
        try {
          await registAddress({ data: { address: text } });
        } catch (err) {}
      };
      fetchData();
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetchAddress();
        console.log("---", { res });
        setText(res1.address);
        const res = await users({
          tgid: user.id || "",
          username: user.username || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
        });
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
          onClick={totalScore > 20 ? handlepaste : () => {}}
          modalContent={text}
          buttonName="Connect"
        >
          <div style={{ textAlign: "center" }}>Connect your BSC wallet</div>
        </Itemview>
      </Itempack>
    </BlackPage>
  );
};

export default Wallet;
