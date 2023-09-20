import "./Cards.css";

function Cards(props) {
  return (
    <div className="card">
      <a href="#">
        <div className="cardContainer">
          <img
            src={`./${props.path}/${props.objeto.imagem}`}
            alt={`imagem de ${props.objeto.nome}`}
            className="cardImg"
          />
        </div>
        <div className="sombra" />
        <div className="cardOverlay">
            {props.children}
        </div>
      </a>
    </div>
  );
}

export default Cards;
