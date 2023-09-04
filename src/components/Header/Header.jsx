import rotaDesenho from "./rota-da-amizade-desenho.png";
import rotaEscrita from "./rota-da-amizade-escrita.png";
import "./Header.css";
import { useEffect, useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownMenuIcon = (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 6H20M4 12H20M4 18H20"
        stroke="#000000"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const dropdownMenuCloseIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
        fill="#0F0F0F"
      />
    </svg>
  );

  useEffect(() => {
    if (isOpen) {
      // document.body
    }
  }, [isOpen]);

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
        <ul>
          <a href="#">Quem somos</a>
          <a href="#">Municipios</a>
          <a href="#">Associados</a>
          <a href="#">Contato</a>
        </ul>
        <a href="#" id="baixarApp">
          Baixar o aplicativo
        </a>
        <div id="dropdown-icon">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? dropdownMenuCloseIcon : dropdownMenuIcon}
            {/* <img src={dropdownMenuIcon} /> */}
          </button>
        </div>
      </div>
      <div
        id="dropdown-menu"
        className={"container " + (isOpen ? "show" : "hide")}
      >
        <ul id="dropdown-menu-mobile">
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
          <li>
            <a href="#">Baixe o aplicativo</a>
          </li>
        </ul>
        <hr />
      </div>
    </header>
  );
}

export default Header;
