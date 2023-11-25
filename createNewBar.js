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
    weightInLBS: 0,
    weightInKGS: 0
}

const resetForm = () => {
    barNameInputEl.value = "";
    barWeightInput.value = "";
    lbsSelectEl.checked = false;
    kgsSelectEl.checked = false;
}

//change unit setting to lbs
lbsSelectEl.addEventListener('click', function() {
    unitSetting = "LBS"
    kgsSelectEl.checked = false;
})
//change unit setting to kgs
kgsSelectEl.addEventListener('click', function() {
    unitSetting = "KGS"
    lbsSelectEl.checked = false;
})

// click to submit
barSubmitEl.addEventListener('click', function() {
    // pain and im still probably forgetting something
    if (
        (barNameInputEl.value === null || barNameInputEl.value.length() === 0 )
        (barWeightInput.value === null || barWeightInput.value.length() === 0 )
        (unitSetting === null || unitSetting.length() === 0)
        ) {
        alert('One or more fields have not been filled...')
    }

    let isUnitLbs = unitSetting === "LBS" ? true : false
    // set name and weight properties based on input values from form
    newBarToSubmit.name = barNameInputEl.value
    // really not necessary to refactor an if into a ternary here...
    // but i really like the look of ternary statements
    newBarToSubmit.weightInLBS = parseFloat(barWeightInput.value * (isUnitLbs ? 1 : 2.2))
    newBarToSubmit.weightInKGS = parseFloat(barWeightInput.value / (isUnitLbs ? 2.2 : 1))

    alert(`Barbell "${newBarToSubmit.name}", weighing ${newBarToSubmit.weightInLBS.toFixed(2)} LBS
    or ${newBarToSubmit.weightInKGS.toFixed(2)} KGS, will now be submitted!`)
    push(barsInDB, newBarToSubmit)
    resetForm()
})
