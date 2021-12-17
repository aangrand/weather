//-------------------------
//- DECLARAITONS GLOBALES -
//-------------------------

let apiKey = '775194aed6f6f09a348de5605f0d10d8'
let gps = {
    lat: 0,
    lng: 0
}
let tableWeek = [];

//--------------------
//---- FONCTIONS -----
//--------------------

function getGeocode(city) {
    let apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=937324e505a44f7d8b64fc0b544035ab&q=${city}`

    return fetch(apiUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data['results']['0']['bounds']['northeast'];
        })
};

function getAllWeather(gps) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${gps.lat}&lon=${gps.lng}&appid=${apiKey}`;

    console.log('getAllWeather()');
    console.log(url);
    return fetch(url)
        .then(weatherData => {
            return weatherData.json();
        })
        .then(weatherData => {
            //console.log(weatherData);
            return weatherData.daily;
        })
}

function affAllWeather(allWeather) {
    let i = 0;
    //let pathSvg;
    allWeather.forEach(element => {
            element = `./assets/${element}.svg`
            document.getElementById("icone").innerHTML += `<div class="day${i}"><img src="${element}" alt="clouds" id="iconeWeather"></div>`;
            i++;
            if (i === 6) {
                break;
            }
        })
        // libWeather = `./assets/${libWeather}.svg`
        // document.getElementById("icone").innerHTML = `<div class="day${pos}"><img src="${libWeather}" alt="clouds" id="iconeWeather"></div>`;
}

//--------------------
//------ MAIN --------
//--------------------

document.getElementById('test').addEventListener('submit', event => {
    event.preventDefault();
    let cityInput = document.getElementById('libCity').value;

    getGeocode(cityInput).then(dataGps => {
            gps.lat = dataGps.lat;
            gps.lng = dataGps.lng;
            //console.log(gps)
            getAllWeather(gps).then(data => {
                data.forEach(element => {
                    tableWeek.push(element.weather[0].main)
                });
                console.log(tableWeek);
                affAllWeather(tableWeek);
            });
            //affAllWeather(weather);
        })
        //console.log(tableWeek);
});