let map;

$.getJSON("../data/snowplow-2021-03-22_2021-03-28.json", function(json) {
    var data = json
    console.log(data);
});


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.29086877112532, lng: -83.00613243683966 },
    zoom: 13,
  });
}
