import BackButton from "../../pages/backButton/backButton";

import "./styles.css";

const BlackPage = ({ mainImg, bigDes, smallDes, radius, ...props }) => {
  return (
    <div className="blackpage">
      <div className="blackpage-title">
        <BackButton />
      </div>
      <div className="blackpage-header">
        <div className="blackpage-header-picture">
          <img style={{ borderRadius: radius ? "100%" : "" }} src={mainImg} />
        </div>
        <div className="blackpage-header-description">
          <div className="blackpage-header-description-header">{bigDes}</div>
          <div className="blackpage-header-description-body">{smallDes}</div>
        </div>
      </div>
      <div className="blackpage-body">{props.children}</div>
    </div>
  );
};

export default BlackPage;
