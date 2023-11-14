// HTML elements 
const amountEl = document.querySelector('#amount-el')
const plateDisplayLeft = document.querySelector('#plate-display-left')
const plateDisplayRight = document.querySelector('#plate-display-right')
const barSelectionEl = document.querySelector('#bar-select')
const removeLastBtn = document.querySelector("#remove-last")
const clearBtn = document.querySelector('#clear-btn')
const toggleBtns = document.querySelectorAll('.toggle-btn')
const plateBtns = document.querySelectorAll('.plate-btn')
const unitBtns = document.querySelectorAll('.unit-btn')

// initial amounts and values
let barWeight = 45
let totalWeight = barWeight
let unitSetting = 'LBS'
let plateArray = []
let plateImages = []
amountEl.textContent = `${totalWeight} ${unitSetting}`


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
        barSelectionHTML += `<option value="${bar.name}">${bar.name} - ${Math.round(bar.weightInKGS)} KG / ${Math.round(bar.weightInLBS)} LBS</option>`
    });
    // join barSelectionHTML with the dropdown
    barSelectionEl.innerHTML += barSelectionHTML
})

// switch conversion between lbs and kgs
let changeUnit = (event) => {
    let unitValue = event.target.value
    // make sure same value wasn't clicked twice since we are switching
    if (unitValue === unitSetting) {
        console.log(`This setting is already selected!`)
    } else {
        // change unit to lbs/kgs
        unitSetting = unitValue
        // convert total weight to lbs/kgs
        if (unitSetting === 'LBS') {
            totalWeight *= 2.2
            unitSetting = 'LBS'
            amountEl.textContent = `${totalWeight.toFixed(2)} ${unitSetting}`
        } else if (unitSetting === 'KGS') {
            totalWeight /= 2.2
            unitSetting = 'KGS'
            amountEl.textContent = `${totalWeight.toFixed(2)} ${unitSetting}`
        } else {
            console.log('Invalid Unit Setting...')
        }
    }
}

// event listener for unit selection buttons
unitBtns.forEach(unitBtn => {
    unitBtn.addEventListener('click', changeUnit)
})

// take value of selected weight and add two plates to each side of bar
let increaseLoad = (event) => {
    let plateWeight = event.target.value
    if ( totalWeight >= 1000 ) {
        // limit bar weight
        alert('Nice try, bro. But that bar is definitely bent by now...')
    } else if ( plateArray.length >= 11 ) {
        // limit number of plates
        alert(`Don't hog all the plates, brother!`)
    } else {
        // if unit setting is lbs then go by the values passed in since they are already converted to lbs, otherwise divide by 2.2 to get accurate kilo measurement
        let addedValue
        if (unitSetting === 'LBS') {
            addedValue = plateWeight * 2
        } else {
            addedValue = plateWeight * 2 / 2.20462
        }
        totalWeight += addedValue
        amountEl.textContent = `${totalWeight.toFixed(2)} ${unitSetting}`
        plateArray.push(plateWeight)
        // Add image of plate on screen
        plateImages.push(`<img src='./${plateWeight}.png'</img>`)
        plateDisplayLeft.innerHTML = plateImages.join('')
        plateDisplayRight.innerHTML = plateImages.join('')
    }
}

// event listener for each plate button
plateBtns.forEach(plateBtn => {
    plateBtn.addEventListener('click', increaseLoad)
})

// remove most recent plate added
removeLastBtn.addEventListener('click', function() {
    if ( plateArray.length === 0 ) {
        console.log('There are no plates to remove!')
    } else {
        let subtractedValue = plateArray[plateArray.length - 1] * 2
        totalWeight -= subtractedValue
        amountEl.textContent = `${totalWeight.toFixed(2)} ${unitSetting}`
        plateArray.pop()
        plateImages.pop()
        plateDisplayLeft.innerHTML = plateImages.join('')
        plateDisplayRight.innerHTML = plateImages.join('')
    }
})

// empty the barbell
clearBtn.addEventListener('click', function() {
    plateArray = []
    plateImages = []
    plateDisplayLeft.innerHTML = ''
    plateDisplayRight.innerHTML = ''
    if (unitSetting === 'LBS') {
        totalWeight = 45
    } else {
        totalWeight = 20
    }
    amountEl.textContent = `${totalWeight} ${unitSetting}`
})

// show or hide targeted plate selection
let toggle = (event) => {
    let plateSelectionValue = event.target.value
    let plateSelectionDiv = document.querySelector(`#${plateSelectionValue}`)
    if (plateSelectionDiv.className === 'hide') {
        plateSelectionDiv.className = ''
    } else {
        plateSelectionDiv.className = 'hide'
    }
}

toggleBtns.forEach(btn => {
    btn.addEventListener('click', toggle)
})