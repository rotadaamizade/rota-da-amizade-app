import CidadeCard from "../../components/CidadeCard/cidadeCard";
import "./Cities.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Cities() {
  const randArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const [municipios, setMunicipios] = useState([]);
  useEffect(() => {
    axios.get("Data/municipios.json").then((res) => {
      setMunicipios(randArray(res.data));
    });
  }, []);

  return (
  <section id="cities" className="container">
    <h1>Municípios</h1>
      <div className="cardGroup">
        {municipios.map((municipio) => {
          return (
            <CidadeCard
              key={municipio.id}
              instancia={municipio}
              path="cidades"
            />
          );
        })}
      </div>
    </section>
  );
}
export default Cities;
