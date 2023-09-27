import { useEffect, useState } from "react"
import React, { useContext } from 'react'
import { UserContext } from '../../UserContext';
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import Search from "../../components/search/search";
import CityCard from "../../components/cityCard/cityCard";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import Loading from "../../components/loading/loading";

function Municipios(){

    const { navbarState, setNavbarState } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [cities, setCities] = useState([])

    useEffect(() => {
        if(navbarState != 'municipios'){
            setNavbarState('municipios')
        }
        getCities()
    }, [])

    const getCities = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "municipios"));
          const citiesData = [];
      
          querySnapshot.forEach((doc) => {
            const cityData = { id: doc.id, ...doc.data() };
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

    return(
        <section className="section-2">
            <SectionTitle
                text1='Municípios da'
                text2='Rota da Amizade'
            />
            
            <Search
                onSearch={handleSearch}
            />
            <div className="card-container">
            {cities.length === 0 ? (
                <Loading />
            ) : (
                cities.map((card, index) => (
                <CityCard
                    key={index}
                    img={card.imgCard}
                    name={card.municipio}
                    slogan={card.descricao}
                    id={card.id}
                />
                ))
            )}
            </div>

        </section>
    )
}

export default Municipios