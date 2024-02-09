import StringToHtml from "../stringToHtml/stringToHtml"
import { useSpring, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer'

function CategoryButton({ button, setCategory, category, index }) {

    const [ref, inView] = useInView({
        triggerOnce: true,
    })

    const generalDelay = 150

    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(100%)',
        config: { duration: 150 },
        delay: inView ? generalDelay + index * 150 : 0,
    })

    return (
        <animated.div ref={ref} style={animation} onClick={() => {
            if (category == button.nome) {
                setCategory('')
            } else {
                setCategory(button.nome)
            }
        }} className='categorie-button-div' key={index}>
            <div style={{ backgroundColor: "#" + button.corFundo }} className={category == button.nome ? 'category-button-active categorie-button' : 'categorie-button'}>
                <StringToHtml htmlString={button.svg} />
            </div>
            <p>{button.nome}</p>
        </animated.div>
    )
}

export default CategoryButton