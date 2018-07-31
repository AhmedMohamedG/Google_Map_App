import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
//import logo from './logo.svg';
import './App.css';
import Map from './map.js'


class App extends Component {
  render() {
    return (
      <main>
        <Map 
        google={this.props.google} 
        />
        </main>
    );
  }
}

const LoadingContainer  = (props) => (
  <div className="LoadingContainer"></div>
)






export default GoogleApiWrapper({
  apiKey:( 'AIzaSyC0qTi1hkGFXLku0y-CYAhm1y8gpDByKv0'),
  LoadingContainer : LoadingContainer 
})(App)
