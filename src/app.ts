import axios from 'axios';

const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;
let map: google.maps.Map;

type GoogleGeocodingResponse = {
  results: {
    geometry: { location: { lat: number; lng: number } };
  }[];
  status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const address = addressInput.value;

  // send this to Google's API
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        address
      )}&key=${process.env.GOOGLE_MAPS_API}`
    )
    .then((response) => {
      if (response.data.status !== 'OK') {
        throw new Error('Could not fetch location!');
      }
      const coordinates = response.data.results[0].geometry.location;
      map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: coordinates,
        zoom: 13,
      });

      new google.maps.Marker({ position: coordinates, map });
    })
    .catch((err) => {
      console.log(err);
    });
}

form.addEventListener('submit', (e) => searchAddressHandler(e));
