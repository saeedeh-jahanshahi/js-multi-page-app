import axios from 'axios';
import { goback, changeBtn } from '../main';

const getTotalInfo = async function(user){
  let planPrice = await axios.get('https://multi-page-app-62c23-default-rtdb.asia-southeast1.firebasedatabase.app/info/step2.json');
  let addons = await axios.get('https://multi-page-app-62c23-default-rtdb.asia-southeast1.firebasedatabase.app/info/step3.json');
  addons = addons.data[user.costPeriod];
  planPrice =  planPrice.data[user.costPeriod][user.planName];
  let addonsPrice = {};
  user.addonsSelected.forEach(addonName => {
    addonsPrice[addonName] = addons[addonName];
  });

  return [planPrice, addonsPrice];
  
}

const changeCostPeriodText = function (costPeriod, txt){
  return costPeriod === 'mo' ? txt[0] : txt[1];
}

const addInfo = function(user, elements){
  const {planNameElement, planPriceElement, addonsTemplate, planContainer} = elements;

  let costPeriod = changeCostPeriodText(user.costPeriod, ['Monthly', 'Yearly']);
  planNameElement.textContent = `${user.planName} (${costPeriod})`;
  costPeriod = changeCostPeriodText(user.costPeriod, ['per month', 'per year']);
  getTotalInfo(user).then(result => {
    const [planPrice, addonsPrice] = result;
    let totalPrice = planPrice;
    document.getElementById('total-price').textContent = `+$${totalPrice}/${user.costPeriod}`;
    planPriceElement.textContent = `$${planPrice}/${user.costPeriod}`;
    for(const addonsName in addonsPrice){
      const addonContanier = addonsTemplate.content.cloneNode(true).querySelector('li');
      addonContanier.dataset.id = addonsName;
      addonContanier.querySelector('.addons-name').textContent = addonsName;
      addonContanier.querySelector('.addons-price').textContent = `+$${addonsPrice[addonsName]}/${user.costPeriod}`;
      planContainer.append(addonContanier);
      totalPrice += addonsPrice[addonsName];
      document.getElementById('total-name').querySelector('span').textContent = `(${costPeriod})`;
      document.getElementById('total-price').textContent = `+$${totalPrice}/${user.costPeriod}`;
    }
  });
}

export const step4Store = async function(){
  const user = sessionStorage.getItem('userInfo');
  try{
    const result = await axios.post(`https://multi-page-app-62c23-default-rtdb.asia-southeast1.firebasedatabase.app/users.json`, user, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(result);
  }
  catch(e){
    console.log(e);
  }
};
export const step4 = function (btnNext) {
  const user = JSON.parse(sessionStorage.getItem('userInfo'));
  const planNameElement = document.getElementById('plan-name');
  const planPriceElement = document.getElementById('plan-price');
  const addonsTemplate = document.getElementById('step4-plan-item');
  const planContainer = document.querySelector('.plan-container');
  const changeLink = document.getElementById('change-link');
  addInfo(user, {planNameElement, planPriceElement, addonsTemplate, planContainer});
  changeBtn(btnNext,'Confirm', {addName: 'bg--accent-1', removeName: 'bg--primary-1'});
  changeLink.addEventListener('click', e => {goback(e, -2);});
  
};