let cityInput = document.getElementById('city'),
    searchBtn = document.getElementById('searchBtn'),
    api_key = '65074c0d5e77411b29a7a088d0604ecf',
    todayWeather=document.getElementById("today");


function getWeatherDetails(name, lat, lon, country, state) {
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&
        lon=${lon}&appid=${api_key}`,
        WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
        days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',];
    fetch(WEATHER_API_URL).then(res => res.json())
        .then(data => { console.log(data)
            todayWeather.innerHTML=` <p>Now</p>
                    <h2>${(data.main.temp-273.15).toFixed(2)}&deg;C</h2>
                    <p>${data.weather[0].description}</p>
                    <span class="material-symbols-outlined">
                        clear_day
                    </span>
                    <hr>
                    <p id="date">date</p>
                    <p id="city">city</p> `

         })
        .catch(() => { alert(`Failed to fetch current weather`) });
}


function getCityCoordinates() {
    let cityName = cityInput.value.trim();
    cityInput.value = '';
    if (!cityName) { return; }
    let GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.jso1()).then(data => {
        console.log(data)
        let { name, lat, lon, country, state } = data[0];
        getWeatherDetails(name, lat, lon, country, state);
    }).catch(() => {
        alert(`Failed to fetch coordinates of ${cityName}`);
    });
}
searchBtn.addEventListener('click', getCityCoordinates);