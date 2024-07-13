import Itempack from "../../components/componentEarn/ItemPack.js";
import Itemview from "../../components/componentEarn/Itemview.js";
import calender from "../../assets/images/calender.png";
import yutube from "../../assets/images/yutube.png";
import telegram from "../../assets/images/yutube.png";
import tweeiter from "../../assets/images/yutube.png";
import rightArrow from "../../assets/svg/right-arrow-3094.svg";
import tokenImg from "../../assets/images/amarIcon.png";

import "./earn.css";
import BlackPage from "../blackpage/blackpage.js";
import ReactModal from "@/components/components/ReactModal.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/components/redux/slice.js";

const Earn = () => {
  const dispatch = useDispatch();
  const tasklist = useSelector((state) => state.tasks.tasklist);
  console.log({ tasklist });
  const imgSelection = (type) => {
    console.log({ type });
    if (type === "yutube") {
      return yutube;
    } else if (type === "telegram") {
      return telegram;
    } else if (type === "tweeiter") {
      return tweeiter;
    } else {
      return;
    }
  };
  const taskUrlLink = (url) => {
    window.location.href = url;
  };
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  return (
    <BlackPage mainImg={tokenImg} bigDes="Earn more coins" smallDes="">
      <Itempack title="Tasks list">
        {tasklist?.map((task) => (
          <ReactModal
            title={task.title}
            content={task.value}
            okFunc={taskUrlLink}
            okText="Check"
          >
            <Itemview header={imgSelection(task.type)} footer={rightArrow}>
              <div className="itemview-body-top">{task.title}</div>
              <div className="itemview-body-down">{task.value}</div>
            </Itemview>
          </ReactModal>
        ))}
      </Itempack>
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
