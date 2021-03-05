import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm.js';
import Rank from './components/rank/Rank.js'
import Particles from 'react-particles-js';
import FaceRecognition from './components/facerecognition/FaceRecognition.js';
import Clarifai from 'clarifai';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: '207fdd68775946a1b22ed5c6221c1bcd'
 });

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
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: ''
    }
  }

  // invoked when value in input box changes
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function (err) {
        console.log(err)
      }
    )};

  render() {
    return (
      <div className="App">
        <Particles className="particles"
            params={particlesOptions} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
