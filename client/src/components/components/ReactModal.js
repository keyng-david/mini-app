import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.modalTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>{props.modalContent}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.modalOk}>Ok</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ReactModal({ children, title, content, okFunc }) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      {{
        ...children,
        props: { ...children.props, onClick: () => setModalShow(true) },
      }}

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        modalTitle={title}
        modalContent={content}
        modalOk={okFunc}
      />
    </>
  );
}

export default ReactModal;
