let now = new Date();

let days = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];

let day = days[now.getDay()];

let dayTimeH = now.getHours();
let dayTimeM = now.getMinutes();

let dayToday = document.querySelector("#current-day");
let timeTodayH = document.querySelector("#current-timeH");
let timeTodayM = document.querySelector("#current-timeS");
dayToday.innerHTML = day;

if (dayTimeH < 10) {
  timeTodayH.innerHTML = `0${dayTimeH}`;
} else {
  timeTodayH.innerHTML = dayTimeH;
}

if (dayTimeM < 10) {
  timeTodayM.innerHTML = `0${dayTimeM}`;
} else {
  timeTodayM.innerHTML = dayTimeM;
}

function displayForcast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  forecastDays.forEach(function (forecastDays) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2">
              <div class="weather-forecast-date">${forecastDays}</div>
              <img
                src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
                alt=""
                width="42"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max"> 18° </span>
                <span class="weather-forecast-temperature-min"> 12° </span>
              </div>
            </div>
    `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "7059cb165caa3316bff682d263a01b1e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForcast);
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#aktuell-temp");
  let weatherDescrip = document.querySelector("h5");
  let aktuellTown = document.querySelector("#searching-town");
  let emoji = document.querySelector("#emoji");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  aktuellTown.innerHTML = response.data.name;
  weatherDescrip.innerHTML = response.data.weather[0].description;
  currentTemp.innerHTML = temp;
  humidity.innerHTML = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = response.data.main.humidity;
  emoji.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperatuer = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "dabf3a7434b4510eb851649c998cdcda";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=de`;
  axios.get(url).then(showTemp);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "dabf3a7434b4510eb851649c998cdcda";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}&lang=de`;

  axios.get(url).then(showTemp);
}

function newTown(event) {
  event.preventDefault();
  let city = document.querySelector("#searching-input").value;
  search(city);
}
function showcurrentTown() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("aktiv");
  fahrenheit.classList.add("aktiv");
  let currentTemp = document.querySelector("#aktuell-temp");
  let fahrenheitTemperuature = (celsiusTemperatuer * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahrenheitTemperuature);
}
function showCelsius(event) {
  event.preventDefault();
  celsius.classList.add("aktiv");
  fahrenheit.classList.remove("aktiv");
  let currentTemp = document.querySelector("#aktuell-temp");
  currentTemp.innerHTML = Math.round(celsiusTemperatuer);
}

let celsiusTemperatuer = null;

let searchingTown = document.querySelector("#searching-form");
searchingTown.addEventListener("submit", newTown);

let currentTown = document.querySelector("#current");
currentTown.addEventListener("click", showcurrentTown);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

search("Paris");
