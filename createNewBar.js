import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const appSettings = {
    databaseURL: "https://whatsonthebar-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const barsInDB = ref(database, "barbellList")

const barSubmitEl = document.querySelector('#bar-submit')
const barNameInputEl = document.querySelector('#bar-name-input')
const barWeightInput = document.querySelector('#bar-weight-input')
const lbsSelectEl = document.querySelector('#pounds-btn')
const kgsSelectEl = document.querySelector('#kilos-btn')
let unitSetting = null

// bar object to submit
let newBarToSubmit = {
    name: "",
    weightInLBS: "",
    weightInKGS: ""
}

//change unit setting to lbs
lbsSelectEl.addEventListener('click', function() {
    unitSetting = "LBS"
})
//change unit setting to kgs
kgsSelectEl.addEventListener('click', function() {
    unitSetting = "KGS"
})

// click to submit
barSubmitEl.addEventListener('click', function() {
    // set name and weight properties based on input values from form
    newBarToSubmit.name = barNameInputEl.value
    if (unitSetting === "LBS") {
        newBarToSubmit.weightInLBS = barWeightInput.value
        newBarToSubmit.weightInKGS = barWeightInput.value / 2.2
        alert(`Barbell "${newBarToSubmit.name}", weighing ${newBarToSubmit.weightInLBS} LBS
        or ${newBarToSubmit.weightInKGS} KGS, will now be submitted!`)
        push(barsInDB, newBarToSubmit)
        location.reload()
    } else if (unitSetting === "KGS") {
        newBarToSubmit.weightInLBS = barWeightInput.value * 2.2
        newBarToSubmit.weightInKGS = barWeightInput.value
        alert(`Barbell "${newBarToSubmit.name}", weighing ${newBarToSubmit.weightInLBS} LBS
        or ${newBarToSubmit.weightInKGS} KGS, will now be submitted!`)
        push(barsInDB, newBarToSubmit)
        location.reload()
    } else {
        alert('One or more fields have not been filled...')
    }
})