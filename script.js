// 'https://api.openweathermap.org/data/2.5/weather?q=mbai&appid=1ecbfb6747c1f879d80ea2600aa097df&units=metric'

const URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_ID = '&appid=1ecbfb6747c1f879d80ea2600aa097df&units='
const UNIT = 'metric'
const dayArray = ["Sunday", "Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday"];
const input = document.querySelector('input')
const search = document.querySelector('#searchIcon')
const day_select = document.querySelector('.inside-data-day').firstElementChild
const set_time = document.querySelector('.localTime')

input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        fetchData(input.value)
    }
})

// search.addEventListener('click', validate(input.value));
async function getDay(){
    const date = new Date();
    const day = date.getDay();
    day_select.innerText = `${dayArray[day]} , `
}
function getTime(){
    const mytime = new Date();
    const time = mytime.toLocaleTimeString();
    set_time.innerText = time;
}

async function fetchData(location) {
    console.log('Fetching Data ...')
    try {
        const response = await fetch(URL + location + API_ID + UNIT)

        const data = await response.json();
        console.log(data)

        if (response.ok) {
            getDay();
            setInterval(getTime, 1000);
            let temperature = document.querySelector('.inside-data-temp')
            let feel = document.querySelector('#feels-like')
            let w_description = document.querySelector('#w-description')
            let city_name = document.querySelector('.city-name')

            temperature.innerText = Math.round(data.main.temp) + '°C'
            feel.innerText = `Feels like ${Math.round(data.main.feels_like)}°C`
            w_description.innerText = data.weather[0].description
            city_name.innerText = `${data.name} , ${data.sys.country}`
        }
        else {
            console.log(data.message)
        }
    }
    catch (error) {
        console.error(error);
    }
}

