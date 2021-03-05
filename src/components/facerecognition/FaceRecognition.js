import React from 'react';

const FaceRecognition = ({imageURL}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                {/* set height to auto so it automatically resizes with image width */}
                <img src={imageURL} alt="IMG" width='500px' height='auto'/>
            </div>
        </div>
    )   
}

export default FaceRecognition;