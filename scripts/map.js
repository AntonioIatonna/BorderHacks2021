let map;


  const address = fetch("../data/snowplow-2021-03-22_2021-03-28.json")
  .then((response) => response.json())
  .then((data) => {
    return data;
  });

const plotPoint = async (id) => {
  const a = await address;
  //write code to plot the point here...
  var coordinates = [a[id].Latitude, a[id].Longitude];
  console.log(coordinates);
};

plotPoint(0);




function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.29086877112532, lng: -83.00613243683966 },
    zoom: 13,
  });
}
