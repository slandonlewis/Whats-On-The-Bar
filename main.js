let amountEl = document.querySelector('#amount-el')
// initial amounts
let barWeight = 45
let totalWeight = barWeight
let unitSetting = 'LBS'
// let previousPlate = ''
let plateArray = []
amountEl.textContent = `${totalWeight} ${unitSetting}`

// switch conversion between lbs and kgs
let changeUnit = (unitValue) => {
    // make sure same value wasn't clicked twice since we are switching
    if (unitValue === unitSetting) {
        console.log(`This setting is already selected!`)
    } else {
        // change unit to lbs/kgs
        unitSetting = unitValue
        console.log(unitSetting)
        // convert total weight to lbs/kgs
        if (unitSetting === 'LBS') {
            totalWeight *= 2.2
            unitSetting = 'LBS'
            amountEl.textContent = `${totalWeight} ${unitSetting}`
        } else if (unitSetting === 'KGS') {
            totalWeight /= 2.2
            unitSetting = 'KGS'
            amountEl.textContent = `${totalWeight} ${unitSetting}`
        } else {
            console.log('Invalid Unit Setting...')
        }
    }
}

// take value of selected weight and add two plates to each side of bar
let increaseLoad = (plateWeight) => {
    let addedValue = plateWeight * 2
    totalWeight += addedValue
    amountEl.textContent = `${totalWeight} ${unitSetting}`
    plateArray.push(plateWeight)
}

// remove most recent plate added
let decreaseLoad = () => {
    if ( plateArray.length === 0 ) {
        console.log('There are no plates to remove!')
    } else {
        let subtractedValue = plateArray[plateArray.length - 1] * 2
        totalWeight -= subtractedValue
        amountEl.textContent = `${totalWeight} ${unitSetting}`
        plateArray.pop()
        console.log(plateArray)
    }
}