import "./home.css";
import Front from "../../components/svgs/front";
export default function Home() {
  return (
    <>
      <section className="main">
        <div className="frontrow">
          <div className="image">
            <Front />
          </div>
          <div className="right-front">
              <h4>Talk with</h4>
              <h1>everyone</h1>
          </div>
        </div>
      </section>
    </>
  );
}
