import React, { useEffect, useRef, useState } from "react";
import background from "../assets/images/background.png";

import "./styles.css";
import amar_token from "../assets/images/amarIcon.png";
import Hide from "../assets/images/logo.png";
import scroll from "../assets/images/quest.png";
import Btn from "../components/Btn";
import profile from "../assets/images/profile.png";

function Homepage(props) {
  const [holdClick, setHoldClick] = useState(false);
  const [droped, setDroped] = useState(false);
  const [result, setResult] = useState(false);
  const [owner, setOwner] = useState(0);
  const [choose, setChoose] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  const [reset, setReset] = useState(false);
  let score = parseInt(localStorage.getItem("score")) || 0;
  const airdrop = useRef(0);
  const retrieveTimeout = useRef();
  const increase = useRef();
  const canbeSelect = useRef(false);
  let retrieveShuffle, retOwner, retrieveDrop;
  let temp, retrieveHold;
  const log = console.log;
  const vase_choosed = (e) => {
    if (canbeSelect.current) setOwner(parseInt(e.target.id));
  };

  const static_vases = useRef([
    <div
      className="vase-img-small"
      style={{ left: "30%" }}
      id="1"
      onClick={vase_choosed}
    ></div>,
    <div
      className="vase-img-big"
      style={{ left: "60%" }}
      id="2"
      onClick={vase_choosed}
    ></div>,
    <div
      className="vase-img-small"
      style={{
        left: "70%",
      }}
      id="3"
      onClick={vase_choosed}
    ></div>,
  ]);
  const dynamic_vases = [
    <div className="vase-img-small" style={{ left: "90px" }} id="cup_1"></div>,
    <div className="vase-img-big" style={{ left: "175px" }} id="cup_2"></div>,
    <div className="vase-img-small" style={{ left: "270px" }} id="cup_3"></div>,
  ];

  //------------ handlers ------------
  const init = () => {
    return static_vases.current.map((vase) => vase);
  };
  const move = () => {
    return dynamic_vases.map((vase) => vase);
  };
  const shuffling_process = () => {
    if (shuffling) {
      clearTimeout(retrieveShuffle);
      temp = move();
      canbeSelect.current = true;
      retrieveShuffle = setTimeout(() => setShuffling(false), 1000);
    } else {
      clearTimeout(retrieveHold);
      clearTimeout(retrieveShuffle);
      temp = init();
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
      return `coin_catch_${num} 2s backwards`;
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
    clearTimeout(retrieveTimeout);
  };

  //------------Event control part ------------
  useEffect(() => {
    if (holdClick) {
      retrieveShuffle = setTimeout(() => setShuffling(true), 2500);
      setChoose(false);
      setResult(false);
      setOwner(0);
    } else {
    }
  }, [holdClick]);

  useEffect(() => {
    if (owner && holdClick) {
      canbeSelect.current = false;
      static_vases.current = elementArrayStyleSet(
        static_vases.current,
        "animation",
        ""
      );
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
      retrieveTimeout.current = setTimeout(() => returnVaseImg(owner), 3000);

      setChoose(true);
      if (airdrop.current === owner) {
        airdrop.current = 0;
        localStorage.setItem("score", (score + 1).toString());
        setResult(true);
      } else {
        setResult(false);
        increase.current = "";
      }
    } else {
      setResult(false);
    }
  }, [owner]);

  useEffect(() => {
    if (!droped && choose) {
      setHoldClick(false);
    }
  }, [droped, choose]);

  useEffect(() => {
    if (choose) setDroped(false);
  }, [choose]);

  useEffect(() => {
    if (shuffling) {
      setDroped(true);
      airdrop.current = Math.floor(Math.random(0, 1) * 3 + 1);
      // log("airdrop", airdrop.current);
      static_vases.current = elementArrayStyleSet(
        static_vases.current,
        "animation",
        " glow 1s infinite alternate"
      );
    }
  }, [shuffling]);

  useEffect(() => {
    clearTimeout(retrieveHold, retrieveDrop, retOwner);
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
          <div className="info-avatar-text">{"Ozhous ( CEO ) "}</div>
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
            <div className="panel-score-text">{score}</div>
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
          <img src={background} className="backImg" />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
