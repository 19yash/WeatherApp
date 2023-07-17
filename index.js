const temprature = document.querySelector("[temprature]");
const city = document.querySelector("[city-display]")
const humidity = document.querySelector("[humidity-val]");
const windspeed = document.querySelector("[windspeed-val]");
const cloud = document.querySelector("[cloud-val]");
const cityNameInput = document.querySelector("[citynameinput]");
const loadingImg = document.querySelector("[loading]");
const weatherContainer = document.querySelector(".weather-container");
const locationTab = document.querySelector(".location")
const errorImg = document.querySelector("[error]");
const weather = document.querySelector("[weather]");
const weatherImg = document.querySelector("[weather-img]");
const countryFlag  = document.querySelector("[country-flag]") 


const searchTab = document.querySelector("[search-tab]");
const userTab = document.querySelector("[user-tab]");

const searchContainer = document.querySelector("[search-container]");

searchTab.addEventListener("click",(event)=>{
    console.log("event listner callled");
    event.target.style.cssText ="background-color:rgba(219,226,239,0.5);" 
    userTab.style.cssText = "background-color:transparent;"
    searchContainer.classList.add("active");
    
    //input filled set to empty 
    cityNameInput.value = "";

    locationTab.classList.add('hide');
    weatherContainer.classList.remove("active");
    errorImg.classList.remove("active");
})

userTab.addEventListener("click",(event)=>{
    event.target.style.cssText ="background-color:rgba(219,226,239,0.5);" 
    searchTab.style.cssText = "background-color:transparent;"
    searchContainer.classList.remove("active");
    const local_Coordinates = sessionStorage.getItem("coordinate");
    if(!local_Coordinates)
    {
        locationTab.classList.remove('hide');
        weatherContainer.classList.remove("active");
    }
    else{
       console.log("coordinate found");
        // local_Coordinates
        const cor = JSON.parse(local_Coordinates);
        fetchUserWeatherInfo(cor);
    }
    errorImg.classList.remove("active");
})


function updateUi(data){    


    city.innerText = `${data?.location?.name}`;  
    
    // countryFlag.setAttribute("src",`https://flagcdn.com/144x108/${data?.location.}.png`);
    
    weather.innerText =`${data?.current?.condition?.text}`;
    weatherImg.setAttribute("src",`${data?.current?.condition?.icon}`);   
    temprature.innerText = `${data?.current?.temp_c}°C`;
    humidity.innerText = `${data?.current?.humidity}%`;
    windspeed.innerText = `${data?.current?.wind_kph}km/h`;
    cloud.innerText = `${data?.current?.cloud}%`;
}

async function fetchSearchWeatherInfo(city){
    try{
        loadingImg.classList.add("active");
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=0bf3cd1cb1d34601b34172957230703&q=${city}&aqi=no`);
        if(!response.ok){
            throw Error("data not found");
        }
        const data =  await response.json();    
        updateUi(data);
        loadingImg.classList.remove("active");
        weatherContainer.classList.add("active");
    }
    catch(e){

        console.log("undefined");
        loadingImg.classList.remove("active");
        errorImg.classList.add("active");
    }

};


async function fetchUserWeatherInfo(coordinate){
    const usercoordinate = coordinate;

    locationTab.classList.add("hide");
    loadingImg.classList.add("active");
    try{   
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=0bf3cd1cb1d34601b34172957230703&q=${usercoordinate.latitude},${usercoordinate.longitude}&aqi=no`);
        if(!response.ok){
            throw Error("data not found");
        }
        const data  = await response.json();
        loadingImg.classList.remove("active");
        weatherContainer.classList.add("active");
        updateUi(data);
    }
    catch(e){

        console.log("undefined");
        loadingImg.classList.remove("active");
        errorImg.classList.add("active");
    }

};

function handlesearch(){
    weatherContainer.classList.remove("active");
    errorImg.classList.remove("active");
    fetchSearchWeatherInfo(cityNameInput.value);
}

cityNameInput.addEventListener("change",handlesearch);

function fetchCurLocation(position){
        
    const coordinate = {
        latitude : position.coords.latitude,
        longitude :  position.coords.longitude   
    }
    sessionStorage.setItem("coordinate", JSON.stringify(coordinate));
    fetchUserWeatherInfo(coordinate);
} 
 
function  getlocation(){
    
    console.log("grant Aceess called");
    if(navigator.geolocation){
        
        navigator.geolocation.getCurrentPosition(fetchCurLocation);    
    }
    else{
        alert("NO geolocation support Available")
    }
}