let map;

document.querySelector("body").style.backgroundColor = "#121212";
document.querySelector("#map").style.borderRadius = "20px";

const address = fetch("../data/snowplow-2021-03-22_2021-03-28.json")
.then((response) => response.json())
.then((data) => {
  return data;
});

const flightPlanCoordinates = [];

var plowList = [];
var lineColour = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)]
function plow(num){
  this.number = num;
  this.r = Math.floor(Math.random() * 255);
  this.g =  Math.floor(Math.random() * 255);
  this.b = Math.floor(Math.random() * 255);
  this.array = [];
}

const plotPoint = async (id) => { //main plot point process
  const a = await address;
  //write code to plot the point here...
  var coordinates = [a[id].Latitude, a[id].Longitude]; //reads coordinates
  var currentPlow = a[id].Truck; //reads truck number
  console.log(currentPlow);
  
  
  const myLatLng = { lat: parseFloat(a[id].Latitude), lng:  parseFloat(a[id].Longitude) }; //sets coordinates

  var found = false
  var j =  0
  while(j<plowList.length){
    if(currentPlow == plowList[j].number){
      plowList[j].array.push(myLatLng)
      found = true
      break;
    }
    j++;
  }

  if(found == false){
    plowList.push(new plow(currentPlow));
    plowList[j].array.push(myLatLng)
    console.log("Add element");
  }
  console.log(plowList[j].array)

  // new google.maps.Marker({
  //   position: myLatLng,
  //   map,
  //   title: "Hello World!",
  // });
  const flightPath = new google.maps.Polyline({
    path: plowList[j].array,
    geodesic: true,
    strokeColor: "rgb(" + lineColour[0] + ", " + lineColour[1] + ", " + lineColour[2] + ")",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  flightPath.setMap(map);

};


function sleepFor(sleepDuration){ //what does this do?
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}


function initMap() { //display map
  map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 42.29086877112532, lng: -83.00613243683966 },
  zoom: 13,
  });
 myFunction();
}

var myVar;

function myFunction() {
  myVar = setInterval(Loop(), 1000); //time 1 second for testing
}

var i = 0
function Loop(){
  plotPoint(i)
  i++;
  setTimeout(Loop, 1000) //time 1 second for testing
}
