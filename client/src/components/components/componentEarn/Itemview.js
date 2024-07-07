// import { Modal, Button, IconButton } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Modal, Button } from "@xelene/tgui";

import "./styles.css";

const Itemview = ({
  header,
  footer,
  onClick,
  modalContent,
  buttonName,
  modalHeaderTitle,
  ...props
}) => {
  const [open, setOpen] = useState(false);
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
        <Modal
          // open={open}
          trigger={
            <Button
              size="l"
              stretched
              style={{
                backgroundColor: "gray",
                ...props,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <div className="itemview-body">{props.children}</div>
            </Button>
          }
          header={
            <Modal.Header />
            // <ModalHeader
            //   title={header}
            //   content={modalHeaderTitle}
            //   click={() => setOpen(false)}
            // />
          }
          // modal={true}
          // dismissible={false}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "5vw",
              gap: "10vw",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "5vw",
              }}
            >
              {modalContent || "Welcome!"}
            </div>
            <div>
              <Button onClick={onClick}>{buttonName || "Check"}</Button>
            </div>
          </div>
        </Modal>
        {footer && (
          <div className="itemview-footer">
            <img className="item-img" src={footer} />
          </div>
        )}
      </div>
    </>
  );
};

const ModalHeader = ({ title, click, content }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2vw",
        alignItems: "center",
      }}
    >
      <div>
        <img style={{ height: "5vh" }} src={title} />
      </div>
      <div>{content}</div>
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
