'use strict';

const form = document.querySelector('.form');
const username = document.querySelector('.username');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const password2 = document.querySelector('.password2');
const submitBtn = document.querySelector('.submit');
const resetBtn = document.querySelector('.reset');

// Functions
// Show input Error message
function showError(input, message) {
  const formWrap = input.parentElement;
  formWrap.className = 'form-container error';
  formWrap.querySelector('small').textContent = message;
}
// show input success message
function showSuccess(input) {
  const formWrap = input.parentElement;
  formWrap.className = 'form-container success';
}

// Check the email

function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
  // return re.test(String(email).toLowerCase());
}

function checkRequiredFields(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, `${getProperName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check length

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, 'Password is too short');
  } else if (input.value.length > max) {
    showError(input, 'Password is too long');
  } else {
    showSuccess(input);
  }
}

// Get proper name

function getProperName(input) {
  return `${input.className[0].toUpperCase()}${input.className.slice(1)}`;
}

// check is passwords match!

function passIsMatch(input1, input2) {
  if (
    input2.value === '' ||
    input1.value !== input2.value ||
    input1.parentElement.classList.contains('error')
  ) {
    showError(input2, `${getProperName(input2)} is not matching`);
  } else {
    showSuccess(input2);
  }
}

function resetTheForm(inputArr) {
  inputArr.forEach(inp => inp.parentElement.classList.remove('error'));
  inputArr.forEach(inp => (inp.value = ''));
}
//////////////////////////////////////////////////////////////////
// Event listeners

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  checkRequiredFields([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  passIsMatch(password, password2);
});

resetBtn.addEventListener('click', function () {
  console.log('reset');
  resetTheForm([username, email, password, password2]);
});
