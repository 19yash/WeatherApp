
// const temprature = document.querySelector("[temprature]");
// const city = document.querySelector("[city-display]")
// const humidity = document.querySelector("[humidity-val]");
// const windspeed = document.querySelector("[windspeed-val]");
// const cloud = document.querySelector("[cloud-val]");
// const cityNameInput = document.querySelector("[citynameinput]");
// const loadingImg = document.querySelector("[loading]");
// const weatherContainer = document.querySelector(".weather-container");
// const locationTab = document.querySelector(".location")
// const errorImg = document.querySelector("[error]");

async function fetchUserWeatherInfo(){
    const usercoordinate = {
        latitude : 45.6,
        longitude: 23.67
    } 
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=0bf3cd1cb1d34601b34172957230703&q=${usercoordinate.latitude},${usercoordinate.longitude}&aqi=no`);
    const data  = await response.json();

    console.log(data);

    const temp =  `  tempratue is :${data?.current?.temp_c}°C`;
    console.log(temp)
}

fetchUserWeatherInfo();