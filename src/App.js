import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
//import logo from './logo.svg';
import './App.css';
import Map from './map.js'


class App extends Component {

  render() {
    let infowindow = new this.props.google.maps.InfoWindow();
    return (
      <main>
        <Map 
        google={this.props.google}
        infowindow={infowindow}  
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
