//dropdown menus

// const menuBtns = document.querySelectorAll(".js-menu-btn");
// const menuList = document.querySelectorAll(".js-menu-list");



// menuBtns.forEach(menuBtnItem => {
//     //add the event listener to each clickable menu button
//     menuBtnItem.addEventListener("mouseover", function(event) {
//         //returns the data-target value
//         //const hideMenuElArr = document.querySelectorAll(".hide-menu");
        
//         const targetStr = event.target.dataset.target;
//         //returns target element from target string
//         if (!targetStr) {
//             return;
//         }

//         const target = document.querySelector('#' + targetStr);
//         //toggles the hide-menu class of the selected element
//         // console.log(event.target);
//         // console.log(targetStr);
//         //console.log(event.target);
//         if (target.classList.contains("hide-menu")) {
//             menuList.forEach(menuListItem => {
//                 menuListItem.classList.add("hide-menu");
//             });
//             target.classList.remove("hide-menu");
//         } else {
//             target.classList.add("hide-menu");
//         }


//     })
// });

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
        sunPic.ariaHidden = "true";
    } else {
        fetchedData.innerHTML = "You won't need an umbrella!";
        sunPic.style.display = "flex";
        umbrellaPic.ariaHidden = "true";
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

    //console.log(tempDataObj);
    glovesCheck.innerHTML = "Gloves check: " + JSON.stringify(tempDataObj);

    //tempData.innerHTML += JSON.stringify(tempDataObj);

    const tempArr = tempDataObj.hourly.temperature_2m; 

    // tempArr.forEach(hourlyTemp => {
    //     console.log(hourlyTemp);
    // })

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

    //get the highest temp of the day
    console.log(tempArr);
    
    const highestTemp = Math.max(...tempArr);
    console.log(highestTemp);
    const lowestTemp = Math.min(...tempArr);
    console.log(lowestTemp);

    //change the height of the bar graph according to average temp
    barGraph.style.height = (highestTemp * 12) + "px";
    barGraph.ariaLabel = `graph showing temperature fluctuations over the day, with a minimum of ${lowestTemp} and a maximum of ${highestTemp}`;
    if (highestTemp * 12 < 34) {
        barGraph.style.height = 34 + "px";
    }

    const addNewBars = () => {
        //let barGraphDataArr = [];
        //console.log(tempArr);

        const createdDiv = document.createElement("div");
        barGraph.before(createdDiv);

        //make each number in the array 1 decimal place
        const tempArrMap = tempArr.map(x => x.toFixed(1));
        const tempArrString = tempArrMap.toString();
        
        const spacedString = tempArrString.replaceAll(",", " | ");
        //console.log(spacedString);
        createdDiv.innerHTML = spacedString;
        createdDiv.classList.add("bargraph-temps");


        tempArr.forEach((temp, index) => {
            //console.log(temp);
            const addedBar = document.createElement("div");
            barGraph.appendChild(addedBar);
            addedBar.classList.add("new-bar");
            //console.log(temp * 10);
            addedBar.style.height = temp * 10 + "px";
            if (temp < 0) {
                addedBar.style.height = 0;
            }
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
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

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

        dots.forEach(dot => {
            dot.addEventListener('keydown', (event) => {
                if (event.code === 'Space' || event.code === 'Enter') {
                  dot.click();
                }
            });
        } )
    }

    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    }

    if (prev) {
        prev.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
              prev.click();
            }
        });
    
        next.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                next.click();
            }
        });

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



const openModals = document.querySelectorAll(".open-modal");

if (openModals) {
   
    
    const modalBtns = document.querySelectorAll(".modal-btn");
    const closeSpans = document.querySelectorAll(".close");

    const openModalFunc = event => {
        console.log("hi");
        const targetModalSelector = event.target.dataset.targetModal;
        //console.log(targetModalSelector);
        const targetModal = document.getElementById(targetModalSelector);
        //console.log(targetModal);
        targetModal.style.display = "block";
        targetModal.ariaHidden = "false";
    }



    modalBtns.forEach(btn => {
      
        btn.addEventListener("click", openModalFunc);

        btn.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
              btn.click();
            }
        });

       
        
        window.onkeydown = function(event) {
            openModals.forEach(openModal => {
                if (event.code === 'Escape') {
                    openModal.style.display = "none";
                    openModal.ariaHidden = "true";
                }
            })
        }

        window.onclick = function(event) {
            openModals.forEach(openModal => {
                if (event.target == openModal) {
                    openModal.style.display = "none";
                    openModal.ariaHidden = "true";
                }
            })
            
        }
    })

    closeSpans.forEach(span => {
        const closeModalFunc = event => {
            openModals.forEach(openModal => {
                openModal.style.display = "none";
            })
            
        }

        span.addEventListener("click", closeModalFunc);

        span.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
              span.click();
            }
        });
    })
} else {
    
}




