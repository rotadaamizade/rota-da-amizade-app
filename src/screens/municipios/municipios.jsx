import { useEffect, useState } from "react"
import React, { useContext } from 'react'
import { UserContext } from '../../UserContext';
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import Search from "../../components/search/search";
import CityCard from "../../components/cityCard/cityCard";

function Municipios(){

    const { navbarState, setNavbarState } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('');

    const cards = [
        {
            id: 1,
            city: 'Videira',
            slogan: 'O berço da uva e do vinho',
            img: 'https://live.staticflickr.com/4083/5001988006_2cd94aa9eb_b.jpg',
        },
        {
            id: 2,
            city: 'Videira',
            slogan: 'O berço da uva e do vinho',
            img: 'https://live.staticflickr.com/4083/5001988006_2cd94aa9eb_b.jpg',
        },
        {
            id: 2,
            city: 'Videira',
            slogan: 'O berço da uva e do vinho',
            img: 'https://live.staticflickr.com/4083/5001988006_2cd94aa9eb_b.jpg',
        },
        {
            id: 3,
            city: 'Videira',
            slogan: 'O berço da uva e do vinho',
            img: 'https://live.staticflickr.com/4083/5001988006_2cd94aa9eb_b.jpg',
        },
        {
            id: 4,
            city: 'Videira',
            slogan: 'O berço da uva e do vinho',
            img: 'https://live.staticflickr.com/4083/5001988006_2cd94aa9eb_b.jpg',
        },
        {
            id: 5,
            city: 'Videira',
            slogan: 'O berço da uva e do vinho',
            img: 'https://live.staticflickr.com/4083/5001988006_2cd94aa9eb_b.jpg',
        }
    ]

    useEffect(() => {
        if(navbarState != 'municipios'){
            setNavbarState('municipios')
        }
    }, [])

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
            {
                cards.map((card, index) => (
                    <CityCard
                        key={index}
                        img={card.img}
                        name={card.city}
                        slogan={card.slogan}
                        id={card.id}
                    />
                ))
            }
            </div>
        </section>
    )
}

export default Municipios