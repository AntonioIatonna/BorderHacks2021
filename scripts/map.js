let map;

document.querySelector("body").style.backgroundColor = "#121212";
document.querySelector("#map").style.borderRadius = "20px";

const address = fetch("../data/snowplow-2021-01-18_2021-01-24.json") // access data
.then((response) => response.json())
.then((data) => {
  return data;
});

var plowList = []; //creates plow array
function plow(num){ //Randomizes route colours
  this.number = num;
  this.r = Math.floor(Math.random() * 255);
  this.g =  Math.floor(Math.random() * 255);
  this.b = Math.floor(Math.random() * 255);
  this.pointsArray = [];
  this.markerArray = [];
}

const plotPoint = async (id) => { //main plot point process
  const a = await address;
  var coordinates = [a[id].Latitude, a[id].Longitude]; //reads coordinates
  var currentPlow = a[id].Truck; //reads truck number
  var saltSpreader = a[id]['Spreader status']; //reads salt status
  console.log(currentPlow);
  console.log(saltSpreader);
  
  const myLatLng = { lat: parseFloat(a[id].Latitude), lng:  parseFloat(a[id].Longitude) }; //sets coordinates

  var found = false
  var j =  0
  while(j<plowList.length){ //adds each plow to plow array
    if(currentPlow == plowList[j].number){
      plowList[j].markerArray[( plowList[j].markerArray.length - 1 )].setMap(null)
      plowList[j].pointsArray.push(myLatLng)
      found = true
      break;
    }
    j++;
  }

  if(found == false){ //differentiate between plows 
    plowList.push(new plow(currentPlow));
    plowList[j].pointsArray.push(myLatLng)
    console.log("Add element");
  }
  console.log(plowList[j].pointsArray)

  const marker = new google.maps.Marker({ //create leading marker on each route
    position: myLatLng,
    title: "Truck: " + currentPlow + " Spreader: " + saltSpreader,
    map: map,
    icon:{
      url: '../data/snow-plow-icon.jpg',
      scaledSize : new google.maps.Size(22, 32),
    }
  });
  const plowedRoute = new google.maps.Polyline({ //creates trailing line to show plowed route
    path: plowList[j].pointsArray,
    geodesic: true,
    strokeColor: "rgb(" + plowList[j].r + ", " + plowList[j].g + ", " + plowList[j].b + ")",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  plowList[j].markerArray.push(marker);

  plowedRoute.setMap(map);

};

function initMap() { //display map
  map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 42.29086877112532, lng: -83.00613243683966 },
  zoom: 13,
  });
 myFunction();
}

var myVar;

function myFunction() {
  myVar = setInterval(Loop(), 5000); //time to retrieve next data point in milliseconds for proof of concept purposes to simulate live data
}

var i = 0
function Loop(){
  plotPoint(i)
  i++;
  setTimeout(Loop, 5000) //time to retrieve in milliseconds for proof of concept purposes to simulate live data
}