// ///// todo list
// const mainTodoList = document.getElementById("main-todolist");

// if (mainTodoList) {

//     const addCloseBtnToListItems = () => {
//         const myListItems = document.querySelectorAll("#ul-todo li");
//         myListItems.forEach(item => {
//             const span = document.createElement("SPAN");
//             const txt = document.createTextNode("\u00D7");
//             span.classList.add("close");
//             span.tabIndex = "0";
//             span.appendChild(txt);
//             item.appendChild(span);
//             }
//         );

   
//     };

//      addCloseBtnToListItems();
    
//     // Click on a close button to hide the current list item
//     // const closeBtns = document.querySelectorAll(".close");
//     // console.log(closeBtns);
//     // closeBtns.forEach(closeBtn => {
        
//     //     closeBtn.onclick = function() {
//     //         console.log("12");
//     //         let div = this.parentElement;
//     //         div.style.display = "none";
//     //     };
//         // const removeTask = (event) => {
//         //     console.log(event.target);
//         //     let div = event.target.parentElement;
//         //     div.style.display = "none";
//         // }

//     //     // closeBtn.addEventListener("click", removeTask);


        
//     // });

//     // Add a "checked" symbol when clicking on a list item
//     let list = document.querySelector('#ul-todo');
//     list.addEventListener('click', function(event) {
//         if (event.target.tagName === 'LI') {
//             event.target.classList.toggle('checked');
//         }
//     }, false);

//     list.addEventListener('keydown', (event) => {
//         if (event.code === 'Space' || event.code === 'Enter') {
//             if (event.target.tagName === 'LI') {
//                 event.target.classList.toggle('checked');
//             }
//         }
//     });

//     const inputHole = document.getElementById("todo-input");

//     // Create a new list item when clicking on the "Add" button
//     const createNewElement = () => {
//         const li = document.createElement("li");
//         let inputValue = inputHole.value;
//         const newTaskElement = document.createTextNode(inputValue);
//         li.appendChild(newTaskElement);
//         li.tabIndex = "0";
        
//         const storedTasksJSON = localStorage.getItem("tasksArr");
//         const storedTasksArr = JSON.parse(storedTasksJSON);
//         let tasksArr = storedTasksArr;
       

//         if (inputValue === '') {
//             alert("You cannot add an empty task");
//         } else {
//             document.getElementById("ul-todo").appendChild(li);
//             addCloseBtnToListItems();
//             tasksArr.push(inputValue);
//             const stringifiedArr = JSON.stringify(tasksArr);
//             console.log(stringifiedArr);
//             localStorage.setItem('tasksArr', stringifiedArr);
            

//             inputHole.value = "";
//         }
    
//         ///addCloseBtnToListItems();
//         closeBtns = document.querySelectorAll(".close");

//         closeBtns.forEach(closeBtn => {
//             closeBtn.onclick = function() {
//                 let div = this.parentElement;
//                 div.style.display = "none";
//             };
            
//         });
//     };

//     const addLocalStorageTaskToList = () => {
//         let storedTasksJSON = localStorage.getItem("tasksArr");
//         let storedTasksArr = JSON.parse(storedTasksJSON);
//         let tasksArr = storedTasksArr;

//         console.log(tasksArr); 
//         if (!tasksArr) {
//             storedTasksJSON = localStorage.getItem("tasksArr");
//             storedTasksArr = JSON.parse(storedTasksJSON);
//             tasksArr = storedTasksArr;
//             console.log("task");
//             localStorage.setItem("tasksArr", JSON.stringify(["go to gym"]));
//         }

