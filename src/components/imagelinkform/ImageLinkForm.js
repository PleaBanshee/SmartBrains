import React from 'react';
import './imagelinkform.css';


const ImageLinkForm = () => {
    return (
        <div>
            <p className="f3 b">
                {'This Magic Brain will detect faces in your pictures! Give it a try:'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-3">
                    <input className="f4 pa2 w-70 center ba bw2" type="text"></input>
                    <button className="w-30 grow-btn f4 border ph3 pv2 dib white bg-light-purple ml3">Detect</button>
                </div>
            </div> 
        </div>
    )   
}

export default ImageLinkForm;