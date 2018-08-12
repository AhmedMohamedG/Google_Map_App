import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
//import logo from './logo.svg';
import './App.css';
import Map from './map.js'
import ErrorBoundary from './catch.js'



class App extends Component {

  render() {
   console.log(this.props)

    let infowindow = new this.props.google.maps.InfoWindow({
        maxWidth: 200
    });         
  return (
      <main id="hh">


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