//         console.log(tasksArr);
//         console.log(storedTasksJSON);
//         storedTasksArr.forEach(storedTask => {
//             const li = document.createElement("li");
//             const newStoredTaskElement = document.createTextNode(storedTask);
//             document.getElementById("ul-todo").appendChild(li);
            
//             console.log(newStoredTaskElement);
//             console.log(storedTask);
//             li.appendChild(newStoredTaskElement);
//             li.tabIndex = "0";

//             const span = document.createElement("SPAN");
//             const txt = document.createTextNode("\u00D7");
//             span.classList.add("close");
//             span.tabIndex = "0";
//             span.appendChild(txt);
//             li.appendChild(span);

//         })
        
        
//     }

//     const removeTask = event => {
//         let listElement = event.target.closest('li');
//         console.log(listElement);
//         listElement.style.display = "none";
//         //localStorage.removeItem("tasksArr");
//     }

//     const initTodoList = () => {
//         addLocalStorageTaskToList();
//         const closeBtns = document.querySelectorAll(".close");

//         closeBtns.forEach(closeBtn => {
//             console.log("button");
//             closeBtn.addEventListener("click", removeTask);

//             closeBtn.addEventListener('keydown', (event) => {
//                 if (event.code === 'Space' || event.code === 'Enter') {
//                     closeBtn.click();
//                 }
//             });
//         })

        
//     }

//     const addBtn = document.querySelector("#add-btn");
//     addBtn.addEventListener("click", createNewElement);
//     window.addEventListener("load", initTodoList);
    
    

//     inputHole.addEventListener('keydown', (event) => {
//         if (event.code === 'Enter') {
//             addBtn.click();
//         }
//     });

    
// }



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
            card.classList.add("moved", "moved-z");
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

    // const widgetCloseBtn = document.querySelector("#widget-close");
    // widgetCloseBtn.addEventListener("click", startSliders);

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

const hangmanGame = document.querySelector("#hangman");

