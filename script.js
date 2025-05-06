// 'https://api.openweathermap.org/data/2.5/weather?q=mbai&appid=1ecbfb6747c1f879d80ea2600aa097df&units=metric'
const toggleSwitch = document.querySelector('main')
// ------------------- API Relative Constants --------------------------------------------
// ------------------- Primary -----------------------------------------------------------
// const URL1 = 'https://api.openweathermap.org/data/2.5/weather?q='
// const API_ID = '&appid=1ecbfb6747c1f879d80ea2600aa097df&units='
const URL1 = 'https://api.openweathermap.org/data/2.5/forecast?q='
const API_ID = '&appid=1ecbfb6747c1f879d80ea2600aa097df&units='
const UNIT = (value) => {
    if (value == 'imperial') { return "imperial" }
    else return "metric";
}
const ICON_URL = 'https://openweathermap.org/img/w/';
const dayArray = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday"];
const input = document.querySelector('input')
const user = document.querySelector('.greetings').firstElementChild
const search = document.querySelector('#searchIcon')
const day_select = document.querySelector('.inside-data-day').firstElementChild
const date_select = document.querySelector('.my-date')

// ------------------- Secondary -----------------------------------------------------------
const URL2 = 'https://api.openweathermap.org/data/2.5/weather?q='

// ---------------------------- Preference ---------------------------
const theme = () => {

    if (toggleSwitch.className == "darkMode") {
        toggleSwitch.removeAttribute('class');
        toggleSwitch.setAttribute('class', 'lightMode');
        document.querySelector('#moon').style.display = "block";
        document.querySelector('#sun').style.display = "none";
    }
    else if (toggleSwitch.className == "lightMode") {
        toggleSwitch.removeAttribute('class');
        toggleSwitch.setAttribute('class', 'darkMode');
        document.querySelector('#moon').style.display = "none";
        document.querySelector('#sun').style.display = "block";
    }
}




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
        document.querySelector('#userName').value = localStorage.user;
        document.querySelector('#userAddress').value = localStorage.address
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

dateInfo();
// ---------------------------------- Fetching Data ----------------------------------------------------

async function fetchData(location) {
    console.log('Fetching Data ...')
    try {
        // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=mbai&appid=1ecbfb6747c1f879d80ea2600aa097df&units=metric`)
        const response = await fetch(URL1 + location + API_ID + UNIT('metric'))

        const data = await response.json();
        console.log(data)

        if (response.ok) {

            let temperature = document.querySelector('.inside-data-temp')
            let feel = document.querySelector('.feels-like-container').lastElementChild
            let w_description = document.querySelector('.w-description-container').lastElementChild
            let my_location = document.querySelector('#my-location')
            // let city_name = document.querySelector('.city-name')
            let w_icon = document.querySelector('#w-icon')
            let URL1_ID = `${data.list[0].weather[0].icon}.png`
            let wind_parameter = document.querySelector('#wind-parameter')
            let humidity_parameter = document.querySelector('#humidity-parameter')
            let humidity_status = document.querySelector('#humidity-status')
            let uv_parameter = document.querySelector('#uv-parameter')
            let visibility_parameter = document.querySelector('#visibility-parameter')



            temperature.innerText = Math.round(data.list[0].main.temp) + '°C';

            feel.innerText = `feels like ${Math.round(data.list[0].main.feels_like)}°C`;

            w_description.innerText = data.list[0].weather[0].description;

            w_icon.setAttribute('src', (ICON_URL + URL1_ID));

            my_location.innerText = `${data.city.name} , ${data.city.country}`;

            wind_parameter.innerText = `${data.list[0].wind.speed} Km/h`;

            humidity_parameter.innerText = `${data.list[0].main.humidity} %`;

            humidity_status.innerText = await check_humidity(data.list[0].main.humidity);

            visibility_parameter.innerText = Math.round((data.list[0].visibility) / 1000) + " Km";

            for (let index in dayArray) {
                document.querySelector(`#day${parseInt(index) + 1}-wimage`).setAttribute('src', `${ICON_URL}${data.list[index].weather[0].icon}.png`)
                document.querySelector(`.day${parseInt(index) + 1}-w`).innerText = Math.round(data.list[index].main.temp) + '°C';
            }
        }

        else {
            document.querySelector('.resp-not-ok').style.display = "flex";
            document.querySelector('.error-message').innerText = data.message.toUpperCase();
        }
    }

    catch (error) {
        console.error(error);
    }
}

const cityArray = ['Kathmandu', 'Pokhara', 'New York', 'Sydney', 'Tokyo', 'Dubai', 'seoul'];
for (let index in cityArray) {
    async function fetchCityData(city) {

        const city_response = await fetch(URL2 + city + API_ID + UNIT('metric'))
        const city_data = await city_response.json()
        console.log(city_data)
        try {
            if (city_response.ok) {
                document.querySelector(`.city${parseInt(index) + 1}-w`).innerText = `${Math.round(city_data.main.temp)} °C`;

                document.querySelector(`#city${parseInt(index) + 1}-wimage`).setAttribute('src', `${ICON_URL}${city_data.weather[0].icon}.png`)
            }


        } catch (error) {
            console.error(error)
        }

    }

    fetchCityData(cityArray[index]);
}


async function fetchCityData(city) {

    const city_response = await fetch(URL2 + city + API_ID + UNIT('metric'))
    const city_data = await city_response.json()
    console.log(city_data.weather[0].description)
}

// -------------------------------- Event Listeners --------------------------------------------
input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        fetchData(input.value)
    }
})

search.addEventListener('click', () => {
    fetchData(input.value);

})

user.addEventListener('click', () => {
    document.querySelector('.getUserName').style.display = "flex";
})
document.querySelector('#close-icon-user-section').addEventListener('click', () => {
    document.querySelector('.getUserName').style.display = "none";
})

document.querySelector('#submit-userName').addEventListener('click', displayUserData);
document.querySelector('#remove-data').addEventListener('click', () => {

    if (window.confirm("Do you want to remove your data ?")) {
        localStorage.clear();
        document.querySelector('#remove-data').innerText = "Data Removed Successfully!";
        location.reload();
    }

});


document.querySelector('.toggle').addEventListener('click', theme)
document.querySelector('#try-again').addEventListener('click', () => {
    document.querySelector('.resp-not-ok').style.display = "none";
})









