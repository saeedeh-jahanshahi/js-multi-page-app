import axios from 'axios';
import { changeBtn } from '../main';

let carts;
let addonsSelected = [];

const retreiveData = function () {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));
  if (user.addonsSelected) {
    addonsSelected = user.addonsSelected;
    carts.forEach((cart) => addonsClickHandler(cart));
  }
};

const getAddonsPrices = async function () {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));
  const costPeriod = user.costPeriod;
  let extraServices = await axios.get('http://localhost:3000/info/step3');
  extraServices = extraServices.data[costPeriod];
  carts.forEach((cart) => {
    const addonsPrice = cart.querySelector('.addons-price');
    addonsPrice.textContent = `+${
      extraServices[cart.dataset.id]
    }/${costPeriod}`;
  });
};

const addonsClickHandler = function (cart) {
  const checkIcon = cart.querySelector('.check-icon');
  if (addonsSelected.includes(cart.dataset.id)) {
    cart.setAttribute('data-checked', '');
    checkIcon.setAttribute('data-checked', '');
  } else {
    cart.removeAttribute('data-checked');
    checkIcon.removeAttribute('data-checked');
  }
};

export const step3 = function (btnNext) {
  carts = Array.from(document.querySelectorAll('.cart'));
  getAddonsPrices();
  carts.forEach((cart) => cart.addEventListener('click', e => {
    if(addonsSelected.includes(cart.dataset.id)){
      const index = addonsSelected.findIndex(addon => addon === cart.dataset.id);
      addonsSelected.splice(index, 1);
    }
    else{
      addonsSelected.push(cart.dataset.id);
    }
    addonsClickHandler(e.currentTarget);
  }));
  changeBtn(btnNext, 'Next Step', {addName: 'bg--primary-1', removeName: 'bg--accent-1'});
  retreiveData();
};

export const step3Store = function () {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));
  user.addonsSelected = addonsSelected;
  sessionStorage.setItem('userInfo', JSON.stringify(user));
};
