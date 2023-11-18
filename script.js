document.addEventListener("DOMContentLoaded", ()=>{
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
    const apiKey = "e283f2fb8dfd56f719ab90e4df71e57d";
    
    const inputBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    
    async function loadData(city) {
        const response = await fetch(apiUrl + `&q=${city}` + `&appid=${apiKey}`);

        console.log(response.status);
        if (response.status === 400 || response.status === 404) {
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".error").style.display = "block";
            // console.log("HI");
        } else {
            const data = await response.json();

            const weather = data.weather[0].main;

            document.querySelector(".temp").innerHTML = `${data.main.temp} °C`;
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
            document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
            document.querySelector(".weather-icon").src = `images/${weather.toLowerCase()}.png`;

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    }
    
    searchBtn.addEventListener("click", ()=>{
        loadData(inputBox.value);
    })
})