if (hangmanGame) {
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
    const showAnswer = document.querySelector("#show-answer");


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
    const possibleAnswersArr = 
    // ["Which", "Their", "There", 
    //     "Would", "Other", "These", 
    //     "About", "First", "Could", 
    //     "After", "Those", "Where", 
    //     "Being", "Under", "Years", 
    //     "Great", "State", "World", 
    //     "Three", "While"];
    ["Little", "System", "Number", "States", 
        "Social", "Value", "Study", "Table", 
        "Known", "Court", "Between", "Through", 
        "However", "General", "Present", "Children", 
        "Possible", "National", "Business", "Interest"
    ];

    //make the answers uppercase
    const possibleAnswersArrCaps = possibleAnswersArr.map(word => {
        return word.toUpperCase();
    });

    //choose a word from the possible answers
    const randomWord = Math.floor(Math.random() * possibleAnswersArrCaps.length);
    const hangmanAnswer = possibleAnswersArrCaps[randomWord];

    //console.log(hangmanAnswer);

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

    //check if answer has namy of the same letter 
    const checkIfAnswerHasMultipleSameLetters = (hangmanAnswer, guessedLetterCaps) => {
        let indices = [];
        const array = Array.from(hangmanAnswer);
        const element = guessedLetterCaps;
        let multiLetterIdx = array.indexOf(element);
        while (multiLetterIdx !== -1) {
            indices.push(multiLetterIdx);
            multiLetterIdx = array.indexOf(element, multiLetterIdx + 1);
            answerArr[multiLetterIdx] = guessedLetterCaps;
        }

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
        showAnswer.innerHTML = `Answer was: ${hangmanAnswer}`;
    }

    // function for showing winner popup and disabling submit btn
    const showWinnerPopup = () => {
        submitBtn.style.display = "none";
        winnerModal.style.display = "block";
        guessedLetterLogIncorrect.style.display = "none";
        return;
    }

    const onlyLetters = str => {
        return /^[A-Za-z]*$/.test(str);
      }

    const checkLetter = () => {
        const guessedLetter = guessHole.value;
        const guessedLetterCaps = guessedLetter.toUpperCase();

        if (guessedLetterCaps.length > 1) {
            guessConfirmation.innerHTML = `Guess just one letter please`;
            guessHole.value = "";
            return;
        } else if (guessedLetterCaps.length === 0) {
            return;
        } else if (!onlyLetters(guessedLetterCaps)) {
            guessConfirmation.innerHTML = `Guess a letter please`;
            guessHole.value = "";
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
                //checkIfAnswerHasDoubleLetters(hangmanAnswer, guessedLetterCaps);
                checkIfAnswerHasMultipleSameLetters(hangmanAnswer, guessedLetterCaps);

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
    
};


//////////////////////////

//brief sidebar

const sidebarWidget = document.querySelector("#sidebar-widget");
const sidebarWidgetContainer = document.querySelector("#sidebar-widget-container");
const overviewHeading= document.querySelector(".overview-heading");
const pageOverview = document.querySelector(".page-overview");
const tooltipText = document.querySelector(".tooltiptext");

if (sidebarWidget) {
    const widgetCloseBtn = document.querySelector("#widget-close");


    const translateSidebarWidget = () => {
        if (widgetCloseBtn.classList.contains("rotated")) {

            sidebarWidget.classList.add("translated");
            sidebarWidgetContainer.classList.add("no-pointer-events");
            widgetCloseBtn.ariaPressed = "false";
           
            

        } else {
            sidebarWidget.classList.remove("translated");
            sidebarWidgetContainer.classList.remove("no-pointer-events");
            widgetCloseBtn.ariaPressed = "true";
            
        }
    }

    const closeOverview = () => {
        widgetCloseBtn.classList.toggle("rotated");
        translateSidebarWidget();
    };

    const showTooltip = () => {
        if (!widgetCloseBtn.classList.contains("rotated")) {
            tooltipText.classList.add("opaque");
            tooltipText.innerHTML = "Hide brief";
            //tooltipText.classList.remove("higher");
        } else {
            tooltipText.classList.add("opaque");
            tooltipText.innerHTML = "Show brief";
            //tooltipText.classList.add("higher");
        }
        
    }

    const hideTooltip = () => {
        tooltipText.classList.remove("opaque");
    }
    
    
//project overview tooltip

    const onloadTooltip = document.querySelector(".onload-tooltiptext");

    const addFlashing = () => {
        onloadTooltip.classList.add("flashing");
    }
    setTimeout(addFlashing, 2000);

    const removeFlashing = () => {
        onloadTooltip.classList.remove("flashing");
        onloadTooltip.classList.add("translucent");
        window.addEventListener("click", hideOnloadTooltip);
    }

    const hideOnloadTooltip = () => {
        onloadTooltip.classList.add("hidden");
    }
    
    widgetCloseBtn.addEventListener("click", hideOnloadTooltip);
    onloadTooltip.addEventListener("click", closeOverview);
    window.addEventListener("click", removeFlashing);

/////
    widgetCloseBtn.addEventListener("click", closeOverview);
    widgetCloseBtn.addEventListener("mouseover", showTooltip);
    widgetCloseBtn.addEventListener("click", showTooltip);
    widgetCloseBtn.addEventListener("mouseout", hideTooltip);

    //window.addEventListener("load", closeOverview);

    if (!widgetCloseBtn.classList.contains("rotated")) {
        window.onkeydown = function(event) {
            
                if (event.code === 'Escape') {
                    sidebarWidget.classList.add("translated");
                    widgetCloseBtn.classList.add("rotated");
                }
            
        }
    }

    

    

}



///////////////
//  add bold class on nav bar item dependent on which page you are on (active page)

const pageBody = document.querySelector("BODY");
const navBarItemArr = document.querySelectorAll(".nav-bar__item");

navBarItemArr.forEach(navBarItem => {
    if (navBarItem.classList.contains(pageBody.dataset.pageName)) {
        //console.log(navBarItem.innerHTML);
        navBarItem.firstElementChild.classList.add("active-page");
    }
});

///////////////////

const animations = document.querySelector(".animations");

if (animations) {
    //circles
    const circlesArea = document.querySelector(".circles-area"); 
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    //console.log(randomNumber);

    const createCircleRows = randomNumber => {
        for (let row = 0; row < randomNumber; row++) {
            const newRow = document.createElement("div");
            circlesArea.appendChild(newRow);
            newRow.classList.add(
                //"pink-border", 
                "columns");
           
            const createCircleDiv = randomNumber => {
                for (let i = 0; i < randomNumber; i++) {
                   const newCircle = document.createElement("div");
                   newRow.appendChild(newCircle);
                   newCircle.classList.add("animate-circle", "circle");
                }
            }
        
            createCircleDiv(randomNumber);
        }
    }
    
    //createCircleRows(randomNumber);

    /////////// rectangles

    const rectanglesArea = document.querySelector(".rectangles-area");
    let bigRandomNumber = Math.floor(Math.random() * 4) * 10;

    //console.log(bigRandomNumber);
    if (bigRandomNumber === 0) {
        bigRandomNumber += 10;
    };
    //console.log(bigRandomNumber);
    
    const createOneRectDiv = () => {
           const newRect = document.createElement("div");
           rectanglesArea.appendChild(newRect);
           newRect.classList.add("rectangle");
    }

    const createMultiRectDivs = bigRandomNumber => {
        for (let j = 0; j < bigRandomNumber; j++) {
            createOneRectDiv();
        }
    }

    createMultiRectDivs(bigRandomNumber);

    const createdRectangles = document.querySelectorAll(".rectangle");

    const showRects = () => {
        let visible = false;
        // const createdRectangles = document.querySelectorAll(".rectangle");

        createdRectangles.forEach(rect => {
            if (rect.classList.contains("opaque") || visible) {
                return;
            }
            rect.classList.add("opaque");
            visible = true;
        })

        const checkVisibilityAllRects = createdRectangles => {
            const rectArr = Array.from(createdRectangles);
            const visibility = rectArr.every(rect => {
                //console.log(rect.classList);
                return rect.classList.contains("opaque");
            })
            //console.log(rectArr);
            //console.log(visibility);

            if (visibility) {
                clearInterval(myInterval);
                setTimeout(createCircleRows(randomNumber), 2000);
            }
        }
        
        checkVisibilityAllRects(createdRectangles);
        
    }

    const myInterval = setInterval(showRects,1000);

    //////// triangles

    const trianglesArea = document.querySelector(".triangles-area");
    // const triangleUp = document.querySelector(".triangle-up");
    const currentTriangle = document.querySelector(".current-tri");

    const addTriUp = () => {
        const triangleUpArr = document.querySelectorAll(".triangle-up");
        triangleUpArr.forEach(tri => {
            console.log("hi2");
            const newTriUp = document.createElement("div");
            trianglesArea.appendChild(newTriUp);
            newTriUp.classList.add("triangle-up");
            newTriUp.style.left = "100px";
            newTriUp.classList.add("border-change", "current-tri");
        })

        console.log("hi");
        currentTriangle.addEventListener("click", addTriangleDown);
            
    }

    const addTriangleDown = () => {
        const newTriDown = document.createElement("div");
        trianglesArea.appendChild(newTriDown);
        newTriDown.classList.add("triangle-down");
        newTriDown.addEventListener("click", addTriUp);

    }

    const removeActiveTri = () => {
        currentTriangle.classList.remove("current-tri");
        currentTriangle.removeEventListener("click", addTriangleDown);
    }
    

    currentTriangle.addEventListener("click", addTriangleDown);
    currentTriangle.addEventListener("click", removeActiveTri);

}

//////////////////

// new carousel
const newCarousel = document.querySelector(".new-carousel");

if (newCarousel) {
    let index = 0;
    const speed = 5000; //5sec
    const numberOfSlides = 4;
    const carouselContainer = document.querySelector(".carouselContainer");
    const carouselItemWidth = carouselContainer.scrollWidth / numberOfSlides;

    const stopBtn = document.querySelector(".stop-btn");
    const playBtn = document.querySelector(".play-btn");

    const startCarousel = () => {
        carouselContainer.scrollBy(carouselItemWidth, 0);
        timeoutId = setTimeout(() => {
            index = index % numberOfSlides;
            let childToMove = carouselContainer.querySelectorAll(`.carouselItem`)[
                index
            ];
            // The line below move the item to end of carousel by 
            // manipulating its flex order
            childToMove.style.order =
            childToMove.style.order && childToMove.style.order === 0
                ? 1
                : +childToMove.style.order + 1;
            index++;
            clearTimeout(timeoutId);
        }, 1000);
    }

    let carouselInterval = setInterval(startCarousel, speed);

    const stopCarousel = () => {
        if (playBtn.classList.contains("pressable-btn")) {
            console.log("click the other button");
            return;
        };
        clearInterval(carouselInterval);
        playBtn.classList.add("pressable-btn");
        stopBtn.classList.remove("pressable-btn");
    }

    const restartCarousel = () => {
        if (stopBtn.classList.contains("pressable-btn")) {
            console.log("click the other button");
            return;
        };
        carouselInterval = setInterval(startCarousel, speed);
        stopBtn.classList.add("pressable-btn");
        playBtn.classList.remove("pressable-btn");
    }

    stopBtn.addEventListener("click", stopCarousel);
    playBtn.addEventListener("click", restartCarousel);

    stopBtn.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.code === 'Enter') {
            stopBtn.click();
        }
    });

    playBtn.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.code === 'Enter') {
            playBtn.click();
        }
    });

}

