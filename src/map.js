import React, {Component} from 'react'
//import ReactDOM from 'react-dom'


class Map extends Component {



  componentDidMount(){
  	this.createMap();
}

createMap(){
const {google} = this.props
const maps = google.maps;
  var map = new maps.Map(document.getElementById("map"),{
          center: {lat:  31.206656, lng:29.893934},
          zoom: 13,

        });
  return map
}

render(){
return (

<div id="mapDiv"></div>
	)

}






}

export default  Map  

