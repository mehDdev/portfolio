document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        new TypeIt("#description", {
            strings: ["a frontend developer building modern websites with HTML, CSS, JavaScript, and React."],
            speed: 50
            
        }).go();

    }, 750);

});