import { useEffect, useState } from "react"
import { useContext } from 'react'
import { UserContext } from '../../UserContext'
import SectionTitle from "../../components/sectionTitle/sectionTitle"
import Search from "../../components/search/search"
import CityCard from "../../components/cityCard/cityCard"
import { db } from "../../config/firebase"
import { collection, getDocs } from "firebase/firestore"
import { getAnalytics, logEvent } from "firebase/analytics";

function Municipios() {

    const { navbarState, setNavbarState } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [cities, setCities] = useState([])
    const [titleHeight, setTitleHeight] = useState(0)
    const analytics = getAnalytics()

    useEffect(() => {
        if (navbarState != 'municipios') {
            setNavbarState('municipios')
        }
        fetchData()

        const titleDiv = document.getElementById('title-div')
        let height = titleDiv.offsetHeight
        setTitleHeight(height)
        logEvent(analytics, 'screen_view', {
            firebase_screen: 'Município', 
            firebase_screen_class: 'Telas Principais'
            });
    }, [])


    const getCities = async () => {
        try {
            const data = await getDocs(collection(db, "municipios"))
            const citiesData = []

            data.forEach((doc) => {
                const cityData = {
                    id: doc.id,
                    municipio: doc.data().municipio,
                    descricao: doc.data().descricao,
                    imgCard: doc.data().imgCard,
                    ativo: doc.data().ativo,
                }

                if (cityData.ativo) {
                    citiesData.push(cityData)
                }
            })

            return citiesData
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error)
        }
    }

    const fetchData = async () => {
        const municipiosData = await getCities()
        
        const randomSort = () => Math.random() - 0.5
        const ramdomData = municipiosData.sort(randomSort)

        setCities(ramdomData)
    }

    const handleSearch = (value) => {
        setSearchTerm(value)
    }

    return (
        <section className="section-2">
            <SectionTitle
                text1='Municípios da'
                text2='Rota da Amizade'
            />

            <Search
                onSearch={handleSearch}
            />
            <div style={{ paddingBottom: `calc(75px + ${titleHeight}px` }} className="card-container">
                {
                    cities.map((card, index) => {
                        if (card.municipio.toUpperCase().startsWith(searchTerm.toLocaleUpperCase()) || searchTerm == '') {
                            return (
                                <CityCard
                                    key={index}
                                    img={card.imgCard.url}
                                    name={card.municipio}
                                    slogan={card.descricao}
                                    id={card.id}
                                    index={index}
                                />
                            )
                        }
                    })
                }
            </div>

        </section>
    )
}

export default Municipios