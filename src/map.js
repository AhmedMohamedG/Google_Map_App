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
   places: []

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
  this.addMarkers(map,google);

 // return map
}

populateInfoWindow(marker, infowindow, map,service,google){
	var geocoder = new google.maps.Geocoder();
	
	if (infowindow.marker !== marker) {
          infowindow.setContent('');
          infowindow.marker = marker;
          infowindow.addListener('closeclick', function() {
          	infowindow.marker = null;
          });
    }
    infowindow.setContent('<div>' + marker.title + '</div><div><p>Lat Lng </p>' +marker.position+ '</div>');
    geocoder.geocode({'location': marker.position}, function(results, status)	 {
    service.getDetails({
        placeId: results[0].place_id
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
			let infoContent =''
		    /*if (place.name) {
		            infoContent += '<p>' + place.name + '</p>';
		          }*/
		          if (place.formatted_address) {
		            infoContent += '<p>Address</p><p>' + place.formatted_address+'</p>'
		          }
		          if (place.formatted_phone_number) {
		            infoContent += '<p>' + place.formatted_phone_number+'</p>'
		          }
		         /* if (place.opening_hours) {
		          	console.log(place.opening_hours)
            infoContent += '<br><br><strong>Hours:</strong><br>' +
                '<p>'+place.opening_hours.weekday_text[0] + '</p>' +
                '<p>'+place.opening_hours.weekday_text[1] + '</p>' +
               '<p>' +place.opening_hours.weekday_text[2] + '</p>' +
                '<p>'+place.opening_hours.weekday_text[3] + '</p>' +
                '<p>'+place.opening_hours.weekday_text[4] + '</p>' +
                '<p>'+place.opening_hours.weekday_text[5] + '</p>' +
                '<p>'+place.opening_hours.weekday_text[6]+'</p>'
          }
          if (place.photos) {
          			          	console.log(place.photos)

            infoContent += '<br><br><img src="' + place.photos[0].getUrl(
                {maxHeight: 50, maxWidth: 100}) + '">'
          }*/
		  	infowindow.setContent('<div>' + marker.title + '</div><div><p>Lat Lng </p>' +marker.position+ infoContent +'</div>');          
        }});
        })
       
    infowindow.open(map, marker);
//console.log(marker)
  }

addMarkers(map,google){
    let bounds = new google.maps.LatLngBounds()
    let Infowindow = new google.maps.InfoWindow();
    let service = new google.maps.places.PlacesService(map);
	this.state.locations.forEach((location) => {
	    let marker = new google.maps.Marker({
	    position: {lat: location.location.lat, lng: location.location.lng},
	    map: map,
	    title: location.name
  		})
	  	bounds.extend(location.location);
	   	this.setState({markers:[...this.state.markers,marker]});
      this.state.markers.push(marker)
              //            console.log(this.state.markers)

		marker.addListener('click',()=>(
		this.populateInfoWindow(marker, Infowindow,map,service,google)
		));
	})
    map.fitBounds(bounds);

 }



render(){

return (
<div id="mapDiv">
<div id="controler">
 <ul className="locations-list">{
              this.state.markers/*.filter(m => m.getVisible())*/.map((m, i) =>
                (<li key={i}>{m.title}</li>))

            }</ul>
</div>
<div id="map"></div>
</div>
	)

}






}

export default  Map  

