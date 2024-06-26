let map = {};
let marker = {};
let latitude = NaN;
let longitude = NaN;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 10,
  });

  const input = document.getElementById("pac-input");

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo("bounds", map);

  autocomplete.setTypes(["geocode"]);
  //autocomplete.setTypes(['address']);

  const infowindow = new google.maps.InfoWindow();
  marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", function () {
    infowindow.close();
    marker.setVisible(false);
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    latitude = place.geometry.location.lat();
    longitude = place.geometry.location.lng();
    //console.log(place.geometry.location.lat());
    //console.log(place.geometry.location.lng());
    //console.log(place.geometry.location.toJSON());
    document.getElementById("lat").value = place.geometry.location.lat();
    document.getElementById("lon").value = place.geometry.location.lng();
    //console.log(document.getElementById("lon").value);

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setIcon(
      /** @type {google.maps.Icon} */ {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(35, 35),
      }
    );
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    let address = "";
    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join(" ");
    }

    infowindow.setContent(
      "<div><strong>" + place.name + "</strong><br>" + address
    );
    infowindow.open(map, marker);
  });

  /*

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);
        radioButton.addEventListener('click', function() {
            autocomplete.setTypes(types);
        });
    }

    setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);
    setupClickListener('changetype-geocode', ['geocode']);
    */
}
