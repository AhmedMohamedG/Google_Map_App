import React, {Component} from 'react'
import './map.css'

class Map extends Component {

  state = {
    locations: [
      {name: "Citadel of Qaitbay",
       location: {lat:31.2140, lng: 29.8856},
      wikiTitle:'Citadel_of_Qaitbay'},
      {name: "Bibliotheca Alexandrina",
       location: {lat: 31.2089, lng:29.9092},
     wikiTitle:'Library_of_Alexandria'},
      {name: "Alexandria Aquarium", 
      location: {lat: 31.2128, lng: 29.8850},
    wikiTitle:'Alexandria_Aquarium'},
      {name: "Roman Auditorium", 
      location: {lat: 31.195003, lng: 29.904903},
    wikiTitle:'Roman_theatre_(structure)'},
      {name: "Abu al-Abbas al-Mursi Mosque",
       location: {lat: 31.2057, lng: 29.8824},
     wikiTitle:'Abu_al-Abbas_al-Mursi_Mosque'}
    ],
   markers:[],
   places: [],
   query:'',
   wiki:''
}

  componentDidMount(){
  	this.initMap();
    this.fillList();

}

initMap(){


  return new Promise((resolve, reject) => {
    if(this.props&&this.props.google){
    const {google} = this.props,
        maps = google.maps,
        styles =  require('./snazzy.js').default.styles;
  var map = new maps.Map(document.getElementById("map"),{
            center: {lat:31.206656, lng:29.893934},
            zoom: 15,
            mapTypeId:"roadmap",
            mapTypeControl: false,
            styles: styles,
          });
  //Create markers
    this.addMarkers(map,google);
  //Add event listener to the list items
   const listclicked = this.listclicked.bind(this);
   const list = document.getElementById('locations-list');
  list.addEventListener("click",(e)=>(
  listclicked(e,map)
    )
    )
  }else{
    alert('Error on Loading')
  }})
  .catch(function(err){

    alert(err + "Error")
    return (<h1>"error"</h1>)
  }

    )





  
}

//Fetching Data from Wikipedia API and populate it into the Infowwindo
wiki(title, elClass = "wiki"){
  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=extracts&rvprop=content&format=json&formatversion=2&origin=*`;
  fetch(url)
    .then(data =>   data.json())
    .then(function (data){
      const wikiNodes = document.getElementsByClassName(elClass);
      //iterate over HTMLCollection javascript https://stackoverflow.com/questions/22754315/for-loop-for-htmlcollection-elements
      [].forEach.call(wikiNodes, function(wikiNode) {
        wikiNode.innerHTML = data.query.pages[0].extract
      });
      return true
    })
    .catch(function(err){
      alert('Error on Loadin Wikipedia data')
      return false}); 


    
}


//Create and fill infowWindos
populateInfoWindow(marker, infowindow, map,service,google){

    const defaultIcon = this.makeMarkerIcon('fff'),
        highlightedIcon = this.makeMarkerIcon('FF1C1C');
         this.state.markers.forEach(function(marker){
          marker.setIcon(defaultIcon)})
        marker.setIcon(highlightedIcon)

	    const geocoder = new google.maps.Geocoder();
	if (infowindow.marker !== marker) {
          infowindow.setContent('');
          infowindow.marker = marker;
          infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
          });
    }
    infowindow.setContent(`<div id='infoWrapper' tabIndex="0"><div class="marker_taitle title"><h2>${marker.title}</h2></div><div><h3>Location</h3>${marker.position}</div>
      <h3> WIKI!</h3> <div class="wiki"></div></div>`);
    geocoder.geocode({'location': marker.position}, function(results, status)	 {
    if(results){
    service.getDetails({
        placeId: results[0].place_id
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
			let infoContent =''		    
		          if (place.formatted_address) {
		            infoContent += '<p class="title">Address</p><p>' + place.formatted_address+'</p>'
		          }
		          if (place.formatted_phone_number) {
		            infoContent += '<p>' + place.formatted_phone_number+'</p>'
		          }
		        
		  	infowindow.setContent(`<div id='infoWrapper' tabIndex="0"><div class="marker_taitle title"><h2>${marker.title}</h2></div><div>${infoContent}<p class="title">Location</p>${marker.position}</div>
        <h3 class="title"> WIKI!</h3> <div class="wiki"></div></div>`);          
        }});
        }})
       
    infowindow.open(map, marker);
  const wiki = this.wiki.bind(this)
  const isWiki = wiki(marker.wikiTitle);

  if(!(isWiki)){
document.getElementById('infoWrapper').innerHTML += " Error on loading Wiki"
  }

  }

//creating markers and adding event listeners to it
addMarkers(map,google){
  const defaultIcon = this.makeMarkerIcon('fff'),
        highlightedIcon = this.makeMarkerIcon('FF1C1C'),
        bounds = new google.maps.LatLngBounds(),
        infowindow = this.props.infowindow,
        service = new google.maps.places.PlacesService(map);
	this.state.locations.forEach((location) => {
	    const marker = new google.maps.Marker({
  	    position: {lat: location.location.lat, lng: location.location.lng},
  	    map: map,
  	    title: location.name,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon,
  		})
          marker.wikiTitle = location.wikiTitle

	  	bounds.extend(location.location);
	   	this.setState({markers:[...this.state.markers,marker]});
      this.state.markers.push(marker)

		marker.addListener('click',()=>(
		this.populateInfoWindow(marker, infowindow,map,service,google)
		));
    marker.addListener('mouseover',function(){this.setIcon(highlightedIcon)});
    marker.addListener('mouseout',function(){this.setIcon(defaultIcon)});
	})
  map.fitBounds(bounds);

 }

// Handle input from user
handleChange =(e) => {
      this.toggleMarks(e);
      this.setState({query: e.target.value});
}

//Hide and show marks with user's input
toggleMarks(e,map){

  const {locations, markers} = this.state,
        infowindow = this.props.infowindow,
        query = e.target.value.trim().toLowerCase();
  if (query) {
    locations.forEach((l, i) => {
      if (l.name.toLowerCase().includes(query)) {
        markers[i].setVisible(true)
      } else {
        if (infowindow.marker === markers[i]) {
          infowindow.close()
        }
        markers[i].setVisible(false)
      }
    })
  } else {
    locations.forEach((l, i) => {
      if (markers.length && markers[i]) {
        markers[i].setVisible(true)
      }
    })
  }
  this.fillList();
}

//Filling the list of locations with the visible ones
fillList(){
const locationList = document.getElementById("locations-list"); 
  if(locationList.hasChildNodes()){
    locationList.innerHTML = "";
  }
  this.state.markers.filter(m => m.getVisible()).forEach((m, i) =>
  {document.getElementById("locations-list").innerHTML+=
  `<li key={i} tabindex='0'>${m.title}</li>`})
}

//Show infowwindow on mark when the list items clicked
listclicked(e,map){

  if(e.target && e.target.nodeName === "LI"){
    const infowindow = this.props.infowindow;
    const google = this.props.google;
    const service = new google.maps.places.PlacesService(map);
    const clickedMarker = this.state.markers.find( (m) => {
      if( m.title.toLowerCase()===e.target.innerText.toLowerCase()){
        return  m
      }
    })
    this.populateInfoWindow(clickedMarker, infowindow, map,service,google)
     const defaultIcon = this.makeMarkerIcon('fff'),
        highlightedIcon = this.makeMarkerIcon('FF1C1C');
         this.state.markers.forEach(function(marker){
          marker.setIcon(defaultIcon)})
        clickedMarker.setIcon(highlightedIcon)


  }
}

//Change markers color
 makeMarkerIcon(color){

  const google = this.props.google;
  const image = {
    url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'
        + color +
        '|40|_|%E2%80%A2',
    size: new google.maps.Size(71, 71),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(25, 25),
  };

  return image;          
};


render(){

 console.log(this.props)


return (
<div id="mapDiv">
<div id="controler">
  <h1>Alexandria!</h1>
  <form>
    <label htmlFor="places">
      <h2>Search for a place</h2>
      <input  role="search" name="places" id="places" type='text' 
      placeholder="Enter a place"
                   value={this.state.value}
                   onChange={this.handleChange}/>
    </label>
    <output id="results">
      <h3 id="resultsTitle">List of places</h3>
      <ul aria-labelledby="resultsTitle" id="locations-list" >
      </ul>
    </output>
  </form>
</div>
<div id="map" ref="map" role="application" tabIndex="0"></div>
</div>
	)

}

}

export default  Map  

