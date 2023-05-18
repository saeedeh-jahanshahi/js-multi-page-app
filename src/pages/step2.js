import axios from 'axios';
import { changeBtn } from '../main';

let costPeriod = 'mo';
let planName = 'arcade';
let carts;
let costPeriodElement;

const retreiveData = function () {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));
  if(user.planName){
    costPeriod = user.costPeriod;
    planName = user.planName;
    const cart = carts.find(c => c.dataset.id === user.planName);
    cart.click();
    costPeriodHandler();
  }
};

const planInfo = async function () {
  let cartInfo = await axios.get('http://localhost:3000/info/step2');
  cartInfo = cartInfo.data[costPeriod];
  // console.log(cartInfo);
  carts.forEach((cart) => {
    cart.querySelector('.plan-cost').textContent = `$${
      cartInfo[cart.dataset.id]
    }/${costPeriod}`;
    const extraInfo = cart.querySelector('.extra-info');
    costPeriod === 'yr'
      ? extraInfo.removeAttribute('data-hidden')
      : extraInfo.setAttribute('data-hidden', '');
  });
};

const costPeriodHandler = function () {
  const toggle = costPeriodElement.querySelector('span.btn-radio__toggle');
  toggle.dataset.side = costPeriod;
  planInfo(carts);
  const planCostItems = costPeriodElement.querySelectorAll('li');
  if (costPeriod === 'mo') {
    planCostItems[1].removeAttribute('data-selected');
    planCostItems[0].setAttribute('data-selected', '');
  } else {
    planCostItems[0].removeAttribute('data-selected');
    planCostItems[1].setAttribute('data-selected', '');
  }
};

const cartCheckedHandler = function(e){
  carts.map((cart) => {
    if (cart.hasAttribute('data-checked')) {
      cart.removeAttribute('data-checked');
    }
  });
  e.currentTarget.setAttribute('data-checked', '');
  planName = e.currentTarget.dataset.id;
};

export const step2 = function (btnNext, btnBack) {
  btnBack.removeAttribute('data-visibility');
  changeBtn(btnNext, 'Next Step', {addName: 'bg--primary-1', removeName: 'bg--accent-1'});
  carts = Array.from(document.querySelectorAll('.plan > li'));
  costPeriodElement = document.getElementById('plan-cost-type');
  planInfo(carts);

  costPeriodElement
    .querySelector('div.btn-radio')
    .addEventListener(
      'click', () => {
        costPeriod = costPeriod === 'mo' ? 'yr' : 'mo';
        costPeriodHandler();
      }
      );

  carts.forEach((cart) => {
    cart.addEventListener('click', cartCheckedHandler);
  });

  retreiveData();
};

export const step2Store = function () {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));
  user.planName = planName;
  user.costPeriod = costPeriod;
  sessionStorage.setItem('userInfo', JSON.stringify(user));
};
