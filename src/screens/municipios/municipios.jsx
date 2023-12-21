import { useEffect, useState } from "react"
import { useContext } from 'react'
import { UserContext } from '../../UserContext';
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import Search from "../../components/search/search";
import CityCard from "../../components/cityCard/cityCard";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

function Municipios() {

    const { navbarState, setNavbarState } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [cities, setCities] = useState([])
    const [titleHeight, setTitleHeight] = useState(0);

    useEffect(() => {
        if (navbarState != 'municipios') {
            setNavbarState('municipios')
        }
        getCities()

        const titleDiv = document.getElementById('title-div')
        let height = titleDiv.offsetHeight

        setTitleHeight(height)
    }, [])


    const getCities = async () => {
        try {
            const data = await getDocs(collection(db, "municipios"));
            const citiesData = [];

            data.forEach((doc) => {
                const cityData = {
                    id: doc.id,
                    municipio: doc.data().municipio,
                    descricao: doc.data().descricao,
                    imgCard: doc.data().imgCard
                };

                citiesData.push(cityData);
            });

            setCities(citiesData);
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    console.log(searchTerm);

    return (
        <motion.section
            initial={{ opacity: 0, top: '0' }}
            animate={{ opacity: 1, top: '0' }}
            exit={{ opacity: 0, transition: {duration: 0.25} }}
            className="section-2">
            <SectionTitle
                text1='Municípios da'
                text2='Rota da Amizade'
            />

            <Search
                onSearch={handleSearch}
            />
            <div style={{ paddingBottom: `calc(75px + ${titleHeight}px` }} className="card-container">
                {
                    cities.map((card, index) => (
                        <CityCard
                            key={index}
                            img={card.imgCard.url}
                            name={card.municipio}
                            slogan={card.descricao}
                            id={card.id}
                            index={index}
                        />
                    ))
                }
            </div>

        </motion.section>
    )
}

export default Municipios