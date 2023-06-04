const form = document.querySelector('form');
const input = form.querySelector('input');
const errorHelper = form.querySelector('.input-error');
const responseContainer = document.querySelector('.weather__response');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    cleanUp();
    const address = input.value;

    if (!address || address.length < 2) {
        showError("Address must be at least 2 characters long");
        return;
    }

    fetch(`/weather?address=${address}`).then(res => {
        return res.json();
    })
    .then(data => {
        if (data.error) {
            showError(error);

        } else {
            const { weather } = data;
            const locationParagraph = document.createElement('p');
            locationParagraph.textContent = `Weather in ${data.location}:`;

            const weatherImg = document.createElement('img');
            weatherImg.setAttribute('src', weather.weather_icons[0]);
            weatherImg.style.borderRadius = '100%';
            const weatherParagraph = document.createElement('p');
            weatherParagraph.textContent =  `It is currently ${weather.temperature} degrees out and ${weather.weather_descriptions[0]}. It feels like ${weather.feelslike} degrees.`;

            responseContainer.append(locationParagraph, weatherImg, weatherParagraph);
        }
    })
    .catch(err => {
        console.log('err ', err);
    });
});


function showError(message) {
    errorHelper.textContent = message;
}

function cleanUp() {
    errorHelper.textContent = '';
    responseContainer.textContent = '';
}