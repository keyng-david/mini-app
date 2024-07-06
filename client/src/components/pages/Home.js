import React, { useEffect, useMemo, useRef, useState } from "react";
import background from "../assets/images/background.png";

import { useInitData, useLaunchParams } from "@tma.js/sdk-react";

import "./styles.css";
import amar_token from "../assets/images/amarIcon.png";
import Hide from "../assets/images/logo.png";
import scroll from "../assets/images/quest.png";
import profile from "../assets/images/profile.png";

import { play, users } from "../api/loadaxiosFunc.js";
import BtnArrangement from "../components/BtnArrangement";
import { limit } from "../utils/limitation";
import Modal from "../components/Modal";

function Homepage(props) {
  const [holdClick, setHoldClick] = useState(false);
  const [owner, setOwner] = useState(0);
  const [shuffling, setShuffling] = useState(false);
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [quest, setQuest] = useState(false);
  const [click_limit, setClick_limit] = useState(true);
  // let score = parseInt(localStorage.getItem("score")) || 0;
  // const airdrop = useRef(0);
  const retrieveTimeout = useRef();
  const increase = useRef();
  const canbeSelect = useRef(false);
  const retrieveShuffle = useRef();
  let retOwner, retrieveDrop;
  let temp, retrieveHold;

  const initData = useInitData();
  const initDataRaw = useLaunchParams().initDataRaw;

  const user = useMemo(() => {
    return initData && initData.user ? initData.user : "unknown";
  });
  const vase_choosed = (e) => {
    if (canbeSelect.current) setOwner(parseInt(e.target.id));
  };

  const static_vases = useRef([
    <div
      className="vase-img-small"
      style={{ left: "30%" }}
      id="1"
      onClick={vase_choosed}
      key="1"
    ></div>,
    <div
      className="vase-img-big"
      style={{ left: "60%" }}
      id="2"
      onClick={vase_choosed}
      key="2"
    ></div>,
    <div
      className="vase-img-small"
      style={{
        left: "70%",
      }}
      id="3"
      onClick={vase_choosed}
      key="3"
    ></div>,
  ]);
  const broken_vase = <div className="vase-img-broken"></div>;
  const dynamic_vases = [
    <div
      className="vase-img-small"
      style={{ left: "90px" }}
      id="cup_1"
      key="1"
    ></div>,
    <div
      className="vase-img-big"
      style={{ left: "175px" }}
      id="cup_2"
      key="2"
    ></div>,
    <div
      className="vase-img-small"
      style={{ left: "270px" }}
      id="cup_3"
      key="3"
    ></div>,
  ];

  //------------ handlers ------------
  const init = () => {
    return static_vases.current.map((vase) => vase);
  };

  const move = () => {
    return dynamic_vases.map((vase) => vase);
  };

  const shuffling_process = () => {
    //Once shuffling enabled,
    if (shuffling) {
      clearTimeout(retrieveShuffle.current); //remove the shuffle timeout.
      temp = move(); //set return value to move animation(dynamic_vases)
      retrieveShuffle.current = setTimeout(() => setShuffling(false), 1000); //After 1s, suffling will be stoped
    } else {
      clearTimeout(retrieveHold);
      temp = init(); //set return value to static status(static_vases)
    }
    return temp;
  };

  const coinAnimation = (num) => {
    if (holdClick) {
      increase.current = "";
      return "coin_down 2s backwards";
    }
    if (result) {
      increase.current = "+1";
      return `coin_catch_${num} 4s backwards`;
    }
    return "";
  };

  const clickHide = () => {
    setHoldClick(true);
  };

  const elementArrayStyleSet = (objArray, stylePropsName, stylePropsValue) => {
    const retArray = objArray.map((obj) => {
      return {
        ...obj,
        props: {
          ...obj.props,
          style: {
            ...obj.props.style,
            [stylePropsName]: stylePropsValue,
          },
        },
      };
    });

    return retArray;
  };

  // Update function called every second to check for day change
  function updateDay() {
    const currentDay = new Date().getDay();
    const last_clicked_day = JSON.parse(localStorage.getItem("storage"))?.day;
    if (currentDay !== last_clicked_day) {
      setClick_limit(false);
    }
  }

  // Call updateDay function every second
  const rinterval = setInterval(updateDay, 30 * 60000);

  const returnVaseImg = (owner) => {
    setHoldClick(false);
    static_vases.current = static_vases.current.map((vase, index) => {
      if (index === owner - 1)
        return {
          ...vase,
          props: {
            ...vase.props,
            className: owner !== 2 ? "vase-img-small" : "vase-img-big",
            style: { ...vase.props.style, backgroundPosition: "center" },
          },
        };
      return vase;
    });
    clearTimeout(retrieveTimeout);
  };
  const loadServer = async (sendData) => {
    setLoading(true);
    const returnVal = await play(sendData);
    //Receiving comparing result from backend.
    //if "Success!", increase totalScore state and catch animation start.
    //If else, no increase.
    if (returnVal === "Success!") {
      setResult(true);
      setTotalScore(totalScore + 1);
    } else {
      setResult(false);
    }
    setLoading(false);
    return returnVal;
  };

  //------------Event control part ------------

  //--holdclick event---(Game Entry Point)
  useEffect(() => {
    if (holdClick) {
      //Game status initialize
      setResult(false);
      setOwner(0);
      setClick_limit(limit());
      if (click_limit) setHoldClick(false);
      else {
        //After 2.5s, shuffling animation will execute
        retrieveShuffle.current = setTimeout(() => setShuffling(true), 2500);
      }
    }
  }, [holdClick]);

  //--owner event---(Vase selection event)
  useEffect(() => {
    if (owner && holdClick) {
      //While this game is going, vase can't be selected
      canbeSelect.current = false;
      //vase array remove bright status after vase selecting
      static_vases.current = elementArrayStyleSet(
        static_vases.current,
        "animation",
        ""
      );
      //Then path to dust rising animation or broken animation status following loading status.
      if (loading) {
        static_vases.current[(owner - 1).toString()] = {
          ...static_vases.current[(owner - 1).toString()],
          props: {
            ...static_vases.current[(owner - 1).toString()].props,
            style: {
              ...static_vases.current[(owner - 1).toString()].props.style,
              backgroundPosition: "bottom",
            },
          },
        };
      } else {
        static_vases.current[(owner - 1).toString()] = {
          ...broken_vase,
          props: {
            ...static_vases.current[(owner - 1).toString()].props,
            ...broken_vase.props,
            style: {
              ...static_vases.current[(owner - 1).toString()].props.style,
            },
          },
        };
      }
      //After 3s, return vase status to origin status.
      retrieveTimeout.current = setTimeout(() => returnVaseImg(owner), 1500);
      //send owner info and receive the camparing result.
      loadServer({
        tgid: user.id || "",
        selected: owner,
      });

      //---FRONT DEV MODE------
      // if (airdrop.current === owner) {
      //   airdrop.current = 0;
      //   localStorage.setItem("score", (score + 1).toString());
      //   result.current = true;
      // } else {
      //   result.current = false;
      //   increase.current = "";
      // }
    } else {
      setResult(false);
    }
  }, [owner]);

  //--shuffling event---
  useEffect(() => {
    if (shuffling) {
      canbeSelect.current = true; //vase can be selected from now
      // airdrop.current = Math.floor(Math.random(0, 1) * 3 + 1);//DEV MODE
      //vases path to bright status
      // static_vases.current = elementArrayStyleSet(
      //   static_vases.current,
      //   "animation",
      //   " glow 1s infinite alternate"
      // );
    }
  }, [shuffling]);

  //--didmount event---
  useEffect(() => {
    const fetchedFunc = async () => {
      if (user.id && user.firstName) {
        const res = await users({
          tgid: user.id || "",
          username: user.username || "",
          firstName: user.firstName || "",
          lastName: user.lastName || "",
        });
        setTotalScore(res.totalScore);
      }
    };
    fetchedFunc();

    clearTimeout(retrieveHold, retrieveDrop, retOwner);
    if (JSON.parse(localStorage.getItem("store"))?.count >= 10)
      setClick_limit(true);
    else setClick_limit(false);
    return () => {
      clearInterval(rinterval);
    };
  }, []);

  return (
    <div className="home">
      <div className="info">
        <div className="info-avatar">
          <div className="info-avatar-imgbox">
            <img
              style={{ width: "90%", height: "90%" }}
              src={profile}
              alt="no profile"
            />
          </div>
          <div className="info-avatar-text">{user.firstName}</div>
        </div>
        <div className="info-quest" onClick={() => setQuest(true)}>
          <div className="info-quest-text" style={{ position: "relative" }}>
            <img className="info-quest-img" src={scroll} alt="no quest" />
            Quest:Find the hidden $AMAR token
          </div>
        </div>
        <Modal isOpen={quest} onClose={() => setQuest(false)}>
          <QuestBody />
        </Modal>
      </div>
      <div className="mask">
        <div className="panel">
          <div className="panel-score">
            <img src={amar_token} className="panel-score-img" alt="no img" />
            <div className="panel-score-text">{totalScore}</div>
          </div>
        </div>
        <div className="hide">
          <img
            className={
              holdClick || click_limit ? "disabled-hide-img" : "hide-img"
            }
            src={Hide}
            onClick={clickHide}
            alt="no img"
          />
        </div>

        <div style={{ position: "relative", marginTop: "-50px" }}>
          <img src={background} className="backImg" alt="noImg loaded" />
          <div style={{ position: "absolute", inset: -1 }}>
            <div className="gradient">
              <div
                id="coin"
                style={{
                  animation: coinAnimation(owner),
                }}
              >
                {result ? (
                  <div className="coin-score">{increase.current}</div>
                ) : (
                  <img
                    src={amar_token}
                    alt="no amar_token"
                    style={{ width: "100%" }}
                  />
                )}
              </div>
              <div className="vase">{shuffling_process()}</div>
              <BtnArrangement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

const QuestBody = () => {
  return (
    <div>
      <p>*THIS IS TESTING TEXT*</p>
      <p>What's in our Game?</p>
      <p>Unique Quests</p>
      <p>Exciting Events</p>
      <p>Surprise Airdrops: Special rewards and gifts for active players</p>
    </div>
  );
};
