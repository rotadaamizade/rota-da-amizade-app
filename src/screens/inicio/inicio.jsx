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
        console.log(tempCards)
        
    }, [])

    const getAssociados = async () => {

        const q = query(collection(db, "associados"), where("plano", "==", "black"));
        const data = await getDocs(q)

        const associadosData = [];

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
            associadosData.push(associadoData);
        });
        tempCards.push(associadosData)
        getEventos(associadosData, 'associados')
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
                dates: [],
                municipio: '',
                realizador: ''
            };
            municipiosData.push(municipioData)
        });

        tempCards.push(municipiosData)
        getAtrativos(municipiosData)
        getEventos(municipiosData, 'municipios')
    }

    const getEventos = async (refs, type) => {

        const eventosData = [];

        for (const ref of refs) {
            const q = query(collection(db, "eventos"), where("realizador", "==", ref.nome));
            const data = await getDocs(q)
            data.forEach((doc) => {
                const eventoData = {
                    id: doc.id,
                    descricao: doc.data().realizador,
                    nome: doc.data().nome,
                    imgCard: doc.data().imgCard.url,
                    type: 'evento',
                    dates: doc.data().data,
                    municipio: doc.data().municipio,
                    realizador: ''
                };

                eventosData.push(eventoData);
            });
        }

        tempCards.push(eventosData)
    }

    const getAtrativos = async (refs) => {

        const atrativosData = [];

        for (const ref of refs) {
            const q = query(collection(db, "atrativos"), where("municipio", "==", ref.nome));
            const data = await getDocs(q)
            data.forEach((doc) => {
                const atrativoData = {
                    id: doc.id,
                    descricao: doc.data().realizador,
                    nome: doc.data().nome,
                    imgCard: doc.data().imgCard.url,
                    type: 'evento',
                    dates: [],
                    municipio: doc.data().municipio,
                    realizador: ''
                };

                atrativosData.push(atrativoData);
            });
        }
        tempCards.push(atrativosData)
    }

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
            <div style={{ paddingBottom: `calc(75px + ${titleHeight}px` }} className="card-container">

                <h1>TESTE ANALYTICS</h1>

            </div>
        </motion.section>

    )
}

export default Inicio