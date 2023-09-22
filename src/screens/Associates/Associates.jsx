import AssociadoCard from "../../components/AssociadoCard/AssociadoCard";
import "./Associates.css";
import axios from "axios";
import { useEffect, useState } from "react";

function Associates() {
  const randArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const [associadosDiamante, setAssociadosDiamante] = useState([]);
  useEffect(() => {
    axios.get("Data/associadosDiamante.json").then((res) => {
      setAssociadosDiamante(randArray(res.data));
    });
  }, []);

  const [associadosOuro, setAssociadosOuro] = useState([]);
  useEffect(() => {
    axios.get("Data/associadosOuro.json").then((res) => {
      setAssociadosOuro(randArray(res.data));
    });
  }, []);

  const [associadosPrata, setAssociadosPrata] = useState([]);
  useEffect(() => {
    axios.get("Data/associadosPrata.json").then((res) => {
      setAssociadosPrata(randArray(res.data));
    });
  }, []);
  return (
    <section id="associates" className="container">
      <h1>Associados</h1>
      <div className="cardGroup">
        {associadosDiamante.map((associado) => {
          return (
            <AssociadoCard
              key={associado.id}
              instancia={associado}
              path="associados"
            />
          );
        })}
        {associadosOuro.map((associado) => {
          return (
            <AssociadoCard
              key={associado.id}
              instancia={associado}
              path="associados"
            />
          );
        })}
        {associadosPrata.map((associado) => {
          return (
            <AssociadoCard
              key={associado.id}
              instancia={associado}
              path="associados"
            />
          );
        })}
      </div>
    </section>
  );
}

export default Associates;
