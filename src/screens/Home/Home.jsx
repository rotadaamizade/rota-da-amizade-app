import { useContext } from "react";
import ShortDescribeHome from "../../components/ShortDescribeHome/ShortDescribeHome";
import "./Home.css";
import { PageContext } from "../../useContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { page, setPage } = useContext(PageContext);

  const navigate = useNavigate();

  const linkContact = () => {
    setPage("contact");
    navigate("/contato");
  };
  return (
    <>
      <ShortDescribeHome />

      <section id="whatIs">
        {/* 
      Destinos Turísticos
      Dicas de Passeios
      Meio Oeste Catarinense
      Referência no Turismo
      */}
      </section>
      <section id="wannaBeAssociate">
        <div id="wbaContainer" className="container">
          <div id="wbaBackground">
            <img src="/wbaImage.webp" alt="" />
          </div>
          <div id="wbaText">
            <div>
              <h2>Faça parte da Rota da Amizade</h2>
              <button onClick={linkContact}>Nos Contate</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
