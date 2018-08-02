import React, {Component} from 'react'
//import ReactDOM from 'react-dom'
import './map.css'



class Map extends Component {

  state = {
    locations: [
      {name: "Citadel of Qaitbay", location: {lat:31.2140, lng: 29.8856}},
      {name: "Bibliotheca Alexandrina", location: {lat: 31.2089, lng:29.9092}},
      {name: "Alexandria Aquarium", location: {lat: 31.2128, lng: 29.8850}},
      {name: "Roman Auditorium", location: {lat: 31.195003, lng: 29.904903}},
      {name: "Abou El Abbas El Morsy Mosque", location: {lat: 31.2057, lng: 29.8824}}
    ],
   markers:[],
}





  componentDidMount(){
  	this.initMap();
}

initMap(){
const {google} = this.props
const maps = google.maps;
  var map = new maps.Map(document.getElementById("map"),{
          center: {lat:31.206656, lng:29.893934},
          zoom: 15,
          mapTypeId:"roadmap",
          mapTypeControl: false
        });
  this.addMarkers(map);

 // return map
}

populateInfoWindow(marker, infowindow, map){
	if (infowindow.marker !== marker) {
          infowindow.setContent('');
          infowindow.marker = marker;
          infowindow.addListener('closeclick', function() {
          	infowindow.marker = null;
          });
    }
    infowindow.setContent('<div>' + marker.title + '</div><div><p>Lat Lng </p>' +marker.position+ '</div>');
    infowindow.open(map, marker);

  }

addMarkers(map){
    const {google} = this.props
    let bounds = new google.maps.LatLngBounds()
    let Infowindow = new google.maps.InfoWindow();
	this.state.locations.forEach((location) => {
	    let marker = new google.maps.Marker({
	    position: {lat: location.location.lat, lng: location.location.lng},
	    map: map,
	    title: location.name
  		})
	  	bounds.extend(location.location);
	   	this.setState({markers:[...this.state.markers,marker]});
		marker.addListener('click',()=>(
		this.populateInfoWindow(marker, Infowindow,map)
		));
	})
    map.fitBounds(bounds);

 }



render(){
return (
<div id="mapDiv">
<div id="controler"></div>
<div id="map"></div>
</div>
	)

}






}

export default  Map  

