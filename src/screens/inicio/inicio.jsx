import { useEffect } from "react"
import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext';
import Card from "../../components/card/card";
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import Search from "../../components/search/search";
import Categories from "../../components/categories/categories";
import { motion } from "framer-motion";

function Inicio(){

    const { navbarState, setNavbarState, globalCity, globalCategory  } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [titleHeight, setTitleHeight] = useState(0);

    useEffect(() => {
        if(navbarState != 'inicio'){
            setNavbarState('inicio')
        }
    }, [])

    useEffect(() => {
        const titleDiv = document.getElementById('title-div')
        let height = titleDiv.offsetHeight

        setTitleHeight(height)
    }, [globalCity])

    const handleSearch = (value) => {
      setSearchTerm(value);
    };

    return (
    
            <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: {duration: 0.25} }}
            className="section-1">
                <SectionTitle
                    text1 = {globalCity == '' ? 'Recomendados da' : 'Recomendados de'}
                    text2 = {globalCity == '' ? 'Rota da Amizade' : globalCity}
                />
                <Search
                    onSearch={handleSearch}
                />
                <div style={{paddingBottom: `calc(75px + ${titleHeight}px`}} className="card-container">

                    {
                        // filteredCards.map((card, index) => (
                        //     <Card
                        //         key={index}
                        //         name={card.name}
                        //         city={card.city}
                        //         svg={card.categorySvg}
                        //         img={card.img}
                        //         type={card.type}
                        //         dates={card.dates != undefined ? card.dates : null}
                        //     />
                        // ))
                    }
                </div>
            </motion.section>
    
    )
}

export default Inicio