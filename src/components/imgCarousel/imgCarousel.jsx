import './imgCarousel.css'
import Carousel from "nuka-carousel"

function ImgCarousel(props){
    return(
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
    )    
}

export default ImgCarousel