const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';
let toDos = [];

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    delBtn.addEventListener("click", (event) => {
        toDoList.removeChild(event.target.parentElement);
        const cleanToDos = toDos.filter((toDo) => {
            return toDo.id !== parseInt(event.target.parentElement.id);
        });

        toDos = cleanToDos;
        saveToDos();
    })
    const span = document.createElement("span");
    span.innerText = text;
    
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    
    const toDoObj = {
        text: text,
        id: toDos.length + 1
    }
    li.id = toDoObj.id;

    toDos.push(toDoObj);
    saveToDos();
}


function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        
        parsedToDos.forEach((element) => {
            paintToDo(element.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const currentValue = toDoInput.value;
        paintToDo(currentValue);
    });
}

init();
