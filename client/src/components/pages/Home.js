import React, { useEffect, useMemo, useRef, useState } from "react";
import background from "../assets/images/background.png";

import { useInitData } from "@tma.js/sdk-react";

import "./styles.css";
import amar_token from "../assets/images/amarIcon.png";
import Hide from "../assets/images/logo.png";
import scroll from "../assets/images/quest.png";
import Btn from "../components/Btn.js";
import profile from "../assets/images/profile.png";

import { play, users } from "../api/loadaxiosFunc.js";

function Homepage(props) {
  const [holdClick, setHoldClick] = useState(false);
  const [droped, setDroped] = useState(false);
  const [gameend, setGameend] = useState(false);
  const [owner, setOwner] = useState(0);
  const [choose, setChoose] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [reset, setReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  let score = parseInt(localStorage.getItem("score")) || 0;
  const airdrop = useRef(0);
  const retrieveTimeout = useRef();
  const increase = useRef();
  const canbeSelect = useRef(false);
  const retrieveShuffle = useRef();
  const response = useRef();
  const result = useRef();
  let retOwner, retrieveDrop;
  let temp, retrieveHold;
  const initData = useInitData();
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
    if (result.current) {
      increase.current = "+1";
      return `coin_catch_${num} 4s backwards`;
    }
    return "";
  };

  const clickHide = () => setHoldClick(true);

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

  const returnVaseImg = (owner) => {
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
    setReset(!reset);
    setDroped(false);
    clearTimeout(retrieveTimeout);
  };
  const loadServer = async (sendData) => {
    setLoading(true);
    const returnVal = await play(sendData);
    console.log({ returnVal });

    //Receiving comparing result from backend.
    //if "Success!", increase totalScore state and catch animation start.
    //If else, no increase.
    if (returnVal === "Success!") {
      setTotalScore(totalScore + 1);
      result.current = true;
    } else {
      result.current = false;
    }
    setLoading(false);
    return returnVal;
  };

  //------------Event control part ------------

  //--holdclick event---(Game Entry Point)
  useEffect(() => {
    if (holdClick) {
      //After 2.5s, shuffling animation will execute
      retrieveShuffle.current = setTimeout(() => setShuffling(true), 2500);
      //Game status initialize
      setChoose(false);
      result.current = false;
      setOwner(0);
      setGameend(false);
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
            className: "vase-img-dust-rising",
            style: {
              ...static_vases.current[(owner - 1).toString()].props.style,
              backgroundPosition: "bottom",
            },
          },
        };
      } else {
        static_vases.current[(owner - 1).toString()] = {
          ...static_vases.current[(owner - 1).toString()],
          props: {
            ...static_vases.current[(owner - 1).toString()].props,
            className: "vase-img-broken",
            style: {
              ...static_vases.current[(owner - 1).toString()].props.style,
              backgroundPosition: "bottom",
            },
          },
        };
      }
      //After 3s, return vase status to origin status.
      retrieveTimeout.current = setTimeout(() => returnVaseImg(owner), 1500);
      //choosing status is set.
      setChoose(true);
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
      setGameend(true);
    } else {
      result.current = false;
    }
  }, [owner]);

  //--droped event---
  useEffect(() => {
    if (!droped && choose) {
      setHoldClick(false);
    }
  }, [droped]);

  useEffect(() => {
    // if (choose) setDroped(false);
  }, [choose]);

  //--shuffling event---
  useEffect(() => {
    if (shuffling) {
      setDroped(true);
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
        console.log("home-----", totalScore);
      }
    };
    fetchedFunc();

    clearTimeout(retrieveHold, retrieveDrop, retOwner);
  }, []);

  //--Game End part--
  useEffect(() => {
    if (gameend) {
      setHoldClick(false);
    }
  }, [gameend]);

  //

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
        <div className="info-quest">
          <div className="info-quest-text" style={{ position: "relative" }}>
            <img className="info-quest-img" src={scroll} alt="no quest" />
            Quest:Find the hidden $AMAR token
          </div>
        </div>
      </div>
      <div className="mask">
        <div className="panel">
          <Btn title="Earn" url="/earn" />
          <div className="panel-score">
            <img src={amar_token} className="panel-score-img" alt="no img" />
            <div className="panel-score-text">{totalScore}</div>
          </div>
          <Btn title="Wallet" url="/wallet" />
        </div>
        <div className="hide">
          <img
            className={droped ? "disabled-hide-img" : "hide-img"}
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
                {result.current ? (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
