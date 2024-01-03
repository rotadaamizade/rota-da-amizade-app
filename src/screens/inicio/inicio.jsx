import { useEffect } from "react"
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext';
import Card from "../../components/card/card";
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import { motion } from "framer-motion";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import CityCard from "../../components/cityCard/cityCard";

function Inicio() {

    const { navbarState, setNavbarState, globalCity } = useContext(UserContext)
    // const [searchTerm, setSearchTerm] = useState('');
    const [titleHeight, setTitleHeight] = useState(0);
    const [cards, setCards] = useState([])


    useEffect(() => {
        const titleDiv = document.getElementById('title-div')
        let height = titleDiv.offsetHeight

        setTitleHeight(height)
    }, [globalCity])

    useEffect(() => {
        if (navbarState !== 'inicio') {
            setNavbarState('inicio');
        }
    
        fetchData()
    }, []);

    const fetchData = async () => {
        const associadosData = await getAssociados();
        const municipiosData = await getMunicipios();

        const vetorMesclado = associadosData.concat(municipiosData);
        const randomSort = () => Math.random() - 0.5;
        const vetorMescladoAleatorio = vetorMesclado.sort(randomSort);
        
        const combinedData = vetorMescladoAleatorio
        
        setCards(combinedData);
    };
    
    const getAssociados = async () => {
        const q = query(collection(db, "associados"), where("plano", "==", "black"));
        const data = await getDocs(q);

        const associados = []
    
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
            associados.push(associadoData)
        })
        return associados;
    };
    
    const getMunicipios = async () => {
        const q = query(collection(db, "municipios"));
        const data = await getDocs(q);
    
        const municipios = []
    
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
            municipios.push(municipioData)
        
        })
        return municipios;
        
    };

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
                                    index={index}w
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