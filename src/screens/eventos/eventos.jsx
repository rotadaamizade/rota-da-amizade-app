import { useEffect } from "react"
import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import Card from "../../components/card/card"
import SectionTitle from "../../components/sectionTitle/sectionTitle"
import Search from "../../components/search/search"
import Categories from "../../components/categories/categories"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/firebase"
import { getAnalytics, logEvent } from "firebase/analytics"

function Eventos() {

    const { navbarState, setNavbarState, globalCity } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [titleHeight, setTitleHeight] = useState(0)
    const [category, setCategory] = useState('')
    const [events, setEvents] = useState([])
    const analytics = getAnalytics()

    useEffect(() => {
        if (navbarState != 'eventos') {
            setNavbarState('eventos')
        }
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'Eventos',
            firebase_screen_class: 'Telas Principais'
        })
        getEventos()
    }, [])

    useEffect(() => {
        const titleDiv = document.getElementById('title-div')
        let height = titleDiv.offsetHeight

        setTitleHeight(height)
    }, [globalCity])

    const handleSearch = (value) => {
        setSearchTerm(value)
    }

    const getEventos = async () => {
        try {
            const data = await getDocs(collection(db, "eventos"))
            const eventsData = []

            data.forEach((doc) => {
                const eventData = {
                    id: doc.id,
                    city: doc.data().municipio,
                    nome: doc.data().nome,
                    imgCard: doc.data().imgCard.url,
                    realizador: doc.data().realizador,
                    type: 'evento',
                    typeRealizador: doc.data().tipo,
                    dates: doc.data().data,
                    ativo: doc.data().ativo,
                    categorias: doc.data().categorias
                }

                if (eventData.ativo) {
                    eventsData.push(eventData)
                }
            })

            setEvents(eventsData)
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error)
        }
    }

    return (
        <section className="section-1">
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
                    events.map((event, index) => {
                        if (
                            (event.city == globalCity || globalCity == '') &&
                            (event.nome.toUpperCase().startsWith(searchTerm.toLocaleUpperCase()) || searchTerm == '') &&
                            (event.categorias.some(cat => cat === category) || category == '')
                        ) {
                            return (
                                <Card
                                    key={index}
                                    name={event.nome}
                                    city={event.typeRealizador == 'municipio' ? 'Prefeitura de ' + event.realizador : event.realizador + ' | ' + event.city}
                                    img={event.imgCard}
                                    type={event.type}
                                    dates={event.dates != undefined ? event.dates : null}
                                    id={event.id}
                                    index={index}
                                />
                            )
                        }
                    }
                    )
                }
            </div>
        </section>
    )
}

export default Eventos