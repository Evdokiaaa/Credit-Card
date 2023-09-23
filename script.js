const form = document.querySelector('.form')
//front card

//name
const frontCardName = document.querySelector(".card__front-name");
const frontCardNameInput = document.querySelector("#cardHolder");
const frontCardNameError = document.querySelector(".form__error-name");
//numbers
const frontCardNumbers = document.querySelector(".card__front-number");
const frontCardNumbersInput = document.querySelector("#cardNumber");
const frontCardNumbersError = document.querySelector(".form__error-number");
//month
const frontCardMonth = document.querySelector(".card__front-month");
const frontCardMonthInput = document.querySelector("#expirationMonth");
const frontCardMonthError = document.querySelector('.form__input-mm--error');
//year
const frontCardYear = document.querySelector(".card__front-year");
const frontCardYearInput = document.querySelector("#expirationYear");
const frontCardYearError = document.querySelector('.form__input-yy--error');
//back card

const cvcInput = document.querySelector('#cardCvc')
const cvcError = document.querySelector('.form__input-cvc--error')
const cvcCard = document.querySelector(".card__back-cvc");

const confirmBtn = document.querySelector('.form__confirm-button')
let validateName = false;
let validateNumber = false;
let validateMonth = false;
let validateYear = false;
let validateCvc = false;

//validate name
frontCardNameInput.addEventListener('input',()=>{
    validateNumbers(frontCardNameInput,frontCardNameError)
    if(frontCardNameInput.value === '') frontCardName.textContent = 'JANE APPLESEED';
    else frontCardName.textContent = frontCardNameInput.value
})
frontCardNumbersInput.addEventListener('input',(e)=>{
    let value = e.target.value
    if(frontCardNumbersInput.value === '') frontCardNumbers.textContent = '0000 0000 0000 0000';
    else frontCardNumbers.textContent = frontCardNumbersInput.value
    //validation
    const rex = /['A-z]/g
    if(rex.test(value)){
        showError(frontCardNumbersInput,frontCardNumbersError, 'Wrong format, numbers only')
    } else{
        frontCardNumbersInput.value = frontCardNumbersInput.value.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim();
        showError(frontCardNumbersInput,frontCardNumbersError,'',false)
    }
})
frontCardMonthInput.addEventListener('input',()=>{
    validateLetters(frontCardMonthInput,frontCardMonthError)
    if(frontCardMonthInput.value === '') frontCardMonth.textContent = '00'
    else frontCardMonth.textContent = frontCardMonthInput.value
})
frontCardYearInput.addEventListener('input',()=>{
    validateLetters(frontCardYearInput, frontCardYearError)
    if(frontCardYearInput.value === '') frontCardYear.textContent = '00'
    else frontCardYear.textContent = frontCardYearInput.value
})

cvcInput.addEventListener('input',()=>{
    validateLetters(cvcInput, cvcError)
    if(cvcInput.value === '') cvcCard.textContent = '000'
    else cvcCard.textContent = cvcInput.value
})

confirmBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if(formIsFilled(frontCardNameInput,frontCardNameError)){
        const rex = /[0-9]/
        if(rex.test(frontCardNameInput.value)){
            showError(frontCardNameInput,frontCardNameError,'Wrong format, letters only')
            validateName=false
        } else{
            showError(frontCardNameInput,frontCardNameError,'',false)
            validateName = true;
        }
    }
    if(formIsFilled(frontCardNumbersInput,frontCardNumbersError)){
        if(frontCardNumbersInput.value.length!==19){
            showError(frontCardNumbersInput,frontCardNumbersError,'Wrong Length')
            validateNumber = false;
        } else{
            showError(frontCardNumbersInput,frontCardNumbersError,'',false)
            validateNumber = true
        }

    }
    if(formIsFilled(frontCardMonthInput,frontCardMonthError)){
        if((parseInt(frontCardMonthInput.value) > 0) && (parseInt(frontCardMonthInput.value) <= 12)  ){
            showError(frontCardMonthInput,frontCardMonthError,'',false)
            validateMonth = true
        } else {
            showError(frontCardMonthInput,frontCardMonthError,'Wrong month')
            validateMonth = false;
        }
    }
    if (formIsFilled(frontCardYearInput,frontCardYearError)){

        if((parseInt(frontCardYearInput.value) >=23) && (parseInt(frontCardYearInput.value) <=30)){

            //showError(frontCardYearInput,frontCardYearError,'',false)
            validateYear = true
        } else {
            showError(frontCardYearInput,frontCardYearError,'Wrong year',)
            validateYear = false;
        }
    }
    formIsFilled(cvcInput,cvcError) ? validateCvc = true: validateCvc = false;
    if(validateMonth === true && validateName === true && validateNumber === true && validateYear === true && validateCvc === true){
        document.querySelector('.confirmation__container').classList.remove('hidden')
        form.classList.add('hidden')
    }

})

function showError(divInput, divErr, msgErr, show=true){ //our input ( name, numbers.., error-div, err msg and show/not)
    if(show){
        divErr.textContent = msgErr
        divInput.style.borderColor = '#DC143C'
        divInput.style.margin = '0px';
    } else{
        divErr.innerText = msgErr;
        divInput.style.borderColor = 'hsl(270, 3%, 87%)';
        if(divInput === frontCardMonthInput ||divInput === frontCardYearInput || divInput===cvcInput ){
            divInput.style.margin = '0';
        } else  divInput.style.marginBottom = '40px';

    }
}

function formIsFilled(divInput,err){
    if(divInput.value.length>0){
        showError(divInput,err,'',false)
        return true
    } else{
        showError(divInput,err,'Must be filled')
        return false
    }
}
function validateNumbers(divInput, err){
    const rex = /[0-9]/g
    if(rex.test(divInput.value)){
        showError(divInput,err, 'Wrong format, letters only')

    } else{
        showError(divInput,err,'',false)
    }
}
function  validateLetters(divInput,err){
    const rex = /[A-z]/g
    if(rex.test(divInput.value)){
        showError(divInput,err, 'Wrong format, numbers only')
    } else{
        showError(divInput,err, '', false)
    }
}
