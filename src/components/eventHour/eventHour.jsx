import { useSpring, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer'
import './eventHour.css'

function EventHour(props) {

    const [ref, inView] = useInView({
        triggerOnce: true,
    })

    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'opacity(0)' : 'opacity(100%)',
        config: { duration: 350 },
        delay: inView ? props.index * 100 : 0,
    })

    return (
        <animated.div ref={ref} style={animation}
            className='eventHour-div'
        >
            <div className='data-button'>
                <div className='data-button-div'>
                    <h1>{props.dia}</h1>
                    <h2>{[
                        'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN',
                        'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'
                    ][props.mes - 1]}</h2>
                </div>
            </div>
            <div className='hora-button' key={`${props.index}hora`}>
                <div className='hora-button-div'>
                    <h1>{props.data.horaInicio}</h1>
                    <div className='hora-line'></div>
                    <h1>{props.data.horaFim}</h1>
                </div>
            </div>

            {props.index !== props.evento.data.length - 1 ? <div key={`${props.index}spacing`} className='data-spacing'></div> : null}
        </animated.div>
    )
}

export default EventHour