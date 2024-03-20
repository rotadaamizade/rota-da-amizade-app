import './offlineScreen.css'

function OfflineScreen() {
    return <div className='offlineScreen'>
        <div>
            <img src="../../../RotaDaAmizade.png" alt="" />
            <div className='popup-reload'>
                <h3>Você está Offline</h3>
                <button onClick={() => location.reload()}>Recarregar APP</button>
            </div>
        </div>
    </div>
}

export default OfflineScreen