import "./message.css";
import "boxicons";
export default function Message(props) {
  return (
    <>
      <div className="single-msgrow">
        <div className={props.class}>
          <div className="sendername">{props.sender}</div>
          <p className="text">{props.text}</p>
          <div className="tm">
            <span style={{marginLeft:"auto"}}>
            {props.time}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
