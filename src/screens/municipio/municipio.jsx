import './municipio.css'
import { useContext, useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import SliderMenu from "../../components/sliderMenu/sliderMenu"
import Card from '../../components/card/card'
import Header2 from '../../components/header2/header2'
import ImgCarousel from '../../components/imgCarousel/imgCarousel'
import Buttons from '../../components/buttons/buttons'
import { db } from '../../config/firebase'
import { getDoc, doc, query, collection, where, getDocs } from 'firebase/firestore'
import Sobre from '../../components/sobre/sobre'
import EmptyList from '../../components/emptyList/emptyList'
import { getAnalytics, logEvent } from "firebase/analytics";

function Municipio() {
    const { id } = useParams()
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
    const analytics = getAnalytics();
    const content = useRef(null)

    useEffect(() => {
        if (navbarState !== 'municipios') {
            setNavbarState('municipios')
        }
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'Município',
            firebase_screen_class: 'Telas Secundárias'
        });
        getCity()
    }, [])

    useEffect(() => {
        if (menuActive === menus[0]) {
            if (content.current) {
                content.current.style.transform = 'translateX(0)'
            }
        } else if (menuActive === menus[1]) {
            if (content.current) {
                content.current.style.transform = 'translateX(-50%)'
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
            })

            logEvent(analytics, 'screen_view', {
                firebase_screen: 'Município: ' + docSnap.data().municipio,
                firebase_screen_class: 'Municípios'
            })

            setImgArray(imgArrayTemp)
            getAtrativos(docSnap.data().municipio)

            if (docSnap.data().redesSociais != undefined) {
                setRedes(docSnap.data().redesSociais)
            }

            if (docSnap.data().contatos != undefined) {
                setContatos(docSnap.data().contatos)
            }

            if (docSnap.data().localizacao != undefined) {
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

    const getAtrativos = async (city) => {

        const q = query(collection(db, "atrativos"), where("municipio", "==", city))
        const data = await getDocs(q)

        const atrativosData = []

        data.forEach((doc) => {
            const atrativoData = {
                id: doc.id,
                municipio: doc.data().municipio,
                nome: doc.data().nome,
                imgCard: doc.data().imgCard,
                type: 'atrativo'
            }

            atrativosData.push(atrativoData)
        })

        setAtrativos(atrativosData)
    }

    const background = useRef()
    const redespopup = useRef()
    const contatopopup = useRef()

    const closePopup = (type) => {
        background.current.style.opacity = '0'


        if (type == 'contato') {
            contatopopup.current.style.opacity = '0'
        } else {
            redespopup.current.style.opacity = '0'
        }

        setTimeout(() => {
            background.current.style.zIndex = '-1'

            if (type == 'contato') {
                contatopopup.current.style.zIndex = '-1'
            } else {
                redespopup.current.style.zIndex = '-1'
            }
        }, 200)
    }

    const openPopup = (type) => {

        background.current.style.zIndex = '4'
        background.current.style.opacity = '100%'

        if (type == 'contato') {
            contatopopup.current.style.opacity = '100%'
            contatopopup.current.style.zIndex = '5'
        } else {
            redespopup.current.style.opacity = '100%'
            redespopup.current.style.zIndex = '5'
        }
    }

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
                            redes.map((contato, index) => {
                                if (contato.name == 'Facebook') {
                                    return (
                                        <a href={contato.url} target='_blank'>
                                            <div key={index} style={{ backgroundColor: '#3b5998' }} className='rede-button popup-buttons'>{contato.name}</div>
                                        </a>
                                    )
                                } else if (contato.name == 'Twitter') {
                                    return (
                                        <a href={contato.url}  target='_blank'>
                                            <div key={index} style={{ backgroundColor: '#00aced' }} className='rede-button popup-buttons'>{contato.name}</div>
                                        </a>
                                    )
                                } else if (contato.name == 'Instagram') {
                                    return (
                                        <a href={contato.url}  target='_blank'>
                                            <div key={index} style={{ backgroundColor: '#FD1D1D' }} className='rede-button popup-buttons'>{contato.name}</div>
                                        </a>
                                    )
                                } else {
                                    return (
                                        <a href={contato.url} target='_blank'>
                                            <div key={index} className='rede-button popup-buttons'>{contato.name}</div>
                                        </a>
                                    )
                                }

                            }
                            )
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
                            contatos.map((contato, index) => {
                                if (contato.name == 'Whatsapp') {
                                    return (
                                        <a href={`https://wa.me/${contato.url}?text=Olá`} target='_blank'>
                                            <div key={index} style={{ backgroundColor: '#25d366' }} className='rede-button popup-buttons'>{contato.name}</div>
                                        </a>
                                    )
                                } else if (contato.name == 'Email') {
                                    return (
                                        <a href="" target='_blank'>
                                            <div key={index} style={{ backgroundColor: '#ca3625' }} className='rede-button popup-buttons'>{contato.name}</div>
                                        </a>
                                    )
                                } else if (contato.name == 'Telefone') {
                                    return (
                                        <a href="" target='_blank'>
                                            <div key={index} style={{ backgroundColor: '#000' }} className='rede-button popup-buttons'>{contato.name}</div>
                                        </a>
                                    )
                                } else {
                                    return (
                                        <a href={contato.url} target='_blank'>
                                            <div key={index} className='rede-button popup-buttons'>{contato.name}</div>
                                        </a>
                                    )
                                }

                            }
                            )
                        }
                        <div className='close-button-container'>
                            <div onClick={() => closePopup('contato')} className='close-button popup-buttons'>Fechar</div>
                        </div>
                    </div>
                </div>
            )}
            <section className='motion-section'>
                <Header2
                    text1={city.municipio}
                    text2={city.descricao}
                    img={city.imgCard != undefined ? city.imgCard.url : undefined}
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
                            {Object.keys(city).length > 0 &&
                                <div>
                                    <h2 className='title-associado'>Sobre {city.municipio}</h2>
                                    <Sobre
                                        sobre={city.sobre}
                                    />

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
                                                    openPopup('contato')
                                                }
                                            }}
                                            openRedes={() => {
                                                if (redes !== undefined) {
                                                    openPopup('rede')
                                                }
                                            }}
                                        />
                                    ) : null}
                                </div>
                            }
                        </div>

                        <div className="content-2">{atrativos.length == 0 ?
                            <EmptyList
                                type={'Atrativos'}
                            />
                            :
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
            </section >
        </>
    )
}

export default Municipio