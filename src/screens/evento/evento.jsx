import './evento.css'
import { useContext, useEffect, useState, useRef, Fragment } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import Header2 from '../../components/header2/header2'
import ImgCarousel from '../../components/imgCarousel/imgCarousel'
import Buttons from '../../components/buttons/buttons'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import EventHour from '../../components/eventHour/eventHour'
import CategoryLabel from '../../components/categoryLabel/categoryLabel'
import Sobre from '../../components/sobre/sobre'
import { getAnalytics, logEvent } from "firebase/analytics"

function Evento() {

    const navigate = useNavigate()
    const { id } = useParams()
    const { navbarState, setNavbarState, categoriesEventos } = useContext(UserContext)
    const [popup, setPopup] = useState('')
    const [evento, setEvento] = useState({})
    const [imgArray, setImgArray] = useState([])
    const [redes, setRedes] = useState([])
    const [localizacao, setLocalizacao] = useState('')
    const [contatos, setContatos] = useState([])
    const [categories, setCategories] = useState([])
    const analytics = getAnalytics()

    useEffect(() => {
        if (navbarState !== 'eventos') {
            setNavbarState('eventos')
        }
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'Evento',
            firebase_screen_class: 'Telas Secundárias'
        })
        getEvento()
    }, [])

    const getEvento = async () => {

        try {
            const docRef = doc(db, "eventos", id)
            const docSnap = await getDoc(docRef)
            setEvento(docSnap.data())

            let categoriesTemp = []

            docSnap.data().categorias.forEach((category, element) => {

                categoriesEventos.forEach((category2, index) => {

                    if (category2.nome == category) {
                        categoriesTemp.push({ nome: category2.nome, cor: category2.corPrincipal })
                    }
                })
            });

            setCategories(categoriesTemp)

            let imgArrayTemp = []

            docSnap.data().imgs.forEach((img, index) => {
                imgArrayTemp.push(img.url)
            });

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
            navigate(`/`)
            console.log(error)
        }
    }


    const background = useRef()
    const redespopup = useRef()
    const contatopopup = useRef()

    const closePopup = (type) => {

        setPopup('')

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

        setPopup(type)

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
                    text1={evento.nome}
                    text2={evento.tipo == 'municipio' ? 'Prefeitura de ' + evento.realizador : evento.realizador + ' | ' + evento.municipio}
                    img={evento.imgCard != undefined ? evento.imgCard.url : undefined}
                />
                <section className="section-4">
                    <div className='content-3'>
                        {Object.keys(evento).length > 0 &&
                            <>
                                <h2 className='title-associado-2'>Data e Horário</h2>


                                <div className='data-horario-content'>
                                    {evento.data !== undefined ?
                                        evento.data
                                            .slice()
                                            .sort((a, b) => new Date(a.data) - new Date(b.data))
                                            .map((data, index) => {

                                                let dia = 0
                                                let mes = 0
                                                let ano = 0

                                                const partes = data.data.split('-')

                                                if (partes.length === 3) {
                                                    dia = partes[2]
                                                    mes = partes[1]
                                                    ano = partes[0]
                                                }

                                                return (
                                                    <EventHour
                                                        dia={dia}
                                                        mes={mes}
                                                        index={index}
                                                        data={data}
                                                        evento={evento}
                                                        key={index}
                                                    />
                                                )
                                            })
                                        : null
                                    }
                                </div>



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
                                    sobre={evento.sobre}
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

                            </>
                        }
                    </div>
                </section>
            </section>
        </>
    )
}

export default Evento
