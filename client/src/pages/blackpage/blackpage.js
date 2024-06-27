import BackButton from "../../pages/Topbar/topbar";

import "./styles.css";

const BlackPage = ({
  mainImg,
  bigDes,
  smallDes,
  ...props
}) => {
  return (
    <div className="blackpage">
      <div className="blackpage-title">
        <BackButton />
      </div>
      <div className="blackpage-header">
        <div className="blackpage-header-picture">
          <img src={mainImg} />
        </div>
        <div className="blackpage-header-description">
          <div className="blackpage-header-description-header">{bigDes}</div>
          <div className="blackpage-header-description-body">{smallDes}</div>
        </div>
      </div>
      <div className="blackpage-body">
        {props.children}
      </div>
    </div>
  );
};

export default BlackPage;
