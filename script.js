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
        if (!targetStr) {
            return;
        }

        const target = document.querySelector('#' + targetStr);
        //toggles the hide-menu class of the selected element
        // console.log(event.target);
        // console.log(targetStr);
        //console.log(event.target);
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

        const createdDiv = document.createElement("div");
        barGraph.before(createdDiv);

        //make each number in the array 1 decimal place
        const tempArrMap = tempArr.map(x => x.toFixed(1));
        const tempArrString = tempArrMap.toString();
        
        const spacedString = tempArrString.replaceAll(",", " | ");
        console.log(spacedString);
        createdDiv.innerHTML = spacedString;
        createdDiv.classList.add("bargraph-temps");


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

const slideshowContainer = document.querySelector(".slideshow-container");


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

if (slideshowContainer) {
        showSlides(slideIndex);
}

///flashing button
const nextBtn = document.querySelector(".next");

if (nextBtn) {
    const flashingBtn = () => {
        nextBtn.classList.add("flashing");
    }
    
    setTimeout(flashingBtn, 2000);
    
    nextBtn.addEventListener("click", function() {
        nextBtn.classList.remove("flashing");
    })

}










//modal certs

// Get the modal
// const openModal = document.getElementById("open-modal--html");

// if (openModal) {
//     // Get the button that opens the modal
//     const btn = document.getElementById("modal-btn--html");

//     // Get the <span> element that closes the modal
//     const span = document.getElementsByClassName("close")[0];

//     // When the user clicks on the button, open the modal
//     btn.onclick = function() {
//         openModal.style.display = "block";
//     }

//     // When the user clicks on <span> (x), close the modal
//     span.onclick = function() {
//         openModal.style.display = "none";
//     }

//     // When the user clicks anywhere outside of the modal, close it
//     window.onclick = function(event) {
//     if (event.target == openModal) {
//         openModal.style.display = "none";
//     }
//     }

// }

const openModals = document.querySelectorAll(".open-modal");

if (openModals) {
    const modalBtns = document.querySelectorAll(".modal-btn");
    const closeSpans = document.querySelectorAll(".close");

    modalBtns.forEach(btn => {
        btn.onclick = function(event) {

            const targetModalSelector = event.target.dataset.targetModal;
            console.log(targetModalSelector);
            const targetModal = document.getElementById(targetModalSelector);
            console.log(targetModal);
            targetModal.style.display = "block";
        }

    closeSpans.forEach(span => {
        span.onclick = function() {
            openModals.forEach(openModal => {
                openModal.style.display = "none";
            })
                   
        }
    })
        

        window.onclick = function(event) {
            openModals.forEach(openModal => {
                if (event.target == openModal) {
                    openModal.style.display = "none";
                }
            })
            
        }
    })
} 




///// todo list
const mainTodoList = document.getElementById("main-todolist");