/////////////////////
// cake quiz

const cakeQuiz = document.getElementById("cake-quiz");

if (cakeQuiz) {

    const radioBtns = document.querySelectorAll(".radio-btn");
    let questionArr = document.querySelectorAll(".question");
    const questionNum = document.querySelector("#question-number");
    const questionNumDec = document.querySelector(".question-number-declaration");
    const quizIntro = document.querySelector(".quiz-intro");

    const vanillaCake = document.querySelector(".cake--vanilla");
    const chocoCake = document.querySelector(".cake--chocolate");
    const lemonCake = document.querySelector(".cake--lemon");
    const carrotCake = document.querySelector(".cake--carrot");

    let questionIndex = 0;
    let cakeAnswerArr = [[], [], [], []];
    const cakeTypeArr = [vanillaCake, chocoCake, lemonCake, carrotCake];
    
    let answerValueArr = ["A", "B", "C", "D"];


    const getAnswerValue = event => {
        let answerValue = event.currentTarget.value;

        for (inx = 0; inx < answerValueArr.length; inx++) {
            if (answerValue === answerValueArr[inx]) {
                cakeAnswerArr[inx].push(answerValue);
            }
        }
    }

    const showWinningCake = () => {

        questionArr = Array.from(questionArr);
        let check = questionArr.every(quest => 
            quest.classList.contains("hidden"));

        if (check) {
            
            const answeredMostlyA = cakeAnswerArr[0].length >= 2 && cakeAnswerArr[1].length < 3 && cakeAnswerArr[2].length < 3 && cakeAnswerArr[3].length < 3;
            const answeredMostlyB = cakeAnswerArr[1].length >= 2 && cakeAnswerArr[0].length < 3 && cakeAnswerArr[2].length < 3 && cakeAnswerArr[3].length < 3;
            const answeredMostlyC = cakeAnswerArr[2].length >= 2 && cakeAnswerArr[0].length < 3 && cakeAnswerArr[1].length < 3 && cakeAnswerArr[3].length < 3;
            const answeredMostlyD = cakeAnswerArr[3].length >= 2 && cakeAnswerArr[0].length < 3 && cakeAnswerArr[1].length < 3 && cakeAnswerArr[2].length < 3;

            const modeAnswers = [answeredMostlyA, answeredMostlyB, answeredMostlyC, answeredMostlyD];

            for (inx2 = 0; inx2 < modeAnswers.length; inx2++) {
                if (modeAnswers[inx2]) {
                    cakeTypeArr[inx2].classList.remove("hidden");
                    break;
                }
            }
    
            quizIntro.classList.add("hidden");
        }
    }
    
    const goToNextQuestion = () => {
        questionIndex++;
        let nextQ = questionArr[questionIndex];

        questionArr.forEach(question => {
            question.classList.add("hidden");
            
        })
        

        if (questionIndex < 5) {
            nextQ.classList.remove("hidden");
        } else {
            questionNumDec.innerHTML = "";
        }
        getAnswerValue(event);
        questionNum.innerHTML = `${questionIndex + 1}`;
        showWinningCake();
    }

    radioBtns.forEach(btn => {
        btn.addEventListener("click", goToNextQuestion); 
    }) 
}

