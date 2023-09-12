import './evento.css'
import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import HeaderEvento from "../../components/headerEvento/headerEvento";
import SliderMenu from "../../components/sliderMenu/sliderMenu";

function Evento() {
    const { id } = useParams();
    const { navbarState, setNavbarState } = useContext(UserContext)
    const menus = ['Informações', 'Eventos']
    const [menuActive, setMenuActive] = useState(menus[0])

    const content = useRef(null);

    useEffect(() => {
        if (navbarState !== 'eventos') {
            setNavbarState('eventos')
        }
    }, [])

    useEffect(() => {
        if (menuActive === menus[0]) {
            if (content.current) {
                content.current.style.left = '0';
                content.current.style.right = '';
            }
        } else if (menuActive === menus[1]) {
            if (content.current) {
                content.current.style.right = '0';
                content.current.style.left = '';
            }
        }
    }, [menuActive])

    return (
        <>
            <HeaderEvento />
            <section className="section-3">
                <SliderMenu
                    menus={menus}
                    menuActive={menuActive}
                    setMenuActive={setMenuActive}
                />
                <div ref={content} className="all-content-page">
                    <div className="content-1"></div>
                    <div className="content-2"></div>
                </div>
            </section>
        </>
    )
}

export default Evento;
