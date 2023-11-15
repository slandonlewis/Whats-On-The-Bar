// HTML Elements
const weightInputEl = document.querySelector('#weight-input')
const unitBtns = document.querySelectorAll('.unit-btns')
const barSelectionEl = document.querySelector('#bar-select')
const barOptions = document.querySelectorAll('.bar-options')
const calculateBtn = document.querySelector('#calculate-btn')
const platesNeededEl = document.querySelector('#plates-needed-el')

// Variables
// TODO: probably set a default val for unitBeingUsed
let weightBeingUsed
let unitBeingUsed
let barBeingUsed = "Standard Olympic Barbell"
let platesNeededResult
let poundPlates = [45, 35, 25, 10, 5, 2.5]
let kiloPlates = [25, 20, 15, 10, 5, 2.5, 1.25, 0.5, 0.25]

let myBars = [
    {
        id: 0,
        name: "Standard Olympic Barbell",
        weightInLBS: 45,
        weightInKGS: 20.45
    }
]

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
        let barToAddToSelection = {
            id: myBars.length,
            name: bar.name,
            weightInKGS: parseFloat(bar.weightInKGS),
            weightInLBS: parseFloat(bar.weightInLBS)
        }
        myBars.push(barToAddToSelection)
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
barSelectionEl?.addEventListener('change', setBar)

// Calculation Functionality
// TODO: refactor this and take out console logs
let calculate = () => {
    weightBeingUsed = parseFloat(weightInputEl.value)
    alert(`${weightBeingUsed} ${unitBeingUsed}`)
    if (weightBeingUsed === undefined || unitBeingUsed === undefined || barBeingUsed === undefined) {
        console.log(weightBeingUsed)
        console.log(unitBeingUsed)
        console.log(barBeingUsed)
        alert('Hold up! One or more fields have not been completed!')
    } else {
        const isLbs = unitBeingUsed === 'LBS'
        let selectedBar = myBars.find(bar => bar.name === barBeingUsed)
        let barWeight = isLbs ? selectedBar?.weightInLBS : selectedBar?.weightInKGS
        let plateWeight = weightBeingUsed - barWeight
        if (plateWeight < 0) {
            //dont know how we want to handle this
            alert("Total weight is lower than bar weight.")
            return;
        }
        console.log('bar weight: ', barWeight)
        console.log('total weight: ', weightBeingUsed)
        console.log('plate weight total: ', weightBeingUsed - barWeight)
        let platesObj = isLbs ? {45:0,35:0,25:0,10:0,5:0,2.5:0} : {25:0,20:0,15:0,10:0,5:0,2.5:0,1.25:0,0.5:0,0.25:0}
        let platesArr = isLbs ? poundPlates : kiloPlates 
        platesArr.forEach(plate => {
            //need to force numOfPlates to be even
            let numOfPlates = Math.floor(plateWeight / plate);
            const isEven = numOfPlates % 2 === 0 ? true : false;
            if (!isEven) {numOfPlates--}
            platesObj[plate] = numOfPlates
            plateWeight = plateWeight - (plate * numOfPlates)
        })
        //not sure what to do when there is leftover weight
        console.log('leftover: ', plateWeight)
        console.log('platesObj: ', platesObj)
        //check if weightBeingUsed is lower than barWeight; if true then err
        const ul = document.createElement("ul")
        for (const plate in platesObj) {
            if (platesObj.hasOwnProperty(plate)) {
                const numOfPlates = platesObj[plate];
                const li = document.createElement("li")
                li.innerText = `${numOfPlates} ${plate}s`
                document.body.appendChild(li)
            }
        }

        platesNeededEl.innerHTML = `To get ${weightBeingUsed} ${unitBeingUsed} on the ${barBeingUsed}, you will need:`
        platesNeededEl?.appendChild(ul)
    }
}

calculateBtn.addEventListener('click', calculate)

