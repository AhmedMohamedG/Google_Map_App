import React, {Component} from 'react'
//import ReactDOM from 'react-dom'
import './map.css'

//onClick={this.listclicked.bind(this)}

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
   places: [],
   query:'',

}





  componentDidMount(){
  	this.initMap();
    this.fillList();
}

initMap(){
const {google} = this.props
const maps = google.maps;
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
  this.addMarkers(map,google);

/*

use ref to get map in listclicked func
*/
 // return map


 /**/
 const listclicked = this.listclicked.bind(this);
 const list = document.getElementById('locations-list');
list.addEventListener("click",(e)=>(
listclicked(e,map)
  )

  )

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
    infowindow.setContent('<div class="marke_taitle">' + marker.title + '</div><div><p>Lat Lng </p>' +marker.position+ '</div>');
    geocoder.geocode({'location': marker.position}, function(results, status)	 {
    if(results){
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
        }})
       
    infowindow.open(map, marker);
//console.log(marker)
/*c*/
  }

addMarkers(map,google){
    let defaultIcon = this.makeMarkerIcon('596360');
    let highlightedIcon = this.makeMarkerIcon('FF1C1C');
    let bounds = new google.maps.LatLngBounds()
    let infowindow = this.props.infowindow;
    let service = new google.maps.places.PlacesService(map);
	this.state.locations.forEach((location) => {
	    let marker = new google.maps.Marker({
	    position: {lat: location.location.lat, lng: location.location.lng},
	    map: map,
	    title: location.name,
      animation: google.maps.Animation.DROP,
       icon: defaultIcon,
  		})
	  	bounds.extend(location.location);
	   	this.setState({markers:[...this.state.markers,marker]});
      this.state.markers.push(marker)
              //            console.log(this.state.markers)

		marker.addListener('click',()=>(
		this.populateInfoWindow(marker, infowindow,map,service,google)
		));
    marker.addListener('mouseover',function(){this.setIcon(highlightedIcon)});
    marker.addListener('mouseout',function(){this.setIcon(defaultIcon)});


	})
    map.fitBounds(bounds);

 }
handleChange =(e) => {
      this.toggleMarks(e);
      this.setState({query: e.target.value});

}



toggleMarks(e,map){

  const {locations, markers} = this.state
  const infowindow = this.props.infowindow
  const query = e.target.value.trim().toLowerCase();
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

fillList(){
const locationList = document.getElementById("locations-list"); 
  if(locationList.hasChildNodes()){
    locationList.innerHTML = "";
  }
  this.state.markers.filter(m => m.getVisible()).forEach((m, i) =>
  {document.getElementById("locations-list").innerHTML+=
  '<li key={i} >'+m.title+'</li>'})
}

listclicked(e,map){

if(e.target && e.target.nodeName === "LI"){
  const infowindow = this.props.infowindow;
  const google = this.props.google;
  const service = new google.maps.places.PlacesService(map);
  const clickedMarker = this.state.markers.find( (m) => {
     if( m.title.toLowerCase()===e.target.innerText.toLowerCase()){
            return  m

     }

    }
    )
     this.populateInfoWindow(clickedMarker, infowindow, map,service,google)


}


}




 makeMarkerIcon(color){
/*const google = this.props.google;

       const image = new this.props.google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'
          + color +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21,34), 
          new google.maps.Point(0,0),
           new google.maps.Point(10,34),
          new google.maps.Size(21,34));*/
const google = this.props.google;
const image = {
  url: 'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'
      + color +
      '|40|_|%E2%80%A2',
  size: new google.maps.Size(71, 71),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(17, 34),
  scaledSize: new google.maps.Size(25, 25)
};


        return image;          
      };






render(){


return (
<div id="mapDiv">
<div id="controler">
  <form>
    <input role="search" type='text'
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

