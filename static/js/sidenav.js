const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

const closeBtn = document.querySelector('.closebtn');

// closeBtn.addEventListener('click', () => {
//     toggleMenu();
// });

function toggleMenu() {
    var sideMenu = document.getElementById("sideMenu");
    if (sideMenu.style.width == "250px") {
        sideMenu.style.width = "0";
    } else {
        sideMenu.style.width = "250px";
    }
}