import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer'

function Sobre(props) {

    const [ref, inView] = useInView({
        triggerOnce: true,
    })

    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'opacity(0)' : 'opacity(100%)',
        config: { duration: 350 }
    })

    return (
        <animated.div ref={ref} style={animation}>
            <p className='sobre-nos'>{props.sobre}</p>
        </animated.div>
    )
}

export default Sobre