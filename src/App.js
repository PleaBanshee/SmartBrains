import React, { Component } from 'react';
import './App.css';
import SignIn from './components/signin/SignIn.js';
import Register from './components/register/Register.js';
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
      imageURL: '',
      box: {},
      route: 'signIn', // keeps track where you are on the app
      isSignedIn: false
    }
  }

  calcFaceBox = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById("inputimage");
    const width = Number(img.width);
    const height = Number(img.height);
    return {
      topRow: clarifaiFace.top_row * height, // top column percentage × height
      leftCol: clarifaiFace.left_col * width, // left column percentage × width
      rightCol: width - (clarifaiFace.right_col * width), // percentage of right column × width, subtracted from image width
      bottomRow: height - (clarifaiFace.bottom_row * height) // percentage of bottom row × height, subtracted from image height, because the calculations start from the top
    }
  }

  displayBox = (box) => {
    this.setState({box: box});
  }

  // invoked when value in input box changes
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  // Calling setState() in React is asynchronous, for various reasons (mainly performance). 
  // Under the covers React will batch multiple calls to setState() into a single call, and then re-render the component a single time, 
  // rather than re-rendering for every state change. Therefore the imageUrl parameter would have never worked in this app, 
  // because when we called Clarifai with our the predict function, React wasn't finished updating the state. 

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response =>  this.displayBox(this.calcFaceBox(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState({isSignedIn: false})
    } else if (route === 'Home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const { isSignedIn, imageURL, route, box } = this.state; // Destructuring
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'Home' ?
          <div>
            <Logo/>
            <Rank/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box} imageURL={imageURL}/>
          </div> : (
            route === 'signIn' ?
            <SignIn onRouteChange={this.onRouteChange}/> :
            <Register/>
          )
        }
      </div>
    );
  }
}

export default App;
