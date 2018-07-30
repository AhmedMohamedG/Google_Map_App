import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <main>
        <div id="controler"></div>
        <div id="map"></div>
        </main>
    );
  }
}

const LoadingContainer  = (props) => (
  <div className="LoadingContainer"></div>
)






export default GoogleApiWrapper({
  apiKey: 'AIzaSyC0qTi1hkGFXLku0y-CYAhm1y8gpDByKv0',
  LoadingContainer : LoadingContainer 
})(App)
