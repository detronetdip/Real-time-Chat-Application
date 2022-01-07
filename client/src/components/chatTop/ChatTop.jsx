import "./chattop.css";

export default function ChatTop(props) {
  function goback(){
    props.reference.current.style.transform="translateX(0%)"
  }
  return (
    <>
      <div className="chatop">
        <div
          className="box"
          style={{
            marginRight: "0.9rem",
            alignItems: "center",
            background: "#232a3b",
            borderRadius:"5px"
          }}
          onClick={goback}
        >
          <box-icon name="chevron-left" color="white"></box-icon>
        </div>
        <img src="/images/android-chrome-512x512.png" alt="" />
        <h4> {props.name} </h4>
      </div>
    </>
  );
}
