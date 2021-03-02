import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import brain from './icons8-brain-100.png';

const Logo = () => {
    return (
        <div className="ma4 mt0">
            {/* max: tilt value */}
            <Tilt className="Tilt br3 shadow-2" options={{ max : 75 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop: '7px'}} src={brain} alt="SmartBrains.png"/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;