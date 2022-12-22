import React from 'react';
import './FaceRecognition.css';

// key should be unique when iterating over objects

const FaceRecognition = ({ imageURL, boxes }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                {/* set height to auto so it automatically resizes with image width */}
                <img id="inputimage" src={imageURL} alt="" width='500px' height='auto'/>
                {
                    boxes.map((box) => // boxes.map: creates a box for every face detected
                    <div 
                        key={box.topRow}
                        className='bounding-box' 
                        style={{
                            top: box.topRow, 
                            right: box.rightCol, 
                            bottom: box.bottomRow, 
                            left: box.leftCol
                        }}>
                    </div>
                )}
            </div>
        </div>
    )   
}

export default FaceRecognition;