/////////////////

// fade in greeting 

const greeting = document.querySelector(".greeting");

if (greeting) {
    
    const currentTime = new Date();
    const hours = currentTime.getHours(); 
    const minutes = currentTime.getMinutes(); 
    //console.log("Current time: " + hours + ":" +  minutes);

    const morning = hours > 2 && hours < 12;
    const afternoon = hours > 11 && hours < 18;
    const evening = hours > 17 || hours < 3;
    const timesOfDayArr = [morning, afternoon, evening];
    const timeStringsArr = ["morning", "afternoon", "evening"];

    const showCorrectGreeting = () => {
        greeting.classList.add("fade-in");
        

        for (t = 0; t < timesOfDayArr.length; t++) {
            if (timesOfDayArr[t]) {
                greeting.innerHTML = "Good " + timeStringsArr[t] + "!";
                break;
            } 
        } 

    }

    showCorrectGreeting();
}

/////////////

// expand buttonn on Home page
const expandBtn = document.querySelector(".expand-btn");
const aboutBox = document.querySelector(".about-box");


if (expandBtn) {

    const expandAboutMe = () => {
        aboutBox.classList.add("expanded");
        expandBtn.classList.add("hidden");
    }
    
    expandBtn.addEventListener("click", expandAboutMe);
}

