import rotaDesenho from "./rota-da-amizade-desenho.png";
import rotaEscrita from "./rota-da-amizade-escrita.png";
import dropdownMenuIcon from "./dropdown-menu-icon.svg";
import "./Header.css";
import { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div id="options" className="container">
        <a href="#" id="icon">
          <img
            src={rotaDesenho}
            alt="Logo da rota da amizade"
            id="rotaDesenho"
          />
          <img src={rotaEscrita} alt="nome Rota da amizade" id="rotaEscrita" />
        </a>
        <div id="dropdown-icon">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <img src={dropdownMenuIcon} />
          </button>
        </div>
        <ul id="dropdown-menu">
          <a href="#">Quem somos</a>
          <a href="#">Municipios</a>
          <a href="#">Associados</a>
          <a href="#">Contato</a>
        </ul>
        <a href="#" id="app">
          Baixar o aplicativo
        </a>
      </div>
      <div id="options-mobile" className="container">
        <ul className={isOpen ? "show" : "hide"} id="dropdown-menu-mobile">
          <li>
            <a href="#">Quem somos</a>
          </li>
          <li>
            <a href="#">Municipios</a>
          </li>
          <li>
            <a href="#">Associados</a>
          </li>
          <li>
            <a href="#">Contato</a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
