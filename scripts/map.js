let map;

async function getData() {
  const response = await fetch('../data/snowplow-2021-03-22_2021-03-28.json');
  const data = await response.json();
  return data 
  // logs [{ name: 'Joker'}, { name: 'Batman' }]
}

console.log(getData[0]);

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.29086877112532, lng: -83.00613243683966 },
    zoom: 13,
  });
}