///////////////////

//cv button

const cvBtn = document.querySelector(".cv-btn");

if (cvBtn) {

    const addFlashing = () => {
        cvBtn.classList.add("flashing");
    }
    setTimeout(addFlashing, 2000);

    const removeFlashing = () => {
        cvBtn.classList.remove("flashing");
    }

    cvBtn.addEventListener("click", removeFlashing);
}

/////////////////

/// click to copy email address

const copyBtn = document.querySelector(".copy-btn");

if (copyBtn) {
    const myEmail = document.querySelector(".my-email");
    const emailText = myEmail.innerHTML;
    const emailToolip = document.querySelector("#email-tooltip");

    const copyText = () => {
        navigator.clipboard.writeText(emailText);
        console.log('Content copied to clipboard');
        emailToolip.innerHTML = "Email copied!";
      }

    copyBtn.addEventListener("click", copyText);

    // if (element.hasFocus) {
    //     setTimeout(function(
    //       make opacity 0 
    //     ) )
    // }
    
    
}

/////////////

// new nav bar mobile

const menuIcon = document.querySelector(".menu-icon");
const menuIconWrapper = document.querySelector(".menu-icon-wrapper");
const navMobileTest = document.querySelector(".nav-mobile-new");

const showXBtn = () => {
    menuIcon.classList.toggle("showing-menu");
    navMobileTest.classList.toggle("active-menu");
}

menuIconWrapper.addEventListener("click", showXBtn);

menuIconWrapper.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'Enter') {
        menuIconWrapper.click();
    }
});



//////////////////

// new header nav click to expand

// on click of the experience or projects nav items, drop down the menus

const dropdownMenuBtns = document.querySelectorAll(".dropdown-menu-btn");
const expandableMenus = document.querySelectorAll(".nav-links");

const closeAllMenus = () => {
    //closes all open menus
    expandableMenus.forEach(expandableMenu => {
        expandableMenu.classList.remove("expanded");
    });
}

const retrieveTargetElement = function(event) {
    const targetElementString = event.target.dataset.target;
    const targetElement = document.querySelector("#" + targetElementString);
    console.log(event);
    return targetElement;
}


const openTargetMenu = targetElement => {
    //expands target menu
    console.log("opening");
    targetElement.classList.add("expanded");
}

const closeTargetMenu = targetElement => {
    //closes target menu
    console.log("closing");
    targetElement.classList.remove("expanded");
}

const handleClickOnMenuBtn = event => {
    const targetElement = retrieveTargetElement(event);
    console.log(targetElement);
    console.log(targetElement.classList);

    if (targetElement.classList.contains("expanded")) {
        closeAllMenus();
        closeTargetMenu(targetElement);
        
    } else {
        closeAllMenus();
        openTargetMenu(targetElement);
    };
    
}


dropdownMenuBtns.forEach(dropdownBtn => {
    dropdownBtn.addEventListener("click", handleClickOnMenuBtn);
});

dropdownMenuBtns.forEach(dropdownBtn => {
    dropdownBtn.addEventListener('keydown', (event) => {
        if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();        
            dropdownBtn.click();
        }
    });
});


