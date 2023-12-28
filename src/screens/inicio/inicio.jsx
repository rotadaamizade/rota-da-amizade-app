import { useEffect } from "react"
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext';
import Card from "../../components/card/card";
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import Search from "../../components/search/search";
import { motion } from "framer-motion";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import CityCard from "../../components/cityCard/cityCard";

function Inicio() {

    const { navbarState, setNavbarState, globalCity } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [titleHeight, setTitleHeight] = useState(0);
    const [associados, setAssociados] = useState([])
    const [municipios, setMunicipios] = useState([])
    const [cards, setCards] = useState([])

    let tempCards = []

    useEffect(() => {
        const titleDiv = document.getElementById('title-div')
        let height = titleDiv.offsetHeight

        setTitleHeight(height)
    }, [globalCity])

    useEffect(() => {
        if (navbarState != 'inicio') {
            setNavbarState('inicio')
        }

        getAssociados()
        getMunicipios()

    }, [])

    const getAssociados = async () => {

        const q = query(collection(db, "associados"), where("plano", "==", "black"));
        const data = await getDocs(q)

        data.forEach((doc) => {
            const associadoData = {
                id: doc.id,
                descricao: null,
                nome: doc.data().nome,
                imgCard: doc.data().imgCard.url,
                type: 'associado',
                dates: [],
                municipio: doc.data().municipio,
                realizador: ''
            };
            tempCards.push(associadoData);
            setCards(tempCards)
        });
    }

    const getMunicipios = async () => {

        const q = query(collection(db, "municipios"));
        const data = await getDocs(q)

        data.forEach((doc) => {
            const municipioData = {
                id: doc.id,
                descricao: doc.data().descricao,
                nome: doc.data().municipio,
                imgCard: doc.data().imgCard.url,
                type: 'municipio',
                dates: [],
                municipio: '',
                realizador: ''
            };
            tempCards.push(municipioData)
            setCards(tempCards)
        });
    }

    console.log(cards)

    return (

        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { duration: 0.25 } }}
            className="section-1">
            <SectionTitle
                text1={globalCity == '' ? 'Recomendados da' : 'Recomendados de'}
                text2={globalCity == '' ? 'Rota da Amizade' : globalCity}
            />
            <div style={{ paddingBottom: `calc(20px + ${titleHeight}px` }} className="card-container">

                {
                    cards.map((card, index) => {
                        if (card.type == 'associado') {
                            return (
                                <Card
                                    key={index}
                                    name={card.nome}
                                    city={card.municipio}
                                    svg={card.categorySvg}
                                    img={card.imgCard}
                                    type={card.type}
                                    dates={card.dates != undefined ? card.dates : null}
                                    id={card.id}
                                    index={index}
                                />
                            )
                        } else if (card.type == 'municipio') {
                            return (
                                <CityCard
                                    key={index}
                                    img={card.imgCard}
                                    name={card.nome}
                                    slogan={card.descricao}
                                    id={card.id}
                                    index={index}
                                />
                            )
                        }
                    })
                }

            </div>
        </motion.section>

    )
}

export default Inicio