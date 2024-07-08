const Admin = () => {
  return (
    <div>
      <Slide label="withdraw" />
      <Slide label="daily attemp limitation" />
      <Slide label="probability" />
      <div>
        <form className="form-group admin-task">
          <div>
            <div>Task type</div>
            <select className="form-control">
              <option value="apple">Yutube</option>
              <option value="banana">Tweeter</option>
              <option value="orange">Telegram</option>
            </select>
          </div>
          {/* <InputText label="task" /> */}
          <InputText label="Task value" />
        </form>
      </div>
    </div>
  );
};

export default Admin;

const Slide = (props) => {
  return (
    <div className="admin-withdraw">
      <div className="admin-walletthreshold-text">{props.label}</div>
      <div className="admin-walletthreshold-slide">
        <input type="range" />
      </div>
    </div>
  );
};
const InputText = (props) => {
  return (
    <div>
      <div>{props.label}</div>
      <div>
        <input className="form-control" type="text"></input>
      </div>
    </div>
  );
};
