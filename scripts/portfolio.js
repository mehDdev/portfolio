'use strict'

const topBar = document.querySelector('#top-bar');
const errText = document.querySelector('#error-text');
const iframe = document.querySelector('iframe');
const locationParams = new URLSearchParams(location.search);
const portfolioName = locationParams.get('name');
const iframeSrc = `./portfolio/${portfolioName}/index.html`;

(async () => {
    try {
        const res = await fetch(iframeSrc);
        if (!res.ok) throw new Error('404 not found. Please make sure the URL is correct.');
        iframe.setAttribute('src', iframeSrc);
    } catch (err) {
        console.error(err.message);
        errText.innerText = 'Sample work not found.';
    }
})();

iframe.addEventListener('load', () => {
 
    const iframeDoc = iframe.contentDocument;
    let lastScrollTop = 0;
    
    const throttle = (func, delay) => {
        let lastCall = 0;
        return () => {
            const now = new Date().getTime();
            if (now - lastCall >= delay) {
                lastCall = now;
                func();
            }
        };
    };

    iframeDoc.addEventListener('scroll',
        throttle(() => {
            let scrollTop = iframeDoc.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                topBar.classList.add('h-0!')
                topBar.classList.add('invisible')
            };
            if (scrollTop < lastScrollTop) {
                topBar.classList.remove('h-0!')
                topBar.classList.remove('invisible')
            };
            lastScrollTop = scrollTop;

        }, 100)
    )

});