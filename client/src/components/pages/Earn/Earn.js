import Itempack from "../../components/componentEarn/ItemPack.js";
import Itemview from "../../components/componentEarn/Itemview.js";
import calender from "../../assets/images/calender.png";
import yutube from "../../assets/images/yutube.png";
import rightArrow from "../../assets/svg/right-arrow-3094.svg";
import tokenImg from "../../assets/images/amarIcon.png";

import "./earn.css";
import BlackPage from "../blackpage/blackpage.js";
import ReactModal from "@/components/components/ReactModal.js";
import { useState } from "react";
import { useSelector } from "react-redux";

const Earn = () => {
  const tasklist = useSelector((state) => state.reducer.tasklist);
  console.log({ tasklist });
  const imgSelection = (type) => {
    if (type === "Yutobe") {
      return yutube;
    } else if (type === "Telegram") {
      return telegram;
    } else if (type === "Tweeiter") {
      return tweeiter;
    } else {
      return;
    }
  };
  return (
    <BlackPage mainImg={tokenImg} bigDes="Earn more coins" smallDes="">
      {tasklist?.map((task) => (
        <Itempack title="Tasks list">
          <ReactModal
            title={task.title}
            content={task.value}
            // okFunc={}
          >
            <Itemview header={imgSelection(task.type)} footer={rightArrow}>
              <div className="itemview-body-top">{task.title}</div>
              <div className="itemview-body-down">{task.value}</div>
            </Itemview>
          </ReactModal>
        </Itempack>
      ))}
      {/* <Itempack title="Tasks list">
        <ReactModal
          title={"200M Hamster Kombat Oyuncusu"}
          content={"+100.000"}
          // okFunc={}
        >
          <Itemview header={yutube} footer={rightArrow}>
            <div className="itemview-body-top">
              200M Hamster Kombat Oyuncusu
            </div>
            <div className="itemview-body-down">+100.000</div>
          </Itemview>
        </ReactModal>
      </Itempack>
      <Itempack title="Tasks list">
        <ReactModal
          title={"200M Hamster Kombat Oyuncusu"}
          content={"+100.000"}
          // okFunc={}
        >
          <Itemview header={calender} footer={rightArrow}>
            <div className="itemview-body-top">
              200M Hamster Kombat Oyuncusu
            </div>
            <div className="itemview-body-down">+100.000</div>
          </Itemview>
        </ReactModal>
      </Itempack> */}
    </BlackPage>
  );
};

export default Earn;
