// import BackButton from "pages/Topbar/topbar";
import logo2 from "../../assets/images/icon1024V3.png";
import Itemview from "../../components/componentEarn/Itemview";
import binance from "../../assets/svg/binance.svg";
import check from "../../assets/images/check.png";
import BlackPage from "../../pages/blackpage/blackpage";
import Itempack from "../../components/componentEarn/ItemPack";

import "./wallet.css";

const Wallet = () => {
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
        >
          <div style={{ textAlign: "center" }}>Connect your BSC wallet</div>
        </Itemview>
      </Itempack>
    </BlackPage>
  );
};

export default Wallet;
