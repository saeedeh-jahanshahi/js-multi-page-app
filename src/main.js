// import '../style/style.css'
// import { headers } from './page-content.js';
import axios from 'axios';
import * as Step1 from './pages/step1.js';
import * as Step2 from './pages/step2.js';
import * as Step3 from './pages/step3.js';
import * as Step4 from './pages/step4.js';
import * as Step5 from './pages/step5.js';

const { step1, checkAll, step1Store } = Step1;
const { step2, step2Store } = Step2;
const { step3, step3Store } = Step3;
const { step4, step4Store } = Step4;
const { step5, step5Store } = Step5;

const mainConentContainer = document.querySelector('.page-container');
const mainContent = mainConentContainer.querySelector('main');
const btnNext = document.getElementById('btn--next');
const btnBack = document.getElementById('btn--back');
const header = document.getElementById('title');
const subHeader = document.getElementById('sub-title');

let currentPathIndex = 0;
let isLoad = true;
let userId;

const pathNames = ['step1', 'step2', 'step3', 'step4', 'step5'];
const view = {
  step1: () => step1(btnBack),
  step2: () => step2(btnNext, btnBack),
  step3: () => step3(btnNext),
  step4: () => step4(btnNext),
  step5: () => step5(),
};
const storeData = {
  step1: () => step1Store(),
  step2: () => step2Store(),
  step3: () => step3Store(),
  step4: () => step4Store(),
  step5: () => step5Store(),
};

const initUserId = function () {
  if (sessionStorage.getItem('userInfo')) {
    userId = JSON.parse(sessionStorage.getItem('userInfo')).id;
  } else {
    userId = parseInt(Math.random() * 100);
    sessionStorage.setItem('userInfo', JSON.stringify({ id: userId }));
  }
};

const findCurrentPathIndex = (path) => pathNames.indexOf(path);

const updateHeaders = function (path) {
  axios.get(`http://localhost:3000/headers/${path}`).then((response) => {
    header.textContent = response.data.title;
    subHeader.textContent = response.data.subtitle;
  });
};
const updateLinksHref = function (pathIndex) {
  const nextPath =
    pathIndex + 1 >= pathNames.length ? '' : pathNames[pathIndex + 1];
  const prevPath = pathIndex - 1 < 0 ? '' : pathNames[pathIndex - 1];
  btnNext.href = nextPath;
  btnBack.href = prevPath;
  // console.log(btnBack.href, btnNext.href);
};

const updateNavActive = function (path) {
  const allNav = document.querySelectorAll('.list__num');
  allNav.forEach((nav) => nav.removeAttribute('data-active'));
  const currentNav = document.getElementById(`nav-${path}`);
  currentNav.setAttribute('data-active', '');
};

const popHistory = function (e) {
  const pathName = location.pathname;
  const pathIndex = findCurrentPathIndex(pathName.substring(1));
  currentPathIndex = pathIndex;
  sessionStorage.setItem('currentPathIndex', currentPathIndex);
  route(currentPathIndex);
};

const moveAnimation = function (time = 1000) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      mainContent.querySelectorAll('.place--left').forEach((element) => {
        element.dataset.move = '';
      });
    }, time);
    resolve('success');
  });

  return promise;
};

const route = function (pathIndex) {
  let path = pathNames[pathIndex];
  const template = document.getElementById(path);
  mainContent.innerHTML = '';
  mainContent.append(document.importNode(template.content, true));
  moveAnimation(200).then((resolve) => {
    console.log(resolve);
  });

  if (path !== 'step5') {
    updateHeaders(path);
    updateNavActive(path);
    updateLinksHref(pathIndex);
  } else {
    updateNavActive(pathNames[pathIndex - 1]);
  }
  view[path]();
};

export const goback = function (e, position = -1) {
  console.log(e);
  e.preventDefault();
  if (isLoad) {
    history.pushState(null, null, `/${pathNames[--currentPathIndex]}`);
    sessionStorage.setItem('currentPathIndex', currentPathIndex);
    route(currentPathIndex);
  } else {
    history.go(position);
  }
  if (currentPathIndex !== 3) {
    storeData[pathNames[currentPathIndex]]();
  }
};

export const changeBtn = function(btn, text, classes){
  btn.textContent = text;
  btn.classList.add(classes.addName);
  btn.classList.remove(classes.removeName);
};

document.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
  currentPathIndex = parseInt(sessionStorage.getItem('currentPathIndex') || 0);
  initUserId();
  history.pushState(null, null, `/${pathNames[currentPathIndex]}`);
  route(currentPathIndex);
});

btnNext.addEventListener('click', (e) => {
  e.preventDefault();
  const path = location.pathname.substring(1);
  const isRoute = path !== 'step1' || checkAll();
  if (isRoute) {
    isLoad = false;
    storeData[path]();
    history.pushState(null, null, `/${pathNames[++currentPathIndex]}`);
    sessionStorage.setItem('currentPathIndex', currentPathIndex);
    route(currentPathIndex);
  }
});

btnBack.addEventListener('click', goback);

window.addEventListener('popstate', popHistory);
