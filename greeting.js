const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings")

const USER_LS = "currentUser";

function askForName() {
    form.classList.add("showing");
    form.addEventListener("submit", () => {
        event.preventDefault();
        const currentValue = input.value;
        localStorage.setItem(USER_LS, currentValue);
        paintGreeting(currentValue);
    });
}

function paintGreeting(text) {
    form.classList.remove("showing");
    greeting.innerHTML = `Hello ${text}`;
    greeting.classList.add("showing")
};

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser === null)
    {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
};

function init() {
    loadName();
};

init();