import "./ShortDescribe.css";

function ShortDescribe(props) {
  return (
    <section id="aboutUs">
      <div className="container">
        <div id="contentMiddle">
          {props.children}
        </div>
      </div>
    </section>
  );
}

export default ShortDescribe;
