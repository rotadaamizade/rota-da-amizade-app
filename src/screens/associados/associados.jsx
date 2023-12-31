import { useEffect } from "react"
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext';
import Card from "../../components/card/card";
import SectionTitle from "../../components/sectionTitle/sectionTitle";
import Search from "../../components/search/search";
import Categories from "../../components/categories/categories";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";

function Associados() {

    const { navbarState, setNavbarState, globalCity } = useContext(UserContext)
    const [searchTerm, setSearchTerm] = useState('');
    const [titleHeight, setTitleHeight] = useState(0);
    const [category, setCategory] = useState('')
    const [associados, setAssociados] = useState([])
    // const [filteredAssociados, setFilteredAssociados] = useState([])

    useEffect(() => {
        getAssociados()
    }, [])

    const getAssociados = async () => {
        try {
            const data = await getDocs(collection(db, "associados"));
            const atrativosData = [];

            data.forEach((doc) => {
                const dataAtrativos = {
                    id: doc.id,
                    descicao: doc.data().municipio,
                    nome: doc.data().nome,
                    imgCard: doc.data().imgCard,
                    type: 'associado'
                };

                atrativosData.push(dataAtrativos);
            });

            setAssociados(atrativosData);
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    useEffect(() => {
        if (navbarState != 'associados') {
            setNavbarState('associados')
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

    console.log(searchTerm)
    


    return (


        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { duration: 0.25 } }}
            className="section-1">
            <SectionTitle
                text1={globalCity == '' ? 'Associados da' : 'Associados de'}
                text2={globalCity == '' ? 'Rota da Amizade' : globalCity}
            />
            <Search
                onSearch={handleSearch}
            />
            <div style={{ paddingBottom: `calc(75px + ${titleHeight}px` }} className="card-container">
                <Categories category={category} setCategory={setCategory} type={'associados'} />
                {
                    associados.map((associado, index) => (
                        <Card
                            key={index}
                            name={associado.nome}
                            city={associado.descicao}
                            svg={associado.categorySvg}
                            img={associado.imgCard.url}
                            type={associado.type}
                            dates={associado.dates != undefined ? associado.dates : null}
                            id={associado.id}
                            index={index}
                        />
                    ))
                }
            </div>
        </motion.section>

    )
}

export default Associados