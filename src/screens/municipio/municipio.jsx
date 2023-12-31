import './municipio.css'
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import SliderMenu from "../../components/sliderMenu/sliderMenu";
import Card from '../../components/card/card';
import Header2 from '../../components/header2/header2';
import ImgCarousel from '../../components/imgCarousel/imgCarousel';
import Buttons from '../../components/buttons/buttons';
import { db } from '../../config/firebase';
import { getDoc, doc, query, collection, where, getDocs } from 'firebase/firestore';
import Loading from '../../components/loading/loading';

function Municipio() {
    const { id } = useParams();
    const { navbarState, setNavbarState } = useContext(UserContext)
    const menus = ['Informações', 'Atrativos']
    const [menuActive, setMenuActive] = useState(menus[0])
    const [city, setCity] = useState({})
    const [redes, setRedes] = useState([])
    const [localizacao, setLocalizacao] = useState('')
    const [contatos, setContatos] = useState([])
    const [atrativos, setAtrativos] = useState([])
    const [imgArray, setImgArray] = useState([])
    const navigate = useNavigate()

    const content = useRef(null);

    useEffect(() => {
        if (navbarState !== 'municipios') {
            setNavbarState('municipios')
        }

        getCity()

    }, [])

    useEffect(() => {
        if (menuActive === menus[0]) {
            if (content.current) {

                content.current.style.transform = 'translateX(0)';
            }
        } else if (menuActive === menus[1]) {
            if (content.current) {
                
                content.current.style.transform = 'translateX(-50%)';
            }
        }
    }, [menuActive])

    const getCity = async () => {

        try {
          const docRef = doc(db, "municipios", id)
          const docSnap = await getDoc(docRef)
          setCity(docSnap.data())

          let imgArrayTemp = []

          docSnap.data().imgs.forEach((img, index) => {
            imgArrayTemp.push(img.url)
          });

          setImgArray(imgArrayTemp)

          getAtrativos(docSnap.data().municipio)

          if(docSnap.data().redesSociais != undefined){
            setRedes(docSnap.data().redesSociais)
          }

          if(docSnap.data().contatos != undefined){
            setContatos(docSnap.data().contatos)
          }

          if(docSnap.data().localizacao != undefined){
            setLocalizacao(docSnap.data().localizacao)
          }
        

          if (!docSnap.exists()) {
            navigate(`/`)
          }
        } catch (error) {
            navigate(`/`)
            console.log(error)
        }
    }

    console.log(city)

    const getAtrativos = async (city) => {

        const q = query(collection(db, "atrativos"), where("municipio", "==", city));
        const data = await getDocs(q)

        const atrativosData = [];
      
        data.forEach((doc) => {
          const atrativoData = {
            id: doc.id,
            municipio: doc.data().municipio,
            nome: doc.data().nome,
            imgCard: doc.data().imgCard,
            type: 'atrativo'
          };
          
          atrativosData.push(atrativoData);
        });
    
        setAtrativos(atrativosData);
      }

    const background = useRef();
    const redespopup = useRef();
    const contatopopup = useRef()

    const closePopup = (type) => {
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
            <div onClick={() => {
                closePopup('contato')
                closePopup('redes')
            }} ref={background} className='popup-background'></div>
            {redes !== undefined && (
                <div ref={redespopup} className='redes-popup' >
                    <div>
                        {
                            redes.map((rede, index) => (
                                <div key={index} style={{ backgroundColor: `#${rede.color}` }} className='rede-button popup-buttons'>{rede.name}</div>
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
                                <div key={index} style={{ backgroundColor: `#${contato.color}` }} className='rede-button popup-buttons'>{contato.name}</div>
                            ))
                        }
                        <div className='close-button-container'>
                            <div onClick={() => closePopup('contato')} className='close-button popup-buttons'>Fechar</div>
                        </div>
                    </div>
                </div>
            )}

            <Header2 
                text1 = {city.municipio}
                text2 = {city.descricao}
                img = {city.imgCard != undefined ? city.imgCard.url : undefined}        
            />

            <section className="section-3">
                <SliderMenu
                    menus={menus}
                    menuActive={menuActive}
                    setMenuActive={setMenuActive}
                />
                <div ref={content} className="all-content-page">
                <div>
                    
                </div>
                <div className="content-1">
                {Object.keys(city).length === 0 ? (
                    <Loading />
                    ) : (
                    <div>
                        <h2 className='title-associado'>Sobre {city.municipio}</h2>
                        <p className='sobre-nos'>{city.sobre}</p>

                        <h2 className='title-associado'>Imagens</h2>
                        <ImgCarousel
                            imgArray={imgArray}
                        />

                        {contatos.length > 0 || redes.length > 0 || localizacao !== '' ? (
                            <Buttons
                                localization={localizacao}
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
                    )}
                    </div>

                    <div className="content-2">{ 
                    atrativos.map((card, index) => (
                        <Card
                            key={index}
                            name={card.nome}
                            city={card.municipio}
                            svg={card.categorySvg}
                            img={card.imgCard.url}
                            type={card.type}
                            dates={card.dates != undefined ? card.dates : null}
                            id={card.id}
                        />
                    ))
                    }

                    </div>
                </div>
            </section>
        </>
    )
}

export default Municipio