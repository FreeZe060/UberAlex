const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

function toggleMenu() {
    var body = document.body;
    if (sideMenu.style.width == "250px") {
        sideMenu.style.width = "0";
        sideMenu.style.padding = "0";
        body.classList.remove("menu-open");
    } else {
        sideMenu.style.width = "250px";
        sideMenu.style.padding = "1rem";
        body.classList.add("menu-open");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('neumorphism');
    const extraButton = document.getElementById('extra-button');

    toggle.addEventListener('change', function() {
        if (toggle.checked) {
            extraButton.style.display = 'block';
            console.log("oui");
        } else {
            extraButton.style.display = 'none';
        }
    });
});







