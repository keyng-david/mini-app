import Button from "./Btn";
const BtnArrangement = () => {
  return (
    <div
      style={{
        display: "flex",
        // width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgb(18 18 18/80%)",
        // opacity: "0.7",
        borderRadius: "1rem",
        padding: "2vw",
        margin: "3vw",
        zIndex: "2",
      }}
    >
      <Button title="Earn" url="/earn" />
      <Button title="Invite" url="/invite" />
      <Button title="Wallet" url="/wallet" />
    </div>
  );
};

export default BtnArrangement;
