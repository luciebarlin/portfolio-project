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
        // console.log(event.target);
        // console.log(targetStr);
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

//save today's date as a variable ${today}
//replace both dates in the url useing template literal and the new varaible
//it's always going to be today so make both dates today

const fetchedData = document.getElementById("fetched-data");
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=precipitation&timezone=Europe%2FBerlin&start_date=${today}&end_date=${today}`;
const weatherSource = document.getElementById("weather-source");
const umbrellaPic = document.getElementById("img__umbrella");
const sunPic = document.getElementById("img__sun");
const precipCheck = document.getElementById("precip-check");

const weatherCallback = weatherDataObj => {
    //console.log(weatherDataObj);
    if (!precipCheck) {
        return;
    };
    precipCheck.innerHTML = "Precipitation check: " + JSON.stringify(weatherDataObj);
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


// get temperature and add to a box below precipitation picture
// be sure to bring some gloves too
// 

const tempUrl = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timezone=Europe%2FBerlin&start_date=${today}&end_date=${today}`
const tempData = document.getElementById("temp-data");
const glovesTest = document.getElementById("gloves-test");
const glovesCheck = document.getElementById("gloves-check");


const tempCallback = tempDataObj => {

    if (!glovesCheck) {
        return;
    };

    console.log(tempDataObj);
    glovesCheck.innerHTML = "Gloves check: " + JSON.stringify(tempDataObj);

    //tempData.innerHTML += JSON.stringify(tempDataObj);

    const tempArr = tempDataObj.hourly.temperature_2m; 

    // tempArr.forEach(hourlyTemp => {
    //     console.log(hourlyTemp);
    // })

    console.log(tempArr);
    //tempData.innerHTML = tempArr;
   
    let tempArrSum = 0;
    for (const index of tempArr) {
        tempArrSum += index;
        //console.log(tempArrSum);
      }
      
    //console.log(tempArrSum);
    
    averageTemp = ((tempArrSum.toFixed(1)) / 24).toFixed(1);
    tempData.innerHTML = "Average temperature: " + averageTemp;

    if (averageTemp < 6) {
        glovesTest.innerHTML = "Be sure to bring some gloves too!";
    }

    //bar graph of temperature data
    const barGraph = document.getElementById("bar-graph");


    const addNewBars = () => {
        //let barGraphDataArr = [];
        //console.log(tempArr);
        tempArr.forEach((temp, index) => {
            //console.log(temp);
            const addedBar = document.createElement("div");
            barGraph.appendChild(addedBar);
            addedBar.classList.add("new-bar");
            //console.log(temp * 10);
            addedBar.style.height = temp * 20 + "px";
            //console.log(index);
            addedBar.innerHTML = index;
        });

    }

    addNewBars();

}

fetch(tempUrl)
  .then((response2) => response2.json())
  .then((data) => tempCallback(data))
  .catch((error) => {
    console.error('Error:', error);
  });


//expand weather source details

const weatherSrcBtn = document.getElementById("btn__weather-src");

const toggleInfo = () => {
    precipCheck.classList.toggle("hidden");
    glovesCheck.classList.toggle("hidden");
}

if (weatherSrcBtn) {
    weatherSrcBtn.addEventListener("click", toggleInfo);
}



// bobby slideshow

let slideIndex = 1;


// Next/previous controls
const plusSlides = n => {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
const currentSlide = n => {
  showSlides(slideIndex = n);
}

const showSlides = n => {
  let i;
  let slides = document.querySelectorAll(".bobby-slides");
  let dots = document.querySelectorAll(".dot");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

showSlides(slideIndex);
