import React, { useEffect, useState } from "react";

import {} from // useNavigation
"react-router-dom";

import "./styles.css";
import amar_token from "../assets/images/amarIcon.png";
import Hide from "../assets/images/logo.png";
import scroll from "../assets/images/quest.png";
import Btn from "../components/Btn";
import profile from "../assets/images/coin.png"

function FirstPage(props) {
  const [holdClick, setHoldClick] = useState(false);
  const [droped, setDroped] = useState(false);
  // const [result, setResult] = useState(false);
  // const [owner, setOwner] = useState(0);
  const [choose, setChoose] = useState(false);
  // const [scores, setScores] = useState(0);
  const [status, setStatus] = useState({owner:0,hide:false});
  let owner = 0;
  let score = parseInt(localStorage.getItem('score'))||0;
  let result = false;
  const choosed = (e) => {
    //  setChoose(true);
    //  setDroped(false)
    console.log(e.target.id, owner);
    if (parseInt(e.target.id) === owner) {
      score = score + 1;
      localStorage.setItem('score',score.toString());
      result = true;
    } else {
      result = false;
    }
    handleChoose()
  };
  const handleChoose = () =>{
    console.log(score,result)
    setChoose(true);
  }
  const static_vases = [
    <div
      className="vase-img-small"
      style={{ left: "90px" }}
      id="1"
      onClick={choosed}
    ></div>,
    <div
      className="vase-img-big"
      style={{ left: "175px" }}
      id="2"
      onClick={choosed}
    ></div>,
    <div
      className="vase-img-small"
      style={{ left: "270px" }}
      id="3"
      onClick={choosed}
    ></div>,
  ];
  const dynamic_vases = [
    <div className="vase-img-small" style={{ left: "90px" }} id="cup_1"></div>,
    <div className="vase-img-big" style={{ left: "175px" }} id="cup_2"></div>,
    <div className="vase-img-small" style={{ left: "270px" }} id="cup_3"></div>,
  ];
  let retrieveDrop,retOwner;
  let temp, retrieveHold;

  // const [goEarn, setGoEarn] = useState(false);
  const init = () => {
    return static_vases.map((vase) => vase);
  };
  const move = () => {
    return dynamic_vases.map((vase) => vase);
  };
  
  const hideClick = () => {
    owner = Math.floor(Math.random(0, 1) * 3 + 1);
    setStatus({owner,hide:true});
  };
  const handle = () => {
    if (droped) {
      clearTimeout(retrieveDrop);
      temp = move();
      retrieveHold = setTimeout(() => setHoldClick(false), 1000);
      retrieveDrop = setTimeout(() => setDroped(false), 1000);
    } else {
      clearTimeout(retrieveHold);
      clearTimeout(retrieveDrop);
      temp = init();
    }
    return temp;
  };
 
  const animation = () => {
    if(status.owner) return "coin_down 2s backwards"
    else if(result&&choose) return "coin_catch 2s backwards"
    else if(!result&&choose) return "coin_lost 2s backwards"
    else return ""
  }

  // useEffect(() => {
  //   console.log("input params:->", props);
  //   setChoose(false);
  //   if (holdClick) retrieveDrop = setTimeout(() => setDroped(true), 2500);
  // }, [holdClick]);
  // useEffect(() => {
  //   if (droped) {
  //     retrieveHold = setTimeout(() => setHoldClick(false), 1000);
  //     // retrieveDrop = setTimeout(() => setDroped(false), 1000);
  //   }
  // }, [droped]);

  // useEffect(() => {
  //   retOwner = setTimeout(()=>setOwner(0),1000);
  // }, [result]);
  // useEffect(() => {
  //   if (owner == 0) setResult(false);
  // }, [owner]);

  // useEffect(()=>{localStorage.setItem('score',`${scores}`)},[scores])
  // useEffect(() => {
  //   clearTimeout(retrieveHold, retrieveDrop, retOwner);
  // }, []);
  return (
    <div className="home">
      <div className="info">
        <div className="info-avatar">
          <div className="info-avatar-imgbox">
            <img style={{width:'90%', height:'90%'}} src={profile} />
          </div>
          <div className="info-avatar-text">Vasili</div>
        </div>
        <div className="info-quest">
          <div className="info-quest-text" style={{ position: "relative" }}>
            <img className="info-quest-img" src={scroll} />
            Quest:Find the hidden $AMAR token
          </div>
        </div>
      </div>
      <div className="mask">
        <div className="panel">
          <Btn title="Earn" url="/earn" />
          <div className="panel-score">
            <img src={amar_token} className="panel-score-img" />
            <div className="panel-score-text">{score}</div>
          </div>
          <Btn title="Wallet" url="/wallet" />
        </div>
        <div className="hide">
          <img
            className="hide-img"
            src={Hide}
            onClick={!holdClick ? hideClick : null}
          />
        </div>
        <div className="vase-coin">
          <div
            className="coin"
            style={{
              animation:animation()
                // (holdClick ? "coin_down 2s backwards" : "") ||
                // (result
                //   ? "coin_catch 2s backwards"
                //   : choose
                //   ? "coin_lost 2s backwards"
                //   : ""),
            }}
          >
            <div id="coin"></div>
          </div>
          <div className="vase">{droped ? handle() : init()}</div>
        </div>
      </div>
      <div className="background">
        {/* <img className="human" src={human}/>
        <img className='dog' src={dog}/> */}
      </div>
    </div>
  );
}

export default FirstPage;
