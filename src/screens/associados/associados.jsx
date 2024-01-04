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
    const [filteredCards, setFilteredCards] = useState([]);

    useEffect(() => {
        getAssociados()
    }, [])

    const getAssociados = async () => {
        try {
            const data = await getDocs(collection(db, "associados"));
            const associadosData = [];

            data.forEach((doc) => {
                const dataAssociado = {
                    id: doc.id,
                    municipio: doc.data().municipio,
                    nome: doc.data().nome,
                    imgCard: doc.data().imgCard,
                    type: 'associado',
                    categorias: doc.data().categorias,
                    ativo : doc.data().ativo
                };
                if(dataAssociado.ativo){
                    associadosData.push(dataAssociado);
                }
                
            });
            setAssociados(associadosData);
            setFilteredCards(associadosData)
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    useEffect(() => {
        let newFilteredCards = associados
        .filter(item =>
            item.categorias.some(cat => cat === category)
          );

        if (globalCity == '' && category == '' && searchTerm == '') {
            setFilteredCards(associados);
        } else {
            setFilteredCards(newFilteredCards);
        }

    }, [globalCity, category, searchTerm]);

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
                    filteredCards.map((associado, index) => (
                        <Card
                            key={index}
                            name={associado.nome}
                            city={associado.municipio}
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