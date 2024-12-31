const calculate = document.getElementById("calculate");
calculate.addEventListener("click", () => {
    const electricBill = parseFloat(document.getElementById("electricBill").value) || 0;
    const naturalGas = parseFloat(document.getElementById("naturalGasUsage").value) || 0;
    const oilUsage = parseFloat(document.getElementById("oilUsage").value) || 0;
    const lpgUsage = parseFloat(document.getElementById("lpgUsage").value) || 0;
    const waste = parseFloat(document.getElementById("wasteProduced").value) || 0;
    const rupeesToKWh = 10;
    const naturalGasEmissionFactor = 0.184;
    const oilEmissionFactor = 2.43;
    const lpgEmissionFactor = 1.54;
    const wasteEmissionFactor = 0.5;

    const energyUsage = electricBill / rupeesToKWh;
    const energyEmissions = energyUsage * 0.2;
    const naturalGasEmissions = naturalGas * naturalGasEmissionFactor;
    const oilEmissions = oilUsage * oilEmissionFactor;
    const lpgEmissions = lpgUsage * lpgEmissionFactor;
    const wasteEmissions = waste * wasteEmissionFactor;

    const totalEmissions = energyEmissions + naturalGasEmissions + oilEmissions + lpgEmissions + wasteEmissions;

    const dataElectricity = document.getElementById("elec");
    const dataNatural = document.getElementById("natu");
    const dataOil = document.getElementById("oil");
    const datalpg = document.getElementById("lpg");
    const dataWaste = document.getElementById("waste");

    dataElectricity.innerHTML = energyEmissions.toFixed(2);
    dataNatural.innerHTML = naturalGasEmissions.toFixed(2);
    dataOil.innerHTML = oilEmissions.toFixed(2);
    datalpg.innerHTML = lpgEmissions.toFixed(2);
    dataWaste.innerHTML = wasteEmissions.toFixed(2);

    const final = document.getElementById("inner");
    final.innerHTML = `Your total carbon emission this month ${totalEmissions.toFixed(2)}`
});
const apiKey = 'YOUR_API_KEY';
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                getWeatherData(latitude, longitude);
            },
            (error) => {
                console.error(`Error getting location: ${error.message}`);
            }
        );
    } else {
        console.error('Geolocation is not supported by your browser.');
    }
}



// Function to get the weather based on latitude and longitude
function getWeather(latitude, longitude) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=NUPP4P3PNPZQ2LNFKQP9ALB8Z`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Weather Data:', data);

            const currentConditions = data.currentConditions;
            const weather = currentConditions.conditions;
            const temperature = currentConditions.temp;
            const humidity = currentConditions.humidity;
            const windSpeed = currentConditions.windspeed;
            const windDirection = currentConditions.winddir;
            const pressure = currentConditions.pressure;
            const desc = currentConditions.conditions;
            document.getElementById('weather').innerHTML = `
        <p>Weather: ${weather}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} km/h</p>
      `;
            document.getElementById("weather2").innerHTML = `
                        <p>Wind Direction: ${windDirection}</p>
                        <p>Pressure: ${pressure}</p>
                        <p>Overall: ${desc}</p>
                        <hr style="width: 100%; background-color: white; height: 5px;">
                        <p style="width: 80%;">Note: This is a overall data of your surrounding and it may vary</p>`
        })
}

// Check if the browser supports Geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            // Success callback: Get the user's latitude and longitude
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Call the function to get the weather
            getWeather(latitude, longitude);
        },
        function (error) {
            // Error callback
            console.error('Error getting location: ', error);
            alert('Error getting location');
        }
    );
} else {
    alert('Geolocation is not supported by this browser.');
}
