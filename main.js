let amountEl = document.querySelector('#amount-el')
// initial amounts and values
let barWeight = 45
let totalWeight = barWeight
let unitSetting = 'LBS'
let plateArray = []
let plateImages = []
let plateDisplayLeft = document.querySelector('#plate-display-left')
let plateDisplayRight = document.querySelector('#plate-display-right')
let standardPlatesEl = document.querySelector(`#standard-plates`)
let competitionPlatesEl = document.querySelector(`#competition-plates`)
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
    if ( totalWeight >= 1000 ) {
        // limit bar weight
        alert('Nice try, bro. But that bar is definitely bent by now...')
    } else if ( plateArray.length >= 11 ) {
        // limit number of plates
        alert(`Don't hog all the plates, brother!`)
    } else {
        let addedValue = plateWeight * 2
        totalWeight += addedValue
        amountEl.textContent = `${totalWeight} ${unitSetting}`
        plateArray.push(plateWeight)
        // EXPERIMENTAL: Add image of plate on screen
        plateImages.push(`<img src='./${plateWeight}.png'</img>`)
        plateDisplayLeft.innerHTML = plateImages.join('')
        plateDisplayRight.innerHTML = plateImages.join('')
    }
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
        // EXPERIMENTAL: Remove image of plate on screen
        plateImages.pop()
        plateDisplayLeft.innerHTML = plateImages.join('')
        plateDisplayRight.innerHTML = plateImages.join('')
    }
}

// empty the barbell
let clearAll = () => {
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
}

// show or hide targeted plate selection
let toggle = (plateSelection) => {
    // alert(plateSelection.id)
    if (plateSelection.className === 'hide') {
        plateSelection.className = ''
    } else {
        plateSelection.className = 'hide'
    }
}