import './header2.css'
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';

function Header2(props) {

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
        <div className='header2-div'>
            <div className='black-background'></div>
            {props.img != undefined &&
                <animated.div ref={ref} style={animation2} className='header2-img'>
                    <img src={props.img} className='header2-img' />
                </animated.div>
            }

            <div className='gradient'></div>
            <div className='header2-content'>
                <div>
                    {props.text1 && props.text2 != undefined &&
                        <animated.div ref={ref} style={animation1}>
                            <h1>{props.text1}</h1>
                            <h2>{props.text2}</h2>
                        </animated.div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header2