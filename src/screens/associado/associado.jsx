import './associado.css'
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import SliderMenu from "../../components/sliderMenu/sliderMenu";
import Card from '../../components/card/card';
import HeaderAssociado from '../../components/headerAssociado/headerAssociado';
import ImgCarousel from '../../components/imgCarousel/imgCarousel';
import Buttons from '../../components/buttons/buttons';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { motion } from 'framer-motion';

function Associado() {

    const navigate = useNavigate()
    const { id } = useParams();
    const { navbarState, setNavbarState, categoriesAssociados } = useContext(UserContext)
    const menus = ['Informações', 'Eventos']
    const [menuActive, setMenuActive] = useState(menus[0])
    const [associado, setAssociado] = useState([])
    const [redes, setRedes] = useState([])
    const [localizacao, setLocalizacao] = useState('')
    const [contatos, setContatos] = useState([])
    const [imgArray, setImgArray] = useState([])
    const [categories, setCategories] = useState([])
    const [eventos, setEventos] = useState([])

    const content = useRef(null);

    useEffect(() => {
        if (navbarState !== 'associados') {
            setNavbarState('associados')
        }

        getAssociado()
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

    const getAssociado = async () => {

        try {
            const docRef = doc(db, "associados", id)
            const docSnap = await getDoc(docRef)
            setAssociado(docSnap.data())
            getEventos(docSnap.data().nome)

            console.log(docSnap.data())

            let categoriesTemp = []

            docSnap.data().categorias.forEach((category, element) => {

                categoriesAssociados.forEach((category2, index) => {

                    if (category2.nome == category) {
                        categoriesTemp.push({ nome: category2.nome, cor: category2.corPrincipal })
                    }
                })
            });

            setCategories(categoriesTemp)

            let imgArrayTemp = []

            docSnap.data().imgs.forEach((img, index) => {
                imgArrayTemp.push(img.url)
                console.log(img)
            });

            setImgArray(imgArrayTemp)

            if (docSnap.data().redes != undefined) {
                setRedes(docSnap.data().redes)
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

        const q = query(collection(db, "eventos"), where("realizador", "==", nome));
        const data = await getDocs(q)

        const eventosData = [];

        data.forEach((doc) => {
            const eventoData = {
                id: doc.id,
                realizador: doc.data().realizador,
                nome: doc.data().nome,
                imgCard: doc.data().imgCard,
                type: 'evento',
                dates: doc.data().data
            };

            eventosData.push(eventoData);
        });

        setEventos(eventosData);
    }

    const background = useRef();
    const redespopup = useRef();
    const contatopopup = useRef()

    const closePopup = (type) => {
        background.current.style.opacity = '0';


        if (type == 'contato') {
            contatopopup.current.style.opacity = '0';
        } else {
            redespopup.current.style.opacity = '0';
        }

        setTimeout(() => {
            background.current.style.zIndex = '-1';

            if (type == 'contato') {
                contatopopup.current.style.zIndex = '-1';
            } else {
                redespopup.current.style.zIndex = '-1';
            }
        }, 200);
    };

    const openPopup = (type) => {

        background.current.style.zIndex = '4';
        background.current.style.opacity = '100%';

        if (type == 'contato') {
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

            <motion.section
                className='event-section'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >

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
                        <div>

                        </div>
                        <div className="content-1">

                            <h2 className='title-associado'>Categorias</h2>
                            {categories.map((category, index) => (
                                <div key={index} style={{ backgroundColor: `#${category.cor}` }} className='category-button'>
                                    <p>{category.nome}</p>
                                </div>
                            ))}
                            <h2 className='title-associado'>Imagens</h2>
                            <ImgCarousel
                                imgArray={imgArray}
                            />
                            <h2 className='title-associado'>Sobre Nós</h2>
                            <p className='sobre-nos'>{associado.sobre}</p>
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
                        <div className="content-2">{
                            eventos.map((evento, index) => (
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

            </motion.section>


        </>
    )
}

export default Associado
