// 'https://api.openweathermap.org/data/2.5/weather?q=mbai&appid=1ecbfb6747c1f879d80ea2600aa097df&units=metric'
// ------------------- API Relative Constants --------------------------------------------
const URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_ID = '&appid=1ecbfb6747c1f879d80ea2600aa097df&units='
const UNIT = 'metric';
const ICON_URL = 'https://openweathermap.org/img/w/';
const dayArray = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday"];
const input = document.querySelector('input')
const user = document.querySelector('.greetings').firstElementChild
const search = document.querySelector('#searchIcon')
const day_select = document.querySelector('.inside-data-day').firstElementChild
const date_select = document.querySelector('.my-date')

// ---------------------------- Time and Greetings ----------------------------------------------------


const date = new Date();
const myDay = date.getUTCDay();
const myDate = date.toLocaleDateString();
const mytime = date.getHours()
function greeting(time) {
    if (time >= 1 && time <= 11) {
        document.querySelector('#greet').innerText = 'Good Morning!'
    }
    else if (time >= 12 && time <= 16) {
        document.querySelector('#greet').innerText = 'Good Afternoon!'
    }
    else {
        document.querySelector('#greet').innerText = 'Good Evening!'
    }
}

function fetchUserData() {
    if (localStorage.user) {
        document.querySelector('#user-name').innerText = localStorage.user;
    }
    else {
        setTimeout(() => {
            document.querySelector('.getUserName').style.display = "flex";
        }, 1000)
    }
    if (localStorage.address) {
        fetchData(localStorage.address)
    }

}
fetchUserData();



const displayUserData = () => {
    const uName = document.querySelector('#userName').value
    const uAddress = document.querySelector('#userAddress').value
    localStorage.setItem('user', `${uName}`)
    localStorage.setItem('address', `${uAddress}`)
}


async function dateInfo() {

    day_select.innerText = `${dayArray[myDay]} , `
    date_select.innerText = `${myDate}`;
}
greeting(mytime);

// ------------------------ Check Parameters ---------------------------------------------------
async function check_humidity(humidity) {
    if (humidity <= 30) {
        return "Very Dry"
    }
    else if (humidity >= 31 && humidity <= 37) {
        return "Uncomfortable"
    }
    else if (humidity >= 38 && humidity <= 41) {
        return "Comfortable"
    }
    else if (humidity >= 41 && humidity <= 46) {
        return "Moderate"
    }
    else if (humidity >= 47 && humidity <= 52) {
        return "Uncomfortable"
    }
    else if (humidity >= 53 && humidity <= 60) {
        return "Very humid"
    }
    else {
        return "Extreme"
    }

}

// ---------------------------------- Fetching Data ----------------------------------------------------

async function fetchData(location) {
    console.log('Fetching Data ...')
    try {
        const response = await fetch(URL + location + API_ID + UNIT)

        const data = await response.json();
        console.log(data)

        if (response.ok) {

            dateInfo();
            let temperature = document.querySelector('.inside-data-temp')
            let feel = document.querySelector('.feels-like-container').lastElementChild
            let w_description = document.querySelector('.w-description-container').lastElementChild
            let my_location = document.querySelector('#my-location')
            // let city_name = document.querySelector('.city-name')
            let w_icon = document.querySelector('#w-icon')
            let URL_ID = `${data.weather[0].icon}.png`
            let wind_parameter = document.querySelector('#wind-parameter')
            let humidity_parameter = document.querySelector('#humidity-parameter')
            let humidity_status = document.querySelector('#humidity-status')
            let uv_parameter = document.querySelector('#uv-parameter')
            let visibility_parameter = document.querySelector('#visibility-parameter')

            temperature.innerText = Math.round(data.main.temp) + '°C';
            feel.innerText = `feels like ${Math.round(data.main.feels_like)}°C`;
            w_description.innerText = data.weather[0].description;
            w_icon.setAttribute('src', (ICON_URL + URL_ID));
            // city_name.innerText = `${data.name} , ${data.sys.country}`;
            my_location.innerText = `${data.name} , ${data.sys.country}`;
            wind_parameter.innerText = `${data.wind.speed} Km/h`;
            humidity_parameter.innerText = `${data.main.humidity} %`;
            humidity_status.innerText = await check_humidity(data.main.humidity);
            // uv_parameter.innerText = 
            visibility_parameter.innerText = Math.round((data.visibility) / 1000) + " Km";
        }
        else {
            console.log(data.message)
        }
    }
    catch (error) {
        console.error(error);
    }
}

// -------------------------------- Event Listeners --------------------------------------------
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        fetchData(input.value)
    }
})

// search.addEventListener('click', validate(input.value));

user.addEventListener('click', () => {
    document.querySelector('.getUserName').style.display = "flex";
})
document.querySelector('#close-icon-user-section').addEventListener('click', () => {
    document.querySelector('.getUserName').style.display = "none";
})

document.querySelector('#submit-userName').addEventListener('click', displayUserData);







