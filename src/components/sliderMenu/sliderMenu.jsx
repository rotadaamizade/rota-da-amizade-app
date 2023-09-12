import './sliderMenu.css'

function SliderMenu(props){

    console.log(props.menuActive)

    return(
        <div className='slider-menu-container'>
            <div className="slider-menu">
                {
                    props.menus.map((menu, index) => (
                        <div key={index} className={props.menuActive == menu ? 'menu-active' : 'menu-disable'} onClick={
                            () => {props.setMenuActive(menu)}
                        }>
                            {menu}
                        </div>
                    ))
                }
            </div>
            <div className={`slider-bottom  ${ props.menuActive == props.menus[0] ? 'menu-active-left' : 'menu-active-right'}`}>
            </div>
        </div>
    )
}

export default SliderMenu