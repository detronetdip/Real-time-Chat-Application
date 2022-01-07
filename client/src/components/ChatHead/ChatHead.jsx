import "./ChatHead.css";
export default function ChatHead(props) {
  return (
    <>
      <div className="headrow" onClick={()=>{props.setId(props.id)}}>
        <img src="/images/android-chrome-512x512.png" alt="" />
        <h4>{props.name}</h4>
      </div>
    </>
  );
}
