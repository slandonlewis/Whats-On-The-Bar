// //@ts-check

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
const barOptions = document.querySelectorAll('.bar-options')

// initial amounts and values
let myBars = [
    {
        id: 0,
        name: "Standard Olympic Barbell",
        weightInLBS: 45,
        weightInKGS: 20.45
    }
]
let barSetting = myBars[0] 
let barWeight = parseFloat(barSetting.weightInLBS.toFixed(2))
let totalWeight = parseFloat(barWeight)
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
        let barToAddToSelection = {
            id: myBars.length,
            name: bar.name,
            weightInKGS: parseFloat(bar.weightInKGS),
            weightInLBS: parseFloat(bar.weightInLBS)
        }
        myBars.push(barToAddToSelection)
        barSelectionHTML += `<option class="bar-options" value="${barToAddToSelection.id}">${bar.name} - ${Math.round(bar.weightInKGS)} KG / ${Math.round(bar.weightInLBS)} LBS</option>`
    });
    // join barSelectionHTML with the dropdown
    barSelectionEl.innerHTML += barSelectionHTML
    console.log(myBars)
    console.log(barOptions)
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
            amountEl.textContent = `${parseFloat(totalWeight.toFixed(2))} ${unitSetting}`
        } else if (unitSetting === 'KGS') {
            totalWeight /= 2.2
            unitSetting = 'KGS'
            amountEl.textContent = `${parseFloat(totalWeight.toFixed(2))} ${unitSetting}`
        } else {
            console.log('Invalid Unit Setting...')
        }
    }
}
// event listener for unit selection buttons
unitBtns.forEach(unitBtn => {
    unitBtn.addEventListener('click', changeUnit)
})

// change bar setting
let changeBar = (event) => {
    barSetting = myBars[parseInt(event.target.value)]
    if (unitSetting === "LBS") {
        barWeight = barSetting.weightInLBS
    } else {
        barWeight = barSetting.weightInKGS
    }
    console.log(barWeight)
    let plateWeight = plateArray.reduce((a, b) => a + b, 0)
    totalWeight = barWeight + plateWeight*2
    amountEl.textContent = `${parseFloat(totalWeight.toFixed(2))} ${unitSetting}`   
}

// event listener for dropdown options
// barOptions.forEach(bar => {
//     bar.addEventListener('change', changeBar)
// })
const selectorEl = document.querySelector('#bar-select')
selectorEl.addEventListener('change', changeBar)

// take value of selected weight and add two plates to each side of bar
let increaseLoad = (event) => {
    let plateWeight = parseFloat(event.target.value)
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
        let parsedTotal = parseFloat(totalWeight)
        console.log(parsedTotal)
        amountEl.textContent = `${parsedTotal.toFixed(2)} ${unitSetting}`
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
        amountEl.textContent = `${parseFloat(totalWeight.toFixed(2))} ${unitSetting}`
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
        totalWeight = parseFloat(barSetting.weightInLBS.toFixed(2))
    } else {
        totalWeight = parseFloat(barSetting.weightInKGS.toFixed(2))
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