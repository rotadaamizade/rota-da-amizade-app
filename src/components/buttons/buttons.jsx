import './buttons.css'
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

function Buttons(props) {

    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'opacity(0)' : 'opacity(100%)',
        config: { duration: 350 },
    });

    return (
        <animated.div ref={ref} style={animation}>
            <div className='buttons-container'>
                {props.localization !== '' && (
                    <a target='_blank' href={props.localization}>
                        <div className='localization-button'>Abrir Localização</div>
                    </a>

                )}
                {props.contatos.length > 0 && (
                    <div className='contatos-button' onClick={props.openContatos}>
                        Contatos
                    </div>
                )}

                {props.redes.length > 0 && (
                    <div className='redes-button' onClick={props.openRedes}>
                        Redes Sociais
                    </div>
                )}

            </div>
        </animated.div>
    )
}

export default Buttons