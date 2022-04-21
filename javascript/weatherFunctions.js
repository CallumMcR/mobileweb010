function changeDay(apiData, day) {
    var date = new Date();
    date.setDate(date.getDate() + day);
    date = date.toISOString().slice(0, 10)

    var weatherIcons = document.getElementById("weather-icon-navbar");
    weatherIcons.innerHTML = "";
    var numOfLoops = 0;
    for (var index = 0; index < (apiData.list).length; index++) {
        if ((apiData.list[index].dt_txt).includes(date)) {
            var str = apiData.list[index].dt_txt;
            var htmlText = ``;
            if (numOfLoops == 0) {
                htmlText += `<button class="weather-icon-active"`;
                changeWeatherDetails(apiData.list[index].dt, 1); //loads details of first weather info on day load
                sessionStorage.setItem('activeWeatherID', apiData.list[index].dt); // Sets the activeWeatherID to the first one when the day is loaded
            }
            else {
                htmlText += `<button class=""`;
            }
            
            var timeConverted = (str.substring(str.indexOf(' ') + 1));
            htmlText += ` id="${apiData.list[index].dt}" onclick="changeWeatherDetails('${apiData.list[index].dt}')" >
            <div class="fs-weather py-5">${formatDateAMPM(timeConverted)}</div>
            <img src="http://openweathermap.org/img/wn/${apiData.list[index].weather[0].icon}@2x.png">
            <div class="fs-weather py-5"> ${(apiData.list[index].main.temp - 273.15).toFixed(0)}°C</div>
            </button>`
            weatherIcons.innerHTML += htmlText;
            numOfLoops++;
        }
    }
    
    for (var i = 1; i < 6; i++) {
        var idName = "weather-forecast-" + i;
        document.getElementById(idName).className = "";
    }
    document.getElementById("weather-forecast-" + (day + 1)).className = "weather-active";
}


function changeWeatherDetails(identifier, exception= 0) {
    var apiData = JSON.parse(sessionStorage.getItem('weatherData'));
    var oldSelectedWeatherID = sessionStorage.getItem('activeWeatherID');
    if (document.getElementById(oldSelectedWeatherID) !== null) {
        document.getElementById(oldSelectedWeatherID).className = ""; // Clearing the old selected ones active status
    }
    var selectedIcon = document.getElementById("weather-current-img");
    var selectedDetails = document.getElementById("weather-current-details");
    for (var index = 0; index < (apiData.list).length; index++) {
        if ((apiData.list[index].dt) == identifier) {
            selectedIcon.innerHTML = `<img class="center-vertically-relative" src="http://openweathermap.org/img/wn/${apiData.list[index].weather[0].icon}@2x.png">
            <div class="fs-weather py-5 text-center font-white"> ${apiData.list[index].weather[0].main}</div>`;
            selectedDetails.innerHTML = `<div class="text-start-weather center-vertically-relative">
                <div class="font-white py-5">
                    Temperature: ${(apiData.list[index].main.temp - 273.15).toFixed(2)} °C
                </div>
                <div class="font-white py-5">
                    Humidity: ${apiData.list[index].main.humidity} %rh
                </div>
                <div class="font-white py-5">
                    Wind speed: ${apiData.list[index].wind.speed} mph
                </div>
            </div>`
        }

    }
    if (exception !== 1) { // Prevents an error from occurring
        document.getElementById(identifier).className = 'weather-icon-active';
        sessionStorage.setItem('activeWeatherID', identifier);
    }
}



function formatDateAMPM(time) {
    var hours = time.split(':')[0];
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var ampmTime = hours + ampm;
    return ampmTime;
  }