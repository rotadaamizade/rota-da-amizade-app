import './imgCarousel.css'
import Carousel from "nuka-carousel"
import { useSpring, animated } from 'react-spring'
import { useInView } from 'react-intersection-observer'

function ImgCarousel(props) {

    const [ref, inView] = useInView({
        triggerOnce: true,
    })

    const generalDelay = 150

    const animation = useSpring({
        opacity: inView ? 1 : 0,
        transform: inView ? 'opacity(0)' : 'opacity(100%)',
        config: { duration: 350 },
        delay: inView ? generalDelay : 0,
    })

    return (
        <animated.div ref={ref} style={animation}>
            <Carousel
                className='carousel-div'
                disableEdgeSwiping={true}
                renderCenterLeftControls={true}
                renderCenterRightControls={true}
            >
                {
                    props.imgArray && props.imgArray.map((img, index) => (
                        <img key={index} className='carousel-img' src={img} alt={`Imagem ${index}`} />
                    ))
                }
            </Carousel>
        </animated.div>
    )
}

export default ImgCarousel