if (mainTodoList) {
    

    const addCloseBtnToListItems = () => {
        const myListItems = document.querySelectorAll("#ul-todo li");
        myListItems.forEach(item => {
            const span = document.createElement("SPAN");
            const txt = document.createTextNode("\u00D7");
            span.classList.add("close");
            span.appendChild(txt);
            item.appendChild(span);
        });
    };

    addCloseBtnToListItems();
    
    // Click on a close button to hide the current list item
    let closeBtns = document.querySelectorAll(".close");


    closeBtns.forEach(closeBtn => {
        
        closeBtn.onclick = function() {
            let div = this.parentElement;
            div.style.display = "none";
        };
        
    });

    // Add a "checked" symbol when clicking on a list item
    let list = document.querySelector('ul');
    list.addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('checked');
        }
    }, false);

    // Create a new list item when clicking on the "Add" button
    const createNewElement = () => {
        const li = document.createElement("li");
        const inputHole = document.getElementById("todo-input");
        let inputValue = inputHole.value;
        const newTaskElement = document.createTextNode(inputValue);
        li.appendChild(newTaskElement);
        console.log(newTaskElement);
        
        let tasksArr = [];
        //tasksArr.push(newTask);
        
        // conver the array to string then store it.
        //localStorage.setItem('test', JSON.stringify(['test123', 'value']));
        //localStorage.setItem('tasksArr', JSON.stringify(tasksArr));

        if (inputValue === '') {
            alert("You cannot add an empty task");
        } else {
            document.getElementById("ul-todo").appendChild(li);
            //console.log("hi");
            console.log(typeof inputValue, tasksArr);
            addCloseBtnToListItems();
            tasksArr.push(inputValue);
            console.log(tasksArr);
            localStorage.setItem('tasksArr', JSON.stringify(tasksArr));

        }
        inputValue = "";
    
        ///addCloseBtnToListItems();
        closeBtns = document.querySelectorAll(".close");

        closeBtns.forEach(closeBtn => {
            closeBtn.onclick = function() {
                
                let div = this.parentElement;
                //console.log(div);
                //console.log(closeBtn);
                div.style.display = "none";
            };
            
        });
    };

    const addBtn = document.querySelector("#add-btn");
    addBtn.addEventListener("click", createNewElement);
}




/// carousel
const carousel = document.querySelector(".carousel");

