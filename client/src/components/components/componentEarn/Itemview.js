import "./styles.css";

const Itemview = ({ header, footer, onClick, ...props }) => {
  return (
    <div
      className="itemview"
      style={{ backgroundColor: "gray", ...props }}
      onClick={onClick}
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
  );
};

export default Itemview;
