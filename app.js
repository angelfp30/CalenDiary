const addDayButton = document.querySelector('.add');
const addMonthButton = document.querySelector('.month-button');
const daysContainer = document.querySelector('.days-container');
const mainContainer = document.querySelector('.container-2');
const displayedMonth = document.querySelector('.month');
const saveButton = document.querySelector('.save');

function addNewDay(){
    const day = new Date();
    const today = day.getDate();

    const newDay = document.createElement('div');
    newDay.setAttribute('class', 'day-card')

    newDay.innerHTML = 
    `<div class="day">${today}<button class="delete-day">X</button></div>
    <textarea class="day-text"></textarea>`;

    mainContainer.appendChild(newDay);
    saveData();
}
function addNewMonth(){
    const today = new Date();
    const month = today.getMonth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthName = months[month];

    const newMonth = document.createElement('div');
    newMonth.setAttribute('class', 'month')
    newMonth.innerHTML = `<button class="delete-month">X</button><div class="month">${monthName}</div>`
    mainContainer.appendChild(newMonth)
     
    saveData();
}

addDayButton.addEventListener('click', () => {
    addNewDay();
    saveData();
})
addMonthButton.addEventListener('click', () => {
    addNewMonth()
    saveData();
})
mainContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains('delete-month')) {
        const targetedMonth = event.target.closest('.month');
        targetedMonth.remove();
        saveData();
    } else if (event.target.classList.contains('delete-day')){
        const targetedDay = event.target.closest('.day-card')
        targetedDay.remove();
        saveData();
    }
});
saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    saveData();
})

function saveData() {
    // Save HTML structure of main container
    localStorage.setItem("data", mainContainer.innerHTML);

    // Save content of textareas
    const textareas = document.querySelectorAll('.day-text');
    textareas.forEach((textarea, index) => {
        localStorage.setItem(`textarea-${index}`, textarea.value);
    });
}

function loadData() {
    // Restore HTML structure of main container
    mainContainer.innerHTML = localStorage.getItem("data");

    // Restore content of textareas
    const textareas = document.querySelectorAll('.day-text');
    textareas.forEach((textarea, index) => {
        textarea.value = localStorage.getItem(`textarea-${index}`);
    });
}

// Call loadData() when the page is loaded
loadData();