if (carousel) {
    // Select all slides
    const carouselSlides = document.querySelectorAll(".carousel-slide");

    // loop through slides and set each slides translateX property to index * 100% 
    carouselSlides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${indx * 100}%)`;
    });

    // current slide counter
    let curSlide = 0;
    let maxSlide = carouselSlides.length - 1;

    // select next slide button
    const nextSlide = document.querySelector(".carousel-next");

    // add event listener and next slide functionality
    nextSlide.addEventListener("click", function () {
        // check if current slide is the last and reset current slide
        if (curSlide === maxSlide) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        carouselSlides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
    });

    // select prev slide button
    const prevSlide = document.querySelector(".carousel-prev");

    // add event listener and navigation functionality
    prevSlide.addEventListener("click", function () {
    // check if current slide is the first and reset current slide to last
        if (curSlide === 0) {
            curSlide = maxSlide;
        } else {
            curSlide--;
        }

        //   move slide by 100%
        carouselSlides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
    });

    //
    const showNextSlide = () => {
        if (curSlide === maxSlide) {
            curSlide = 0;
        } else {
            curSlide++;
            
        }

        carouselSlides.forEach((slide, indx) => {
           //console.log(slide);
            slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
        });
        //setTimeout(showNextSlide, 2000);
    }

    showNextSlide();


    
}

// slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
// slide.style.zIndex -= 1;



//todo

// card index 0 will be active class, 1 and 2 will be right class
// active class:
    //translate x axis 0;
    //transition: all 0.5s;
    // z-index: 3;
//left class:
    //translate x axis -100%
    //transition: all 0.5s;
    //z-index: 2;
//right class: 
    //translate x axis 100%
    //transition: all 0.5s;
    //z-index: 1;

// 
///////////////////////

// magic eight ball
const inputBoxEightball = document.getElementById("input-box-eightball");

if (inputBoxEightball) {
    // const inputBox = document.getElementById("input-box");
    const questionLog = document.getElementById("question-log");
    const answerLog = document.getElementById("answer-log");

    inputBoxEightball.onkeydown = function(e){
        if(e.keyCode == 13){
            
            inputBoxValue = inputBoxEightball.value;

            const capitalizeFirstLetter = string => {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
            
            const inputBoxValueCap = capitalizeFirstLetter(inputBoxValue); 

            questionLog.innerHTML = `You asked: ${inputBoxValueCap}`;
        
            if (inputBoxValue.slice(-1) !== "?") {
                questionLog.innerHTML += "?";
            }

        getAnswer();
        }
    };

    const answers = [
        'It is certain.', 
        'It is decidedly so.', 
        'Without a doubt.', 
        'Reply hazy, try again.', 
        'Ask again later.', 
        'Don\'t count on it.', 
        'Outlook not so good.', 
        'Very doubtful.'
    ];

    const getAnswer = () => {

        i = Math.floor(Math.random() * 8);
        answerLog.innerHTML = `Answer: ${answers[i]}`;
    }

}

///////////////////////

//moving-cards

const cardsProject = document.querySelector(".cards-project");

if (cardsProject) {
    const movingCards = document.querySelectorAll(".moving-card");
    const logPhrase = () => {
        console.log("woah here he comes");
    };
    
    window.setTimeout(logPhrase, 1000);
    
    
    
    
    
    const startSliders = () => {
        //have all cards finished moving? 
        let workIsDone = false;
        //console.log(movingCards);
        //has the card moved or have all cards moved?
        movingCards.forEach((card) => {
            if (card.classList.contains("moved") || workIsDone) {
                //searches for the next card that doesn't have the class moved
                return;
            }
            //console.log(card);
            card.classList.add("moved");
            workIsDone = true; // makes loop not do anything each time
        });
    
        //last card has moved
        if (movingCards[movingCards.length - 1].classList.contains("moved")) {
            //trigger reverse here
            window.setTimeout(reverseSliders, intervalTime);
            window.clearInterval(interval);
        }
    
    };
    
    const intervalTime = 2000;
    const interval = setInterval(startSliders, intervalTime);
    
    const reverseSliders = () => {
        let workIsDone = false;
    
        movingCards.forEach((card) => {
            //searches for the next card that has the class moved
            if (!card.classList.contains("moved") || workIsDone) {
                return;
            }
            
            card.classList.remove("moved");
        });
    
    };
    
    // const reverseInterval = setInterval(reverseSliders, intervalTime);
    
}


/////////////////

//hangman

const hangmanGame = document.getElementById("hangman");

if (hangman) {
    const guessHole = document.querySelector("#input-box-hangman");
    const submitBtn = document.querySelector("#submit-btn");
    const guessedLetterLogIncorrect = document.querySelector("#guessed-letter-log-incorrect");
    const guessConfirmation = document.querySelector("#guess-confirmation");
    const letterRow = document.querySelector("#letter-row");
    const skull = "💀";
    const livesCounter = document.querySelector("#lives-counter");
    const letterGraveyard = document.querySelector("#letter-graveyard");
    const livesRemainingEl = document.querySelector("#lives-remaining");
    let livesRemaining = 9;
    const winnerModal = document.querySelector(".modal__winner");
    const loserModal = document.querySelector(".modal__loser");
    const restartBtn = document.querySelector("#restart-btn");


    //underscores for mystery answer
    let answerArr = [];

    // array for incorrect letters
    let incorrectLetterArr = [];

    //set lives left on page load
    const setLivesRemainingCounter = number => {
        let livesRemainingCounter = number;
        livesRemainingEl.innerHTML = livesRemainingCounter;
    }
    setLivesRemainingCounter(livesRemaining);

    //array for skulls to appear (lives)
    const addSkullsToLivesCounter = () => {
        let skullArr = [];
        // lives left
        
        let livesRemainingCounter = livesRemaining - 1;
        livesRemainingEl.innerHTML = livesRemainingCounter;

        incorrectLetterArr.forEach(wrongLetter => {
            skullArr.push(skull);
            livesCounter.innerHTML = skullArr.join("");
            livesRemainingEl.innerHTML = livesRemainingCounter--;
        })

        //lose the game
        if (skullArr.length >= 9) {
            setTimeout(showLoserPopup, 200);
        }
    }

    //answer choices
    const possibleAnswersArr = [
        "Which", "Their", "There", 
        "Would", "Other", "These", 
        "About", "First", "Could", 
        "After", "Those", "Where", 
        "Being", "Under", "Years", 
        "Great", "State", "World", 
        "Three", "While"];

    //make the answers uppercase
    const possibleAnswersArrCaps = possibleAnswersArr.map(word => {
        return word.toUpperCase();
    });

    //choose a word from the possible answers
    const randomWord = Math.floor(Math.random() * possibleAnswersArrCaps.length);
    const hangmanAnswer = possibleAnswersArrCaps[randomWord];

    console.log(hangmanAnswer);

    //put in the underscores for the mystery answer
    Array.from(hangmanAnswer).forEach(letter => {
        answerArr.push("_");
        letterRow.innerHTML = answerArr.join("");
    });

    //check for double letters, if so replace both indexes
    const checkIfAnswerHasDoubleLetters = (hangmanAnswer, guessedLetterCaps) => {
        const checker = hangmanAnswer.indexOf(guessedLetterCaps);
        const secondindexOfLetterInAnswer = hangmanAnswer.indexOf(guessedLetterCaps, checker + 1);

        if (secondindexOfLetterInAnswer > 0) {
            answerArr[secondindexOfLetterInAnswer] = guessedLetterCaps;
        };
    }

    //put the correctly guessed letter in the right place of the mystery answer
    const replaceUnderscoreWithLetter = (indexOfLetterInAnswer, guessedLetterCaps) => {
        answerArr[indexOfLetterInAnswer] = guessedLetterCaps;
        letterRow.innerHTML = answerArr.join("");
    };

    // function for showing loser popup and disabling submit btn
    const showLoserPopup = () => {
        submitBtn.style.display = "none";
        loserModal.style.display = "block";
        guessedLetterLogIncorrect.style.display = "none";
    }

    // function for showing winner popup and disabling submit btn
    const showWinnerPopup = () => {
        submitBtn.style.display = "none";
        winnerModal.style.display = "block";
        guessedLetterLogIncorrect.style.display = "none";
        return;
    }

    const checkLetter = () => {
        const guessedLetter = guessHole.value;
        const guessedLetterCaps = guessedLetter.toUpperCase();

        if (guessedLetterCaps.length > 1) {
            guessConfirmation.innerHTML = `Guess just one letter please`;
            guessHole.value = "";
        } else if (guessedLetterCaps.length === 0) {
            return;
        } else {
            guessConfirmation.innerHTML = `You guessed: ${guessedLetterCaps}`;
            guessHole.value = "";
        };

        if (!hangmanAnswer.includes(guessedLetterCaps)) {

            incorrectLetterArr.push(guessedLetterCaps);
            letterGraveyard.innerHTML = incorrectLetterArr.join("");

            addSkullsToLivesCounter();

        } else {
            Array.from(hangmanAnswer).forEach(letter => {
                let indexOfLetterInAnswer = hangmanAnswer.indexOf(guessedLetterCaps);

                replaceUnderscoreWithLetter(indexOfLetterInAnswer, guessedLetterCaps);
                checkIfAnswerHasDoubleLetters(hangmanAnswer, guessedLetterCaps);

            });

            if (letterRow.innerHTML === hangmanAnswer) {
                setTimeout(showWinnerPopup, 200);
            };

        }

        guessHole.focus();

    }

    submitBtn.addEventListener("click", checkLetter);
    guessHole.addEventListener("keydown", function (event) {
        if (event.code === "Enter") {
            checkLetter(event);
        }
    })

    // function to reload page
    const reloadPage = () => {
        document.location.reload();
    }

    // reload page on click of play again button
    restartBtn.addEventListener("click", reloadPage);

    window.onclick = function() {
        if (winnerModal.style.display === "block" || loserModal.style.display === "block") {
            winnerModal.style.display = "none";
            loserModal.style.display = "none";
            guessConfirmation.innerHTML = "";
            guessedLetterLogIncorrect.style.display = "flex";
            restartBtn.style.display = "flex";
        }

    }
    

}


