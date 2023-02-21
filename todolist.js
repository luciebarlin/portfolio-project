///// todo list
const mainTodoList = document.getElementById("main-todolist");

const addCloseBtn = item => {
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7");
    span.classList.add("close");
    span.tabIndex = "0";
    span.appendChild(txt);
    item.appendChild(span);
    item.classList.add("todo-task");
}

const addCloseBtnToListItems = () => {
    const myListItems = document.querySelectorAll("#ul-todo li");
    myListItems.forEach(item => {
            addCloseBtn(item);
            // const span = document.createElement("SPAN");
            // const txt = document.createTextNode("\u00D7");
            // span.classList.add("close");
            // span.tabIndex = "0";
            // span.appendChild(txt);
            // item.appendChild(span);
            // item.classList.add("todo-task");

        }
        
    );
};



// Add a "checked" symbol when clicking on a list item
let list = document.querySelector('#ul-todo');
list.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
    }
}, false);

list.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'Enter') {
        if (event.target.tagName === 'LI') {
            event.target.classList.toggle('checked');
        }
    }
});

const inputHole = document.getElementById("todo-input");

// Create a new list item when clicking on the "Add" button
const createNewElement = () => {
    const li = document.createElement("li");
    let inputValue = inputHole.value;
    const newTaskElement = document.createTextNode(inputValue);
    li.appendChild(newTaskElement);
    li.tabIndex = "0";
    
    const storedTasksJSON = localStorage.getItem("tasksArr");
    const storedTasksArr = JSON.parse(storedTasksJSON);
    let tasksArr = storedTasksArr;
    

    if (inputValue === '') {
        alert("You cannot add an empty task");
    } else {
        document.getElementById("ul-todo").appendChild(li);
        addCloseBtn(li);
        tasksArr.push(inputValue);
        const stringifiedArr = JSON.stringify(tasksArr);
        console.log(stringifiedArr);
        localStorage.setItem('tasksArr', stringifiedArr);
        

        inputHole.value = "";
    }

    addFunctionalityToCloseBtns();

};



const addLocalStorageTaskToList = () => {
    let storedTasksJSON = localStorage.getItem("tasksArr");
    let storedTasksArr = JSON.parse(storedTasksJSON);
    let tasksArr = storedTasksArr;

    const addDefaultTask = () => {
        storedTasksJSON = localStorage.getItem("tasksArr");
        storedTasksArr = JSON.parse(storedTasksJSON);
        tasksArr = storedTasksArr;
        console.log("task");
        localStorage.setItem("tasksArr", JSON.stringify(["go to gym"]));
    }

    console.log(tasksArr); 
    if (!tasksArr) {
        addDefaultTask();
    }

    console.log(tasksArr);
    console.log(storedTasksJSON);
    console.log(storedTasksArr);

    if (!storedTasksArr) {
        addDefaultTask();
    }
    storedTasksArr.forEach(storedTask => {

        const createNewElementFromLocalStorage = () => {
            const li = document.createElement("li");
            const newStoredTaskElement = document.createTextNode(storedTask);
            document.getElementById("ul-todo").appendChild(li);
            
            console.log(newStoredTaskElement);
            console.log(storedTask);
            li.appendChild(newStoredTaskElement);
            li.tabIndex = "0";

            const span = document.createElement("SPAN");
            const txt = document.createTextNode("\u00D7");
            span.classList.add("close");
            span.tabIndex = "0";
            span.appendChild(txt);
            li.appendChild(span);
        }

        createNewElementFromLocalStorage();

    })
    
    
}

const removeTask = event => {
    let listElement = event.target.closest('li');
    console.log(listElement);
    listElement.style.display = "none";
    //localStorage.removeItem("tasksArr");
}

const addFunctionalityToCloseBtns = () => {
    const closeBtns = document.querySelectorAll(".close");

    closeBtns.forEach(closeBtn => {
        console.log("button");
        closeBtn.addEventListener("click", removeTask);

        closeBtn.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                closeBtn.click();
            }
        });
    })
}

const initTodoList = () => {
    addLocalStorageTaskToList();
    //addCloseBtnToListItems();
    addFunctionalityToCloseBtns();
}

const addBtn = document.querySelector("#add-btn");
addBtn.addEventListener("click", createNewElement);
window.addEventListener("load", initTodoList);


inputHole.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
        addBtn.click();
    }
});

    

