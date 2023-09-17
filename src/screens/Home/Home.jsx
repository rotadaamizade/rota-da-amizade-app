import CidadeCard from "../../components/CidadeCard/cidadeCard";
import AssociadoCard from "../../components/AssociadoCard/AssociadoCard";
import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";

const randArray = (arr) => [...arr].sort(() => Math.random() - 0.5);
function Home() {
  const [imgCapa, setImgCapa] = useState([]);
  useEffect(() => {
    axios.get("Data/capas.json").then((res) => {
      setImgCapa(res.data[Math.floor(Math.random() * res.data.length)]);
    });
  }, []);

  const [municipios, setMunicipios] = useState([]);
  useEffect(() => {
    axios.get("Data/municipios.json").then((res) => {
      setMunicipios(randArray(res.data));
    });
  }, []);

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
    <>
      <main>
        <section id="quemSomos" className="container">
          <div id="containerImage">
            <img src={`Capas/${imgCapa.img}`} alt="" />
          </div>
          <div id="boxInformacao">
            <div id="informacao">
              <h1>A Rota da Amizade</h1>
              <p>
                A Rota da Amizade Convention & Visitors Bureau é uma associação
                de turismo sem fins econômicos que atualmente integra os
                municípios de Arroio Trinta, Iomerê, Pinheiro Preto, Tangará,
                Treze Tílias e Videira. Através da divulgação dos municípios e
                dos seus associados busca promover e desenvolver o turismo na
                região do Vale dos Imigrantes.
              </p>
              <h2>Nossa Missão</h2>
              <p>
                Fomentar e promover o turismo de forma integrada, contribuindo
                para o desenvolvimento sustentável da região do Vale dos
                Imigrantes.
              </p>
              <h2>Nossa Visão</h2>
              <p>
                Ser referência em Santa Catarina até 2020 como entidade
                promotora de integração e fomento do turismo. Através da
                promoção do destino e captação de eventos e recursos.
              </p>
              <h2>Nossos Valores</h2>
              <p>Integração</p>
              <p>Qualidade</p>
              <p>Sustentabilidade</p>
            </div>
          </div>
        </section>
        <section id="cidades" className="container">
          <h2>Municipios associados</h2>
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

        <section id="associados" className="container">
          <h2>Estabelecimentos associados</h2>
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
      </main>
    </>
  );
}

export default Home;
