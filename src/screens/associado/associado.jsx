import './associado.css'
import { useContext, useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import SliderMenu from "../../components/sliderMenu/sliderMenu"
import Card from '../../components/card/card'
import HeaderAssociado from '../../components/headerAssociado/headerAssociado'
import ImgCarousel from '../../components/imgCarousel/imgCarousel'
import Buttons from '../../components/buttons/buttons'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import CategoryLabel from '../../components/categoryLabel/categoryLabel'
import Sobre from '../../components/sobre/sobre'
import EmptyList from '../../components/emptyList/emptyList'
import { getAnalytics, logEvent } from "firebase/analytics"

function Associado() {

    const navigate = useNavigate()
    const { id } = useParams()
    const { navbarState, setNavbarState, categoriesAssociados } = useContext(UserContext)
    const menus = ['Informações', 'Eventos']
    const [menuActive, setMenuActive] = useState(menus[0])
    const [associado, setAssociado] = useState({})
    const [redes, setRedes] = useState([])
    const [localizacao, setLocalizacao] = useState('')
    const [contatos, setContatos] = useState([])
    const [imgArray, setImgArray] = useState([])
    const [categories, setCategories] = useState([])
    const [eventos, setEventos] = useState([])
    const [copied, setCopied] = useState(false)
    const [copiedType, setCopiedType] = useState('')
    const analytics = getAnalytics()
    const content = useRef(null)

    useEffect(() => {
        if (navbarState !== 'associados') {
            setNavbarState('associados')
        }
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'Atrativos',
            firebase_screen_class: 'Telas Principais'
        })
        getAssociado()
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

    const getAssociado = async () => {

        try {
            const docRef = doc(db, "associados", id)
            const docSnap = await getDoc(docRef)
            setAssociado(docSnap.data())
            getEventos(docSnap.data().nome)

            logEvent(analytics, 'screen_view', {
                firebase_screen: 'Associado: ' + docSnap.data().nome,
                firebase_screen_class: 'Associados'
            })

            let categoriesTemp = []

            docSnap.data().categorias.forEach((category, element) => {

                categoriesAssociados.forEach((category2, index) => {

                    if (category2.nome == category) {
                        categoriesTemp.push({ nome: category2.nome, cor: category2.corPrincipal })
                    }
                })
            })

            setCategories(categoriesTemp)

            let imgArrayTemp = []

            docSnap.data().imgs.forEach((img, index) => {
                imgArrayTemp.push(img.url)
            })

            setImgArray(imgArrayTemp)

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
            console.log(error)
        }
    }

    const getEventos = async (nome) => {

        const q = query(collection(db, "eventos"), where("realizador", "==", nome))
        const data = await getDocs(q)

        const eventosData = []

        data.forEach((doc) => {
            const eventoData = {
                id: doc.id,
                realizador: doc.data().realizador,
                nome: doc.data().nome,
                imgCard: doc.data().imgCard,
                type: 'evento',
                dates: doc.data().data
            }
            eventosData.push(eventoData)
        })

        setEventos(eventosData)
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
        setCopied(false)
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

    const handleCopyToClipboard = (textToCopy, type) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                setCopiedType(type)
                if(!copied){
                    setCopied(true)
                    setTimeout(() => {
                        setCopied(false)
                    }, 2000);
                }
            })
    };

    const copiedPopup = useRef()

    useEffect(() => {
        if(copied == true){
            copiedPopup.current.style.opacity = '100%'
            copiedPopup.current.style.zIndex = '5'
        } else if(copied == false){
            copiedPopup.current.style.opacity = '0'
            setTimeout(() => {
                    copiedPopup.current.style.zIndex = '-1'
            }, 200)
        }
    }, [copied])

    return (
        <section className='motion-section'>

            <div onClick={() => {
                closePopup('contato')
                closePopup('redes')
            }} ref={background} className='popup-background'>
                <div ref={copiedPopup} className='copier-popup-container'>
                        <div className='copied-popup'>
                            <p>{copiedType} Copiado</p>
                            <svg fill="#00FF00" height="20px" width="20px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 492 492" xml:space="preserve">
                                <g>
                                    <g>
                                        <path d="M484.128,104.478l-16.116-16.116c-5.064-5.068-11.816-7.856-19.024-7.856c-7.208,0-13.964,2.788-19.028,7.856
        L203.508,314.81L62.024,173.322c-5.064-5.06-11.82-7.852-19.028-7.852c-7.204,0-13.956,2.792-19.024,7.852l-16.12,16.112
        C2.784,194.51,0,201.27,0,208.47c0,7.204,2.784,13.96,7.852,19.028l159.744,159.736c0.212,0.3,0.436,0.58,0.696,0.836
        l16.12,15.852c5.064,5.048,11.82,7.572,19.084,7.572h0.084c7.212,0,13.968-2.524,19.024-7.572l16.124-15.992
        c0.26-0.256,0.48-0.468,0.612-0.684l244.784-244.76C494.624,132.01,494.624,114.966,484.128,104.478z"/>
                                    </g>
                                </g>
                            </svg>
                        </div>
                </div>

            </div>
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
                                        <a href={contato.url} target='_blank'>
                                            <div key={index} style={{ backgroundColor: '#00aced' }} className='rede-button popup-buttons'>{contato.name}</div>
                                        </a>
                                    )
                                } else if (contato.name == 'Instagram') {
                                    return (
                                        <a href={contato.url} target='_blank'>
                                            <div key={index} style={{ backgroundColor: '#FD1D1D' }} className='rede-button popup-buttons'>{contato.name}</div>
                                        </a>
                                    )
                                } else if (contato.name == 'Site') {
                                    return (
                                        <a href={contato.url} target='_blank'>
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
                                        <a href={`https://wa.me/${contato.url}`} target='_blank'>
                                            <div key={index} style={{ backgroundColor: '#25d366' }} className='rede-button popup-buttons'>{contato.name}</div>
                                        </a>
                                    )
                                } else if (contato.name == 'Email') {
                                    return (

                                        <div onClick={() => {
                                            handleCopyToClipboard(contato.url, contato.name)
                                        }} key={index} style={{ backgroundColor: '#ca3625' }} className='rede-button popup-buttons'>{contato.name}</div>
                                    )
                                } else if (contato.name == 'Telefone') {
                                    return (

                                        <div onClick={() => {
                                            handleCopyToClipboard(contato.url, contato.name)
                                        }} key={index} style={{ backgroundColor: '#000' }} className='rede-button popup-buttons'>{contato.name}</div>
                                    )
                                } else {
                                    return (
                                        <div onClick={() => {
                                            handleCopyToClipboard(contato.url, contato.name)
                                        }} key={index} className='rede-button popup-buttons'>{contato.name}</div>
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

            <HeaderAssociado
                img={associado.imgCard != undefined ? associado.imgCard.url : undefined}
                logo={associado.imgLogo != undefined ? associado.imgLogo.url : undefined}
                municipio={associado.municipio}
                nome={associado.nome}
            />
            <section className="section-3">
                <SliderMenu
                    menus={menus}
                    menuActive={menuActive}
                    setMenuActive={setMenuActive}
                />
                <div ref={content} className="all-content-page">
                    <div className="content-1">
                        {Object.keys(associado).length > 0 &&
                            <>

                                <h2 className='title-associado'>Categorias</h2>
                                {categories.map((category, index) => (
                                    <CategoryLabel
                                        key={index}
                                        category={category}
                                        index={index}
                                    />
                                ))}

                                <ImgCarousel
                                    imgArray={imgArray}
                                />

                                <h2 className='title-associado'>Sobre Nós</h2>
                                <Sobre
                                    sobre={associado.sobre}
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
                            </>}
                    </div>

                    <div className="content-2">{
                        eventos.length == 0 ?
                            <EmptyList
                                type={'Eventos'}
                            />
                            : eventos.map((evento, index) => (
                                <Card
                                    key={index}
                                    name={evento.nome}
                                    city={evento.realizador}
                                    svg={evento.categorySvg}
                                    img={evento.imgCard != undefined ? evento.imgCard.url : undefined}
                                    type={evento.type}
                                    dates={evento.dates != undefined ? evento.dates : null}
                                    id={evento.id}
                                />
                            ))
                    }
                    </div>
                </div>
            </section>

        </section>

    )
}

export default Associado
