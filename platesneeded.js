// HTML Elements
const weightInputEl = document.querySelector('#weight-input')
const unitBtns = document.querySelectorAll('.unit-btns')
const barSelectionEl = document.querySelector('#bar-select')
const barOptions = document.querySelectorAll('.bar-options')
const calculateBtn = document.querySelector('#calculate-btn')
const platesNeededEl = document.querySelector('#plates-needed-el')

// Variables
let weightBeingUsed
let unitBeingUsed
let barBeingUsed
let platesNeededResult
let poundPlates = [45, 35, 25, 10, 5, 2.5]
let kiloPlates = [25, 20, 15, 10, 5, 2.5, 1.25, 0.5, 0.25]

// Grabbing barbells from database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://whatsonthebar-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const barsInDB = ref(database, "barbellList")

// List all bars in database via bar selection
onValue(barsInDB, function(snapshot) {
    let barsArray = Object.values(snapshot.val())
    let barSelectionHTML = ""
    barsArray.forEach(bar => {
        barSelectionHTML += `<option class="bar-options" value="${bar.name}">${bar.name} - ${Math.round(bar.weightInKGS)} KG / ${Math.round(bar.weightInLBS)} LBS</option>`
    });
    // join barSelectionHTML with the dropdown
    barSelectionEl.innerHTML += barSelectionHTML
})

// Setting unit being used
let setUnit = (event) => {
    unitBeingUsed = event.target.value  
}

// event listener for unit selection buttons
unitBtns.forEach(unitBtn => {
    unitBtn.addEventListener('click', setUnit)
})

// Setting bar being used
let setBar = (event) => {
    barBeingUsed = event.target.value
    console.log(barBeingUsed)
}

// event listener for bar selection
barOptions.forEach(barOption =>{
    barOption.addEventListener('click', setBar)
})

// Calculation Functionality
let calculate = () => {
    weightBeingUsed = parseFloat(weightInputEl.value)
    alert(`${weightBeingUsed} ${unitBeingUsed}`)
    if (weightBeingUsed === undefined || unitBeingUsed === undefined || barBeingUsed === undefined) {
        alert('Hold up! One or more fields have not been completed!')
    } else {
        platesNeededEl.innerHTML = `To get ${weightBeingUsed} ${unitBeingUsed} on the ${barBeingUsed}, you will need:`
    }
}

calculateBtn.addEventListener('click', calculate)

