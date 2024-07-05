import { Modal, Button, IconButton } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

import "./styles.css";

const Itemview = ({
  header,
  footer,
  onClick,
  content,
  buttonName,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(false);
  };
  console.log(open);
  return (
    <>
      <div
        className="itemview"
        style={{ backgroundColor: "gray", ...props }}
        onClick={() => setOpen(true)}
      >
        {header && (
          <div className="itemview-header">
            <img className="item-img" src={header} />
          </div>
        )}
        <div className="itemview-body">{props.children}</div>
        {footer && (
          <div className="itemview-footer">
            <img className="item-img" src={footer} />
          </div>
        )}
      </div>
      <Modal
        open={open}
        header={<ModalHeader title={header} click={() => setOpen(false)} />}
        modal={true}
        dismissible={false}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "5vw",
            gap: "1vw",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            {content || "Welcome!"}
          </div>
          <div>
            <Button onClick={onClick}>{buttonName || "Check"}</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

const ModalHeader = ({ title, click }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2vw",
      }}
    >
      <div>
        <img style={{ height: "5vh" }} src={title} />
      </div>
      <IconButton
        onClick={click}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IoCloseCircleOutline size="5vw" />
      </IconButton>
    </div>
  );
};
export default Itemview;
