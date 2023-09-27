import './atrativo.css'
import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import Header2 from '../../components/header2/header2';
import ImgCarousel from '../../components/imgCarousel/imgCarousel';
import Buttons from '../../components/buttons/buttons';

function Atrativo() {
    const { id } = useParams();
    const { navbarState, setNavbarState } = useContext(UserContext)
    const [popup, setPopup] = useState('')


    useEffect(() => {
        if (navbarState !== 'atrativos') {
            setNavbarState('atrativos')
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
                
                    <h2 className='title-associado-2'>Categorias</h2>
                    <div style={{ backgroundColor: '#B20710' }} className='category-button'>
                        <p>Gastronomia</p>
                    </div>
                    <div style={{ backgroundColor: '#E3121D' }} className='category-button'>
                        <p>Onde Comer</p>
                    </div>

                    <h2 className='title-associado'>Sobre Nós</h2>
                    <p className='sobre-nos'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis asperiores sint aliquam optio reiciendis molestias, cumque incidunt eos aut odit consequuntur a nisi sapiente rerum possimus neque expedita at adipisci? Lorem  dolor sit amet consectetur, adipisicing elit. Excepturi amet consectetur, incidunt fugit ducimus tempore! Rerum soluta dolores, maiores veniam eum molestiae qui dignissimos quos libero quam voluptatum perspiciatis hic.</p>

                    <h2 className='title-associado'>Imagens</h2>
                    <ImgCarousel
                        imgArray={imgs}
                    />
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

export default Atrativo;
