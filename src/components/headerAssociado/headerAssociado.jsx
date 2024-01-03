import './headerAssociado.css'
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

function HeaderAssociado(props) {

    const [ref, inView] = useInView({
        triggerOnce: true,
    });

    const animation1 = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'opacity(0)' : 'opacity(100%)',
        config: { duration: 200 },
        delay: inView ? 300 : 0,
    });

    const animation2 = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'opacity(0)' : 'opacity(100%)',
        config: { duration: 200 }
    });

    return (
        <div className='headerAssociado-div'>
            <div className='black-background'></div>
            {props.img != undefined &&
                <animated.div ref={ref} style={animation2} className='headerAssociado-img'>
                    <img src={props.img} className='headerAssociado-img' />
                </animated.div>
            }
            <div className='gradient'></div>
            <div className='headerAssociado-content'>
                {props.logo != undefined &&
                    <animated.div ref={ref} style={animation1}>
                        <img className='associado-logo' src={props.logo} alt="" />
                    </animated.div>
                }

                <div className='headerAssociado-text'>
                    {props.nome && props.municipio != undefined &&
                        <animated.div ref={ref} style={animation1}>
                            <h1>{props.nome}</h1>
                            <h2>{props.municipio}</h2>
                        </animated.div>
                    }
                </div>
            </div>
        </div>
    )
}

export default HeaderAssociado