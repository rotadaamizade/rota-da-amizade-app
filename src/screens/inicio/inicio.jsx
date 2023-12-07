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
    const [municipiosRef, setMunicipiosRef] = useState([])
    const [atrativos, setAtrativos] = useState([])
    const [eventosAssociados, setEventosAssociados] = useState([])
    const [eventosMunicipios, setEventosMunicipios] = useState([])
    const [cards, setCards] = useState([])
    const [associados, setAssociados] = useState([])
    const [municipios, setMunicipios] = useState([])


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

        const associadosData = [];

        data.forEach((doc) => {
            const associadoData = {
                id: doc.id,
                municipio: doc.data().municipio,
                nome: doc.data().nome,
                imgCard: doc.data().imgCard.url,
                type: 'associado',
                dates: null
            };
            associadosData.push(associadoData);
        });

        setAssociados(associadosData);
    }

    const getMunicipios = async () => {

        const q = query(collection(db, "municipios"), where("plano", "==", "black"));
        const data = await getDocs(q)

        const municipiosData = [];

        data.forEach((doc) => {
            const municipioData = {
                id: doc.id,
                descricao: doc.data().descricao,
                nome: doc.data().municipio,
                imgCard: doc.data().imgCard.url,
                type: 'municipio',
                dates: null
            };
            municipiosData.push(municipioData);
        });

        setMunicipios(municipiosData)
        getEventosMunicipios(municipiosData)
    }

    const getEventosMunicipios = async (municipiosTemp) => {

        const eventosData = [];

        for (const municipio of municipiosTemp) {
            const q = query(collection(db, "eventos"), where("municipio", "==", municipio.nome));
            const data = await getDocs(q);
    
            data.forEach((doc) => {
                console.log(doc.data());
                const eventoData = {
                    id: doc.id,
                    realizador: doc.data().realizador,
                    nome: doc.data().nome,
                    imgCard: doc.data().imgCard.url,
                    type: 'evento',
                    dates: doc.data().data,
                    municipio: doc.data().municipio
                };
    
                console.log(doc.data());
                eventosData.push(eventoData);
            });
        }

        setEventosMunicipios(eventosData);
    }

    // const getAtrativos = async () => {

    // }

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
            <Search
                onSearch={null}
            />
            <div style={{ paddingBottom: `calc(75px + ${titleHeight}px` }} className="card-container">

                {
                    associados.map((card, index) => (
                        <Card
                            key={index}
                            name={card.nome}
                            city={card.municipio}
                            svg={card.categorySvg}
                            img={card.imgCard}
                            type={card.type}
                            dates={card.dates != null ? card.dates : null}
                            id={card.id}
                        />
                    ))
                }
                {
                    municipios.map((card, index) => (
                        <CityCard
                            key={index}
                            img={card.imgCard}
                            name={card.nome}
                            slogan={card.descricao}
                            id={card.id}
                            index={index}
                        />
                    ))
                }
                {
                    eventosMunicipios.map((card, index) => (
                        <Card
                            key={index}
                            name={card.nome}
                            city={card.realizador == card.municipio ? "Prefeitura de " + card.municipio : card.realizador}
                            svg={card.categorySvg}
                            img={card.imgCard}
                            type={card.type}
                            dates={card.dates != null ? card.dates : null}
                            id={card.id}
                        />
                    ))
                }

            </div>
        </motion.section>

    )
}

export default Inicio