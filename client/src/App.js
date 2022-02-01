import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// IMPORT COMPONENTS
import Navbar from './components/Navbar';
import Cards from './components/Cards'

// IMPORT IMAGES
import logo from '../resources/dgst-with-basket.png';
import boulder from '../resources/boulder-disc-golf.png';
import blueRibbonPines from '../resources/blue-ribbon-pine-disc-golf.jpg';
import beaverRanch from '../resources/beaver-ranch-disc-golf.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: []
    };
  }

  componentDidMount() {
    this.setState({ isLoaded: true });
  }

  render() {
    const isLoaded = this.state.isLoaded;
    if (!isLoaded) {
      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/> 
          </div>
          
          <p className="App-intro">
            Loading...    
          </p>
        </div>
      );
    } else {
      return ( 
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/> 
          </div>
          <Router>
            <Navbar/>
            <Cards/> 
            {/* <Page/> THIS WILL BE WERE THE NAVIGATED PAGE WILL LIE */}
          </Router>
        </div>  
      );
    }
  }
}

export default App;
