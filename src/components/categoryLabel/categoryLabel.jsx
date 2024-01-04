import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import './categoryLabel.css'

function CategoryLabel(props) {

    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const generalDelay = 150;

    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'opacity(0)' : 'opacity(100%)',
        config: { duration: 350 },
        delay: inView ? generalDelay + props.index * 100 : 0,
    });

    return (
        <animated.div ref={ref} style={animation}
        className='categoryLabel-div'>
        <div key={props.index} style={{ backgroundColor: `#${props.category.cor}` }} className='category-button '>
            <p>{props.category.nome}</p>
        </div>
        </animated.div>
    )
}

export default CategoryLabel