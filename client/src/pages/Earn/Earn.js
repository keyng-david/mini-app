import Itempack from "../../components/componentEarn/ItemPack.js";
import Itemview from "../../components/componentEarn/Itemview.js";
import calender from "../../assets/images/calender.png";
import yutube from "../../assets/images/yutube.png";
import rightArrow from "../../assets/svg/right-arrow-3094.svg";
import tokenImg from "../../assets/images/amarIcon.png";

import "./earn.css";
import BlackPage from "../../pages/blackpage/blackpage.js";

const Earn = () => {
  return (
    <BlackPage mainImg={tokenImg} bigDes="Earn more coins" smallDes="">
      <Itempack title="Tasks list">
        <Itemview header={yutube} footer={rightArrow}>
          <div className="itemview-body-top">200M Hamster Kombat Oyuncusu</div>
          <div className="itemview-body-down">+100.000</div>
        </Itemview>
      </Itempack>
      <Itempack title="Tasks list">
        <Itemview header={calender} footer={rightArrow}>
          <div className="itemview-body-top">200M Hamster Kombat Oyuncusu</div>
          <div className="itemview-body-down">+100.000</div>
        </Itemview>
      </Itempack>
    </BlackPage>
  );
};

export default Earn;
