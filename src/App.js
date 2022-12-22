import React, { Component } from 'react';
import './App.css';
import SignIn from './containers/signin/SignIn.js';
import Register from './containers/register/Register.js';
import Navigation from './components/navigation/Navigation.js';
import Logo from './components/logo/Logo.js';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm.js';
import Rank from './components/rank/Rank.js'
import Particles from 'react-particles-js';
import FaceRecognition from './components/facerecognition/FaceRecognition.js';
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

// state when user logs in
const initialState = {
  input: '',
  imageURL: '',
  boxes: [], // receives an array of faces to detect
  route: 'signIn',
  isSignedIn: false,
  userProfile: {
      id: '',
      name: '',
      email: '',
      password: '',
      entries: 0,
      joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  calcFaceBox = (data) => {
    const img = document.getElementById("inputimage");
    const width = Number(img.width);
    const height = Number(img.height);
    // data.regions determine the positions of faces
    return data.outputs[0].data.regions.map((face) => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          topRow: clarifaiFace.top_row * height, // top column percentage × height
          leftCol: clarifaiFace.left_col * width, // left column percentage × width
          rightCol: width - (clarifaiFace.right_col * width), // percentage of right column × width, subtracted from image width
          bottomRow: height - (clarifaiFace.bottom_row * height) // percentage of bottom row × height, subtracted from image height, because the calculations start from the top
        }
    });
  }

  displayBox = (boxes) => {
    this.setState({boxes: boxes});
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
    fetch('https://smartbrains-server.onrender.com./imageurl', { // fetch the API call from the server
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response =>  {
        if (response) {
            fetch('https://smartbrains-server.onrender.com./Image', {
                method: 'put',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    id: this.state.userProfile.id
                })
              })
              .then(response => response.json())
              .then(count => {
                  //  copies all enumerable own properties from one or more source objects to a target object
                  this.setState(Object.assign(this.state.userProfile, {entries: count}));
              })
              .catch(console.log());      
        }
        this.displayBox(this.calcFaceBox(response))
    })
    .catch(err => console.log);
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState);
    } else if (route === 'Home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  loadUser = (data) => {
      this.setState({userProfile: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }});
  }

  render() {
    const { isSignedIn, imageURL, route, boxes } = this.state; // Destructuring
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'Home' ?
          <div>
            <Logo/>
            <Rank name={this.state.userProfile.name} entries={this.state.userProfile.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition boxes={boxes} imageURL={imageURL}/>
          </div> : (
            route === 'signIn' ?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
