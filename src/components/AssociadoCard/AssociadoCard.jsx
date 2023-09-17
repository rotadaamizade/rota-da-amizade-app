import Cards from "../Cards/Cards";
import "./AssociadoCard.css";

function AssociadoCard(props) {
  return (
    <Cards objeto={props.instancia} path={props.path}> 
      <h3>{props.instancia.nome}</h3>
      <h4>{props.instancia.cidade}</h4>
    </Cards>
  );
}

export default AssociadoCard;
