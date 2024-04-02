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
    var sideMenu = document.getElementById("sideMenu");
    var body = document.body;
    if (sideMenu.style.width == "250px") {
        sideMenu.style.width = "0";
        body.classList.remove("menu-open");
    } else {
        sideMenu.style.width = "250px";
        body.classList.add("menu-open");
    }
}