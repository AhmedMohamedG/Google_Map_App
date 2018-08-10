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
      {name: "Alexandria_Aquarium", 
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

  const {google} = this.props
  const maps = google.maps;

  //https://snazzymaps.com/style/72543/assassins-creed-iv
  const styles =[
      {
          "featureType": "all",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "saturation": "-100"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 40
              },
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#4d6059"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#4d6059"
              }
          ]
      },
      {
          "featureType": "landscape.natural",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#4d6059"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#4d6059"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#4d6059"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7f8d89"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#7f8d89"
              },
              {
                  "lightness": 29
              },
              {
                  "weight": 0.2
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 18
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#7f8d89"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#2b3638"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#2b3638"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#24282b"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#24282b"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      }
  ]

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
    })
    .catch(err => console.log(err)); 
}


//Create and fill infowWindos
populateInfoWindow(marker, infowindow, map,service,google){

	    const geocoder = new google.maps.Geocoder();
	
	if (infowindow.marker !== marker) {
          infowindow.setContent('');
          infowindow.marker = marker;
          infowindow.addListener('closeclick', function() {
          	infowindow.marker = null;

          });
    }
    infowindow.setContent('<div id=\'infoWrapper\'><div class="marker_taitle title"><h2>' + marker.title + '</h2></div><div><h3>Location </h3>' +marker.position+ '</div>'
      +`<h3> WIKI!</h3> <div class="wiki"></div></div>`);
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
		        
		  	infowindow.setContent('<div id=\'infoWrapper\'><div class="marker_taitle title"><h2>' + marker.title + '</h2></div><div>' +infoContent+ '<p class="title">Location</p>' +marker.position+'</div>'
          +`<h3 class="title"> WIKI!</h3> <div class="wiki"></div></div>`);          
        }});
        }})
       
    infowindow.open(map, marker);
  const wiki = this.wiki.bind(this)
  wiki(marker.wikiTitle)

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
  '<li key={i} >'+m.title+'</li>'})
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

return (
<div id="mapDiv">
<div id="controler">
  <form>
    <input role="search" type='text' placeholder="Serach for a place"
                   value={this.state.value}
                   onChange={this.handleChange}/>
    <output name="result">
      <ul id="locations-list" >
      </ul>
    </output>
  </form>
</div>
<div id="map" ref="map"></div>
</div>
	)

}

}

export default  Map  

