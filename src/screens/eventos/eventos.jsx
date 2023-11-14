import { useEffect } from "react"
import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext';
import Card from "../../components/card/card";
import CityFilter from "../../components/cityFilter/cityFilter";
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import Search from "../../components/search/search";
import Categories from "../../components/categories/categories";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase"
import { motion } from "framer-motion";

function Eventos() {

    const { navbarState, setNavbarState, globalCity, globalCategory } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [titleHeight, setTitleHeight] = useState(0);
    const [category, setCategory] = useState('')
    const [events, setEvents] = useState([])


    useEffect(() => {
        if (navbarState != 'eventos') {
            setNavbarState('eventos')
        }

        getEventos()
    }, [])

    useEffect(() => {
        const titleDiv = document.getElementById('title-div')
        let height = titleDiv.offsetHeight

        setTitleHeight(height)
    }, [globalCity])

    const handleSearch = (value) => {
        setSearchTerm(value);
    }

    const getEventos = async () => {
        try {
            const data = await getDocs(collection(db, "eventos"));
            const eventsData = [];



            data.forEach((doc) => {
                console.log(doc.data())
                const eventData = {
                    id: doc.id,
                    city: doc.data().municipio,
                    nome: doc.data().nome,
                    imgCard: doc.data().imgCard.url,
                    realizador: doc.data().realizador,
                    type: 'evento',
                    typeRealizador: doc.data().tipo,
                    dates: doc.data().data
                };

                eventsData.push(eventData);
            });

            setEvents(eventsData);
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: {duration: 0.25} }}
            className="section-1">
            <SectionTitle
                text1={globalCity == '' ? 'Eventos da' : 'Eventos de'}
                text2={globalCity == '' ? 'Rota da Amizade' : globalCity}
            />
            <Search
                onSearch={handleSearch}
            />
            <div style={{ paddingBottom: `calc(75px + ${titleHeight}px` }} className="card-container">
                <Categories category={category} setCategory={setCategory} type={'eventos'} />
                {
                    events.map((event, index) => (
                        <Card
                            key={index}
                            name={event.nome}
                            city={event.typeRealizador == 'municipio' ? 'Prefeitura de ' + event.realizador : event.realizador + ' | ' + event.city}
                            svg={event.categorySvg}
                            img={event.imgCard}
                            type={event.type}
                            dates={event.dates != undefined ? event.dates : null}
                            id={event.id}
                            index={index}
                        />
                    ))
                }
            </div>
        </motion.section>
    )
}

export default Eventos