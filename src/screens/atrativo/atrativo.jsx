import { useContext, useEffect, useState, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import Header2 from '../../components/header2/header2'
import ImgCarousel from '../../components/imgCarousel/imgCarousel'
import Buttons from '../../components/buttons/buttons'
import { db } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import CategoryLabel from '../../components/categoryLabel/categoryLabel'
import Sobre from '../../components/sobre/sobre'
import { getAnalytics, logEvent } from "firebase/analytics"

function Atrativo() {
    const { id } = useParams()
    const { navbarState, setNavbarState, categoriesAtrativos } = useContext(UserContext)
    const [popup, setPopup] = useState('')
    const [atrativo, setAtrativo] = useState({})
    const [redes, setRedes] = useState([])
    const [localizacao, setLocalizacao] = useState('')
    const [contatos, setContatos] = useState([])
    const navigate = useNavigate()
    const [imgArray, setImgArray] = useState([])
    const [categories, setCategories] = useState([])
    const analytics = getAnalytics()

    useEffect(() => {
        if (navbarState !== 'atrativos') {
            setNavbarState('atrativos')
        }
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'Atrativo',
            firebase_screen_class: 'Telas Secundárias'
        })
        getAtrativo()
    }, [])

    const getAtrativo = async () => {

        try {
            const docRef = doc(db, "atrativos", id)
            const docSnap = await getDoc(docRef)
            setAtrativo(docSnap.data())

            let categoriesTemp = []

            docSnap.data().categorias.forEach((category, element) => {

                categoriesAtrativos.forEach((category2, index) => {

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

    const handleCopyToClipboard = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log('Texto copiado com sucesso!');
            })
            .catch((error) => {
                console.error('Erro ao copiar texto:', error);
            });
    };

    return (
        <section className='motion-section'>

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
                                            handleCopyToClipboard(contato.url)
                                        }} key={index} style={{ backgroundColor: '#ca3625' }} className='rede-button popup-buttons'>{contato.name}</div>
                                    )
                                } else if (contato.name == 'Telefone') {
                                    return (

                                        <div onClick={() => {
                                            handleCopyToClipboard(contato.url)
                                        }} key={index} style={{ backgroundColor: '#000' }} className='rede-button popup-buttons'>{contato.name}</div>
                                    )
                                } else {
                                    return (
                                        <div onClick={() => {
                                            handleCopyToClipboard(contato.url)
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
            <Header2
                text1={atrativo.nome}
                text2={atrativo.municipio}
                img={atrativo.imgCard != undefined ? atrativo.imgCard.url : undefined}
            />
            <section className="section-4">
                <div className='content-3'>
                    {Object.keys(atrativo).length > 0 &&
                        <>

                            <h2 className='title-associado-2'>Categorias</h2>
                            {categories.map((category, index) => (
                                <CategoryLabel
                                    key={index}
                                    category={category}
                                    index={index}
                                />
                            ))}

                            <h2 className='title-associado'>Sobre Nós</h2>
                            <Sobre
                                sobre={atrativo.sobre}
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

                        </>
                    }
                </div>
            </section>
        </section>
    )
}

export default Atrativo
