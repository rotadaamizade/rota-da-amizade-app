import "./Home.css";
import iomereImg from "./iomereImg.jpg";

function Home() {
  return (
    <>
      <main>
        <section id="quemSomos">
          <div className="container">
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
              <p>Integração - Qualidade - Sustentabilidade.</p>
            </div>
          </div>
        </section>
        <section id="municipios">
          {/* IOMERÊ | ARROIO TRINTA | TANGARÁ | JOAÇABA */}
          <div className="container row">
            <div className="municipio card">
              <div className="card-img-ovelay">
                <h3>Iomerê</h3>
              </div>
              <img
                src={iomereImg}
                alt="imagem da cidade de Iomerê"
                className="card-img"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
