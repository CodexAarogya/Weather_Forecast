const input = document.querySelector('input')
const search = document.querySelector('#searchIcon')

function getInput(){
    console.log(input.value);
     
}

input.addEventListener('keypress', (event)=>{
    if(event.key === 'Enter'){
        event.preventDefault();
        getInput();
    }
})

search.addEventListener('click',getInput);




async function fetchData() {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=mbai&appid=1ecbfb6747c1f879d80ea2600aa097df&units=metric')

        const data = await response.json();

        if (response.ok) {

            console.log(response);
            console.log(data)

        }
        else {
            console.log(data.message)
        }
    }
    catch (error) {
        console.error(error);
    }
}

