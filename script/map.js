let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  map = new Map(document.getElementById("map"), {
    center: { lat: 40.7711865, lng: -111.9028213 },
    zoom: 8,
  });
}

initMap();