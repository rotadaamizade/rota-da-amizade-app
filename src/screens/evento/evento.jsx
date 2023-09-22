import './evento.css'
import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import Header2 from '../../components/header2/header2';
import ImgCarousel from '../../components/imgCarousel/imgCarousel';
import Buttons from '../../components/buttons/buttons';

function Evento() {
    const { id } = useParams();
    const { navbarState, setNavbarState } = useContext(UserContext)
    const [popup, setPopup] = useState('')


    useEffect(() => {
        if (navbarState !== 'eventos') {
            setNavbarState('eventos')
        }
    }, [])

    const imgs = [
        'https://optimizer.dooca.store/2179/files/vinho-de-mesa-ou-vinho-fino-3-blog-setembro-22.jpg',
        'https://s2.glbimg.com/Zs2gDkUy-utAtayacsX7dD4m9AU=/620x455/e.glbimg.com/og/ed/f/original/2017/02/16/thinkstockphotos-615269202.jpg',
        'https://vejario.abril.com.br/wp-content/uploads/2022/07/Le-Terroir-Regua-de-vinho-2-Foto-Fabio-Rossi.jpg.jpg.jpg?quality=70&strip=info&w=1280&h=720&crop=1',
        'https://media.istockphoto.com/id/1301017778/pt/foto/three-glasses-of-white-rose-and-red-wine-on-a-wooden-barrel.jpg?s=612x612&w=0&k=20&c=wn_Zad_udltkpd8tD_-hI7EeQ1EHrtyV2C_hU3m_uTE='
    ]



    const contatos = [
        {name: 'WhatsApp', color: '#25D366'},
        {name: 'Email', color: '#000'},
        {name: 'Telefone', color: '#4267B2'}
    ]

    const redes = []

    const localization = 'https://www.google.com/maps/place/Hotel+Santa+Clara/@-27.0261368,-51.1480951,15z/data=!4m9!3m8!1s0x94e14fae1ae24467:0x26ffb849bc196d53!5m2!4m1!1i2!8m2!3d-27.021633!4d-51.1483297!16s%2Fg%2F11b6hqdxkx?entry=ttu'

    const background = useRef();
    const redespopup = useRef();
    const contatopopup = useRef()

    const closePopup = (type) => {

        setPopup('')

        background.current.style.opacity = '0';

        if(type == 'contato'){
            contatopopup.current.style.opacity = '0';
        } else {
            redespopup.current.style.opacity = '0';
        }

        setTimeout(() => {
            background.current.style.zIndex = '-1';
           
            if(type == 'contato'){
                contatopopup.current.style.zIndex = '-1'; 
            } else {
                redespopup.current.style.zIndex = '-1'; 
            }
        }, 200);
    };
  
    const openPopup = (type) => {

        setPopup(type)

        background.current.style.zIndex = '4';
        background.current.style.opacity = '100%';

        if(type == 'contato'){
            contatopopup.current.style.opacity = '100%';
            contatopopup.current.style.zIndex = '5';
        } else {
            redespopup.current.style.opacity = '100%';
            redespopup.current.style.zIndex = '5';
        }
    };

    return (
        <>
            <div onClick={() => closePopup(popup)} ref={background} className='popup-background'></div>
            {redes.length > 0 && (
                <div ref={redespopup} className='redes-popup' >
                    <div>
                        {
                            redes.map((rede, index) => (
                                <div key={index} style={{ backgroundColor: rede.color }} className='rede-button popup-buttons'>{rede.name}</div>
                            ))
                        }
                        <div className='close-button-container'>
                            <div onClick={() => closePopup('redes')} className='close-button popup-buttons'>Fechar</div>
                        </div>
                    </div>
                </div>
            )}
            {contatos !== undefined && (
                <div ref={contatopopup} className='redes-popup' >
                    <div>
                        {
                            contatos.map((contato, index) => (
                                <div key={index} style={{ backgroundColor: contato.color }} className='rede-button popup-buttons'>{contato.name}</div>
                            ))
                        }
                        <div className='close-button-container'>
                            <div onClick={() => closePopup('contato')} className='close-button popup-buttons'>Fechar</div>
                        </div>
                    </div>
                </div>
            )}
            <Header2 
                text1 = 'Show Corpo e Alma'
                text2 = 'Matheus Eventos'
                img = 'https://sobailao.com.br/wp-content/uploads/2023/05/Banda-Corpo-e-Alma-1.jpg'            
            />
            <section className="section-4">
                <div className='content-3'>
                    <h2 className='title-associado-2'>Horário de Funcionamento</h2>
                    <div className='open-button'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 13 18" fill="none">
                                <path d="M4.3 10.2429C4.61952 10.2429 4.92514 10.1109 5.14987 9.87747C5.37446 9.64412 5.5 9.32842 5.5 9C5.5 8.67158 5.37446 8.35588 5.14987 8.12253C4.92514 7.88905 4.61952 7.75714 4.3 7.75714C3.98048 7.75714 3.67486 7.88905 3.45013 8.12253C3.22554 8.35588 3.1 8.67158 3.1 9C3.1 9.32842 3.22554 9.64412 3.45013 9.87747C3.67486 10.1109 3.98048 10.2429 4.3 10.2429ZM3.2 0.9C2.58874 0.9 2.00333 1.15232 1.57232 1.60012C1.14143 2.0478 0.9 2.65419 0.9 3.28571V14.7143C0.9 15.3458 1.14143 15.9522 1.57232 16.3999C2.00333 16.8477 2.58874 17.1 3.2 17.1H9.8C10.4113 17.1 10.9967 16.8477 11.4277 16.3999C11.8586 15.9522 12.1 15.3458 12.1 14.7143V3.28571C12.1 2.65419 11.8586 2.0478 11.4277 1.60012C10.9967 1.15232 10.4113 0.9 9.8 0.9H3.2ZM2.2 3.28571C2.2 3.00792 2.30625 2.74225 2.49423 2.54694C2.68209 2.35176 2.93604 2.24286 3.2 2.24286H9.8C10.064 2.24286 10.3179 2.35176 10.5058 2.54694C10.6938 2.74225 10.8 3.00792 10.8 3.28571V14.7143C10.8 14.9921 10.6938 15.2578 10.5058 15.4531C10.3179 15.6482 10.064 15.7571 9.8 15.7571H3.2C2.93604 15.7571 2.68209 15.6482 2.49423 15.4531C2.30625 15.2578 2.2 14.9921 2.2 14.7143V3.28571Z" fill="white" stroke="white" strokeWidth="0.2"/>
                            </svg>
                            <p>Aberto Agora</p>
                        </div>
                    </div>
                    <h2 className='title-associado'>Categorias</h2>
                    <div style={{ backgroundColor: '#B20710' }} className='category-button'>
                        <p>Gastronomia</p>
                    </div>
                    <div style={{ backgroundColor: '#E3121D' }} className='category-button'>
                        <p>Onde Comer</p>
                    </div>
                    <h2 className='title-associado'>Imagens</h2>
                    <ImgCarousel
                        imgArray={imgs}
                    />
                    <h2 className='title-associado'>Sobre Nós</h2>
                    <p className='sobre-nos'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis asperiores sint aliquam optio reiciendis molestias, cumque incidunt eos aut odit consequuntur a nisi sapiente rerum possimus neque expedita at adipisci? Lorem  dolor sit amet consectetur, adipisicing elit. Excepturi amet consectetur, incidunt fugit ducimus tempore! Rerum soluta dolores, maiores veniam eum molestiae qui dignissimos quos libero quam voluptatum perspiciatis hic.</p>

                    {contatos.length > 0 || redes.length > 0 || localization !== '' ? (
                        <Buttons
                            localization={localization}
                            contatos={contatos}
                            redes={redes}
                            openContatos={() => {
                                if (contatos !== undefined) {
                                    openPopup('contato');
                                }
                            }}
                            openRedes={() => {
                                if (redes !== undefined) {
                                    openPopup('rede');
                                }
                            }}
                        />
                    ) : null}

                </div>
            </section>
        </>
    )
}

export default Evento;
