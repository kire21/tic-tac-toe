'use strict';

const btnStart = document.querySelector('.btn__start');
const body = document.querySelector('body');

const showPlayDisplay = function (e) {
  e.preventDefault();
  body.style.backgroundImage = 'none';
};

btnStart.addEventListener('click', showPlayDisplay);
