import React, { useEffect, useRef, useState } from "react";
import background from "../assets/images/background.png";
import {} from // useNavigation
"react-router-dom";

import "./styles.css";
import amar_token from "../assets/images/amarIcon.png";
import Hide from "../assets/images/logo.png";
import scroll from "../assets/images/quest.png";
import Btn from "../components/Btn";
import profile from "../assets/images/profile.png";
const log = console.log;
function Homepage(props) {
  const [holdClick, setHoldClick] = useState(false);
  const [droped, setDroped] = useState(false);
  const [result, setResult] = useState(false);
  const [owner, setOwner] = useState(0);
  const [choose, setChoose] = useState(false);
  const [shuffling, setShuffling] = useState(false);
  // const [scores, setScores] = useState(0);
  let score = parseInt(localStorage.getItem("score")) || 0;
  const airdrop = useRef(0);
  let retrieveShuffle, retOwner, retrieveDrop;
  let temp, retrieveHold;

  const vase_choosed = (e) => {
    setOwner(parseInt(e.target.id));
    // choosed_process();
  };

  const static_vases = [
    <div
      className="vase-img-small"
      style={{ left: "90px" }}
      id="1"
      onClick={vase_choosed}
    ></div>,
    <div
      className="vase-img-big"
      style={{ left: "175px" }}
      id="2"
      onClick={vase_choosed}
    ></div>,
    <div
      className="vase-img-small"
      style={{ left: "270px" }}
      id="3"
      onClick={vase_choosed}
    ></div>,
  ];
  const dynamic_vases = [
    <div className="vase-img-small" style={{ left: "90px" }} id="cup_1"></div>,
    <div className="vase-img-big" style={{ left: "175px" }} id="cup_2"></div>,
    <div className="vase-img-small" style={{ left: "270px" }} id="cup_3"></div>,
  ];

  //------------ handlers ------------
  const init = () => {
    return static_vases.map((vase) => vase);
  };
  const move = () => {
    return dynamic_vases.map((vase) => vase);
  };
  const handle = () => {
    if (shuffling) {
      clearTimeout(retrieveShuffle);
      temp = move();

      retrieveShuffle = setTimeout(() => setShuffling(false), 1000);
    } else {
      clearTimeout(retrieveHold);
      clearTimeout(retrieveShuffle);
      temp = init();
    }
    return temp;
  };

  const animation = () => {
    if (holdClick) {
      return "coin_down 2s backwards";
    }
    // else if(result&&choose) return "coin_catch 2s backwards"
    // else if(!result&&choose) return "coin_lost 2s backwards"
    else return "";
  };
  const clickHide = () => {
    setHoldClick(true);
  };

  //------------Event control part ------------
  useEffect(() => {
    console.log("holdclick");
    setChoose(false);
    if (holdClick) retrieveShuffle = setTimeout(() => setShuffling(true), 2500);
  }, [holdClick]);

  useEffect(() => {
    if (owner) {
      setChoose(true);
      log("selected owner: ", owner, "owner vase", airdrop.current);
      if (airdrop.current === owner) {
        localStorage.setItem("score", (score + 1).toString());
        setResult(true);
      } else {
        setResult(false);
      }
      setOwner(0);
      airdrop.current = 0;
    }
  }, [owner]);

  useEffect(() => {
    log("droped", { choose, droped });
    if (!droped && choose) {
      setHoldClick(false);
    }
  }, [droped, choose]);

  useEffect(() => {
    log("choose");
    if (choose) setDroped(false);
  }, [choose]);

  useEffect(() => {
    if (shuffling) {
      setDroped(true);
      airdrop.current = Math.floor(Math.random(0, 1) * 3 + 1);
    }
  }, [shuffling]);

  // useEffect(()=>{localStorage.setItem('score',`${scores}`)},[scores])

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
            {console.log({ holdClick })}
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
        <div
          id="coin"
          style={{
            animation: animation(),
          }}
        >
          <img src={amar_token} alt="no amar_token" style={{ width: "100%" }} />
        </div>
        <div style={{ position: "relative", marginTop: "-50px" }}>
          <img src={background} className="backImg" />
          <div style={{ position: "absolute", inset: -1 }}>
            <div className="gradient">
              <div className="vase">{handle()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
