import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({box, imageURL}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                {/* set height to auto so it automatically resizes with image width */}
                <img id="inputimage" src={imageURL} alt="IMG" width='500px' height='auto'/>
                <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}}></div>
            </div>
        </div>
    )   
}

export default FaceRecognition;