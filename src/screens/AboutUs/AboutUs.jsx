import { useEffect, useState } from "react";
import "./AboutUs.css";
import axios from "axios";

function AboutUs() {
  const [imgCapa, setImgCapa] = useState([]);
  useEffect(() => {
    axios.get("Data/capas.json").then((res) => {
      setImgCapa(res.data[Math.floor(Math.random() * res.data.length)]);
    });
  }, []);

  return (
    <>
      <section id="aboutUs">
        <div className="container">
          {/* 
        <div id="textLeft">
          <div>
            <h1>ROTA DA AMIZADE</h1>
            <p>
              Somos uma associação de turismo sem fins econômicos que através da
              divulgação dos municípios e dos seus associados busca promover e
              desenvolver o turismo na região do Vale dos Imigrantes.
            </p>
          </div>
        </div>
        <div id="imageRight">
          <div id="imageWrapper">
            <img
              src={`Capas/${imgCapa.img}`}
              alt="Houveram problemas ao exibir a imagem"
            />
          </div>
        </div>
         */}
          <div id="textMiddle">
            <h1>ROTA DA AMIZADE</h1>
            <p>
              Somos uma associação de turismo sem fins econômicos que através da
              divulgação dos municípios e dos seus associados busca promover e
              desenvolver o turismo na região do Vale dos Imigrantes.
            </p>
          </div>
        </div>
      </section>
      {/* 
      <section id="aboutUsImage">
        <div id="imageWrapper">
          <img
            src={`Capas/${imgCapa.img}`}
            alt="Houveram problemas ao exibir a imagem"
          />
        </div>

        <div id="imageShadowBottom" />
        <div id="imageTextOverlay">
          <div id="textOverlayMark">
            <h2>{imgCapa.city}</h2>
          </div>
        </div>
        
      </section>
       */}
      <section id="ourValues">
        <div className="container" id="valuesWrapper">
          <div>
            <h3>Nossa Missão</h3>
            Fomentar e promover o turismo de forma integrada, contribuindo para
            o desenvolvimento sustentável da região do Vale dos Imigrantes
          </div>
          <div>
            <h3>Nossa Visão</h3>
            Ser referência em Santa Catarina até 2020 como entidade promotora de
            integração e fomento do turismo. Através da promoção do destino e
            captação de eventos e recursos
          </div>
          <div>
            <h3>Nossos Valores</h3>
            <p>Integração</p>
            <p>Qualidade</p>
            <p>Sustentabilidade</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
