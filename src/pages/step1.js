let inputs;
let errorMessages;

const errorMessagesTxt = ['This field is required', 'The email is invalid'];

const selectElments = function () {
  inputs = document.querySelectorAll('form input');
  errorMessages = document.querySelectorAll('.error-message');
};

export const checkAll = function () {
  let isAll = true;
  inputs.forEach((input) => {
    validate(input);
    isAll =
      isAll && errorMessages[input.dataset.id].hasAttribute('data-hidden');
  });
  return isAll;
};

const validateEmail = function (email) {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi;
  return regex.test(email);
};

const validate = function (input) {
  errorMessages[input.dataset.id].removeAttribute('data-hidden');
  if (!input.value) {
    errorMessages[input.dataset.id].textContent = errorMessagesTxt[0];
    return;
  }
  if (input.type === 'email' && !validateEmail(input.value)) {
    errorMessages[input.dataset.id].textContent = errorMessagesTxt[1];
    return;
  }
  errorMessages[input.dataset.id].setAttribute('data-hidden', '');
};

const retrieveData = function () {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));
  if (user.name) {
    inputs.forEach((input) => {
      input.value = user[input.name];
    });
  }
};

export const step1 = function (btnBack) {
  selectElments();
  btnBack.setAttribute('data-visibility', '');
  inputs.forEach((input) =>
    input.addEventListener('focusout', validate.bind(null, input))
  );
  retrieveData();
};

export const step1Store = function () {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));
  inputs.forEach((input) => {
    user[input.name] = input.value;
  });
  sessionStorage.setItem('userInfo', JSON.stringify(user));
};
