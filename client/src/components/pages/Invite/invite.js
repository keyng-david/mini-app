import BlackPage from "../blackpage/blackpage";
import Itemview from "@/components/components/componentEarn/Itemview";
import { PiUserCirclePlusBold } from "react-icons/pi";
import { TfiReload } from "react-icons/tfi";
import { PiCopySimple } from "react-icons/pi";
import bonus1 from "../../assets/images/bonus1.png";
import bonus2 from "../../assets/images/bonus2.png";
import coin from "../../assets/images/bonus-coin.png";
import { useInitData } from "@tma.js/sdk-react";
import { useMemo } from "react";

import "./invite.css";
import Popup from "../../components/Modal.js";
import ListComponent from "@/components/components/Listcomponent";

const Invite = () => {
  const initData = useInitData();
  const user = useMemo(() => {
    return initData && initData.user ? initData.user : "unknown";
  });
  const inviteUrl = `https://t.me/amarna_shell_game_bot/start?startapp=amarna_${user.id}`;
  // const shotenUrl = "https://bit.ly/3xzKDs8";
  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
  };
  return (
    <BlackPage
      bigDes="Invite friends!"
      smallDes="You and your friends will be receive bonuses"
    >
      <Itemview
        header={bonus1}
        //   footer={}
        backgroundColor="rgb(39, 42, 47)"
        modalHeaderTitle="Invite a friend"
        modalContent="+5,000"
      >
        <div className="invite-itemview">
          <div>Invite a friend</div>
          <div className="invite-itemview-bottom">
            <div></div>
            <div className="invite-itemview-bottom-coin">
              <img className="invite-itemview-bottom-coin-img" src={coin} />
            </div>
            <div className="invite-itemview-bottom-score">+5,000</div>
            <div>for you and your friend</div>
          </div>
        </div>
      </Itemview>
      <Itemview
        header={bonus2}
        //   footer={}
        backgroundColor="rgb(39, 42, 47)"
        modalHeaderTitle="Invite a friend with Telegram Premium"
        modalContent="+25,000"
      >
        <div className="invite-itemview">
          <div>Invite a friend with Telegram Premium</div>
          <div className="invite-itemview-bottom">
            <div></div>
            <div className="invite-itemview-bottom-coin">
              <img className="invite-itemview-bottom-coin-img" src={coin} />
            </div>
            <div className="invite-itemview-bottom-score">+25,000</div>
            <div>for you and your friend</div>
          </div>
        </div>
      </Itemview>
      <div className="invite-bonustext">More bonuses</div>
      <ListComponent refIcon={<TfiReload />} />
      <div className="invite-btn-pack">
        <div className="invite-btn-pack-btn">
          <div className="invite-btn-pack-btn-text">Invite a friend</div>
          <div className="invite-btn-pack-btn-img">
            <PiUserCirclePlusBold />
          </div>
        </div>
        <div
          className="invite-btn-pack-right"
          onClick={() => copyUrl(inviteUrl)}
        >
          <PiCopySimple size="50%" />
        </div>
      </div>
      {/* <Popup></Popup> */}
    </BlackPage>
  );
};

export default Invite;
