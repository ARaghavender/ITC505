
function calculateIdealWeight(weight, height, gender) {
    const heightInches = height / 2.54;
    let idealWeight;

    if (gender === 'male') {
        idealWeight = (50 + 0.91 * (heightInches - 60)) * 2.20462;
    } else if (gender === 'female') {
        idealWeight = (45.5 + 0.91 * (heightInches - 60)) * 2.20462;
    }

    return idealWeight.toFixed(2);
}


function handleSubmit(event) {
    event.preventDefault();

    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const genderSelect = document.getElementById('gender');
    const resultElement = document.getElementById('result');

    // Get values from inputs
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    const gender = genderSelect.value;


    if (isNaN(weight) || weight === '' || weight === 0) {
        resultElement.innerHTML = 'Please enter a valid weight.';
        return;
    } else if (isNaN(height) || height === '' || height === 0) {
        resultElement.innerHTML = 'Please enter a valid height.';
        return;
    }

    const idealWeight = calculateIdealWeight(weight, height, gender);


    resultElement.innerHTML = `Ideal Weight: ${idealWeight} lbs`;


    if (weight > idealWeight) {
        resultElement.innerHTML += '<p style="color:red">Your weight is more than the ideal weight. Consider registering for the fitness program.</p>';
    } else {
        resultElement.innerHTML += 'Your weight is within the ideal range. ';
    }
}


const form = document.getElementById('idealWeightForm');
form.addEventListener('submit', handleSubmit);
