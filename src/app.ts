const form = document.querySelector('form')! as HTMLFormElement;
const addressInput = document.getElementById('address')! as HTMLInputElement;

function searchAddressHandler(event: Event) {
  event.preventDefault();
  const address = addressInput.value;

  // send this to Google's API
}

form.addEventListener('submit', (e) => searchAddressHandler(e));
