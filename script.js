//dropdown menus

const menuBtns = document.querySelectorAll(".js-menu-btn");
const menuList = document.querySelectorAll(".js-menu-list");



menuBtns.forEach(menuBtnItem => {
    //add the event listener to each clickable menu button
    menuBtnItem.addEventListener("mouseover", function(event) {
        //returns the data-target value
        //const hideMenuElArr = document.querySelectorAll(".hide-menu");
        
        const targetStr = event.target.dataset.target;
        //returns target element from target string
        const target = document.querySelector('#' + targetStr);
        //toggles the hide-menu class of the selected element
        console.log(event.target);
        console.log(targetStr);
        if (target.classList.contains("hide-menu")) {
            menuList.forEach(menuListItem => {
                menuListItem.classList.add("hide-menu");
            });
            target.classList.remove("hide-menu");
        } else {
            target.classList.add("hide-menu");
        }


    })
});

//countdown timer

const countDownDate = new Date("Feb 18, 2023 00:00:00").getTime();
const birthdayTimer = document.getElementById("birthday-timer");

const updateCountdown = setInterval(function() {
    if (!birthdayTimer) {
        return;
    };

    let now = new Date().getTime();
    let distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    birthdayTimer.innerHTML = days + " days " + hours + " hours "
    + minutes + " minutes " + seconds + " seconds!";

    if (distance < 0) {
        clearInterval(updateCountdown);
        birthdayTimer.innerHTML = "Happy birthday!"
    }
});

//weather api

//how to get today's date in yyyy-mm-dd format

let today = new Date();
let dd = today.getDate();

let mm = today.getMonth() + 1; 
const yyyy = today.getFullYear();
if(dd<10) 
{
    dd=`0${dd}`;
} 

if(mm<10) 
{
    mm=`0${mm}`;
} 
today = `${yyyy}-${mm}-${dd}`;
console.log(today);

//save today's date as a variable
//replace both dates in the url useing template literal and the new varaible
//it's always going to be today so make both dates today

const fetchedData = document.getElementById("fetched-data");
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=precipitation&timezone=Europe%2FBerlin&start_date=${today}&end_date=${today}`;
const weatherSource = document.getElementById("weather-source");
const umbrellaPic = document.getElementById("img__umbrella");
const sunPic = document.getElementById("img__sun");

const weatherCallback = weatherDataObj => {
    console.log(weatherDataObj);
    weatherSource.innerHTML += JSON.stringify(weatherDataObj);
    //weatherSource.innerHTML = weatherDataObj;

    const precipArr = weatherDataObj.hourly.precipitation; 
    let willRain = false; //default: would otherwise use else in the if clause
    //console.log(precipArr);

    precipArr.forEach(value => {
        if (value > 0) {
            willRain = true;
        }
    })

    if (willRain) {
        fetchedData.innerHTML = "You will need an umbrella!";
        umbrellaPic.style.display = "flex";
    } else {
        fetchedData.innerHTML = "You won't need an umbrella!";
        sunPic.style.display = "flex";
    }
}

fetch(weatherUrl)
  .then((response) => response.json())
  .then((data) => weatherCallback(data))
  .catch((error) => {
    console.error('Error:', error);
  });







  //fetchedData.innerHTML = 

// $.ajax({
//     url: queryString, // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
//     method: 'GET'