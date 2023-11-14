import './atrativo.css'
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../UserContext"
import Header2 from '../../components/header2/header2';
import ImgCarousel from '../../components/imgCarousel/imgCarousel';
import Buttons from '../../components/buttons/buttons';
import { db } from '../../config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

function Atrativo() {
    const { id } = useParams();
    const { navbarState, setNavbarState, categoriesAtrativos } = useContext(UserContext)
    const [popup, setPopup] = useState('')
    const [atrativo, setAtrativo] = useState({})
    const [redes, setRedes] = useState([])
    const [localizacao, setLocalizacao] = useState('')
    const [contatos, setContatos] = useState([])
    const navigate = useNavigate()
    const [imgArray, setImgArray] = useState([])
    const [categories, setCategories] = useState([])


    useEffect(() => {
        if (navbarState !== 'atrativos') {
            setNavbarState('atrativos')
        }

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
            });

            setCategories(categoriesTemp)

            let imgArrayTemp = []

            docSnap.data().imgs.forEach((img, index) => {
                imgArrayTemp.push(img.url)
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

    const background = useRef();
    const redespopup = useRef();
    const contatopopup = useRef()

    const closePopup = (type) => {

        setPopup('')

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

        setPopup(type)

        background.current.style.zIndex = '4';
        background.current.style.opacity = '100%';

        if (type == 'contato') {
            contatopopup.current.style.opacity = '100%';
            contatopopup.current.style.zIndex = '5';
        } else {
            redespopup.current.style.opacity = '100%';
            redespopup.current.style.zIndex = '5';
        }
    }

    console.log(categories)

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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
            <Header2
                text1={atrativo.nome}
                text2={atrativo.municipio}
                img={atrativo.imgCard != undefined ? atrativo.imgCard.url : undefined}
            />
            <section className="section-4">
                <div className='content-3'>

                    <h2 className='title-associado-2'>Categorias</h2>
                    {categories.map((category, index) => (
                        <div key={index} style={{ backgroundColor: `#${category.cor}` }} className='category-button'>
                            <p>{category.nome}</p>
                        </div>
                    ))}

                    <h2 className='title-associado'>Sobre Nós</h2>
                    <p className='sobre-nos'>{atrativo.sobre}</p>

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
            </section>
            </motion.div>
        </>
    )
}

export default Atrativo;
