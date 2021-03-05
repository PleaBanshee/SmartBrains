import React from 'react';
import './imagelinkform.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className="f3 b">
                {'This Magic Brain will detect faces in your pictures! Give it a try:'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-3">
                    {/* onChange fires when values in input element changes */}
                    <input className="f4 pa2 w-70 center ba bw2" type="text" onChange={onInputChange}></input>
                    <button className="w-30 grow-btn f4 border ph3 pv2 dib white bg-light-purple ml3"
                        onClick={onButtonSubmit} // Fires when clicking on button
                    >Detect</button>
                </div>
            </div> 
        </div>
    )   
}

export default ImageLinkForm;