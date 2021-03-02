import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm.js';
import Rank from './components/rank/Rank.js'
import Particles from 'react-particles-js';
import 'tachyons';

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 150
      }
    },
    size: {
      "value": 5,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 80,
        "size_min": 1000,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 155,
      "opacity": 0.4,
      "width": 2
    },
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className="particles"
            params={particlesOptions} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm/>
        {/* <FaceRecognition/> */}
      </div>
    );
  }
}

export default App;
