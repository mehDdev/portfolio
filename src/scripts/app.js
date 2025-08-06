'use strict'

const loading = document.querySelector('#loading');
const barsIcon = document.querySelector('#bars-icon');
const nav = document.querySelector('#nav');
const overlay = document.querySelector('#overlay');
const scrollUpBtn = document.querySelector('#scroll-up-btn');

window.addEventListener('load', () => {
    loading.classList.remove('show');
    document.body.classList.add('active-scroll');

});

barsIcon.addEventListener('click', () => {
    nav.classList.add('show');
    overlay.classList.add('show');
    document.body.classList.remove('active-scroll');

});

overlay.addEventListener('click', () => {
    nav.classList.remove('show');
    overlay.classList.remove('show');
    document.body.classList.add('active-scroll');
});

document.addEventListener('scroll', () => {
    const scrollPosition = document.documentElement.scrollTop;
    const viewportHeight = document.documentElement.clientHeight;
    const contentHeight = document.documentElement.scrollHeight;

    if (scrollPosition + viewportHeight >= contentHeight) {
        scrollUpBtn.classList.remove('scale-0');
        
    } else {
        scrollUpBtn.classList.add('scale-0');
    }

});

scrollUpBtn.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
});