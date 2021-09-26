let map;

document.querySelector("body").style.backgroundColor = "#121212";
document.querySelector("#map").style.borderRadius = "20px";

  const address = fetch("../data/snowplow-2021-03-22_2021-03-28.json")
  .then((response) => response.json())
  .then((data) => {
    return data;
  });

  const flightPlanCoordinates = [];

var currentPlow;
var lineColour = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
// const plow = {
//   number: 1111,
//   r: 102,
//   g: 94,
//   b: 50
// }

const plotPoint = async (id) => {
  const a = await address;
  //write code to plot the point here...
  var coordinates = [a[id].Latitude, a[id].Longitude];
  console.log(a[id].Truck);
  
  
  const myLatLng = { lat: parseFloat(a[id].Latitude), lng:  parseFloat(a[id].Longitude) };
 
  console.log(a[id].Truck)
  if(currentPlow == a[id].Truck){
    flightPlanCoordinates.push(myLatLng);
  }else{
    console.log("Cut off");
    lineColour = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    flightPlanCoordinates.splice(myLatLng);
    flightPlanCoordinates.push(myLatLng);

  }
  
  currentPlow  = a[id].Truck;
  // new google.maps.Marker({
  //   position: myLatLng,
  //   map,
  //   title: "Hello World!",
  // });
  const flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "rgb(" + lineColour[0] + ", " + lineColour[1] + ", " + lineColour[2] + ")",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  flightPath.setMap(map);

};


function sleepFor(sleepDuration){
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.29086877112532, lng: -83.00613243683966 },
    zoom: 13,
  });

 myFunction();
}

var myVar;

function myFunction() {
  myVar = setInterval(Loop(), 1000);
}

var i = 0
function Loop(){
  plotPoint(i)
  i++;
  setTimeout(Loop, 1000)
}
