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
        sideMenu.style.padding = "0";
        body.classList.remove("menu-open");
    } else {
        sideMenu.style.width = "250px";
        sideMenu.style.padding = "1rem";
        body.classList.add("menu-open");
    }
}

window.onload = function() {
    choisirOnglet(0);
}

function choisirOnglet(index) {
    var boutons = document.getElementsByClassName("bouton-onglet");
    for (var i = 0; i < boutons.length; i++) {
        boutons[i].classList.remove("selected");
        boutons[i].removeAttribute("name");
    }
    boutons[index].classList.add("selected");

    switch(index) {
        case 0:
            boutons[index].setAttribute("name", "info");
            break;
        case 1:
            boutons[index].setAttribute("name", "commande");
            break;
        case 2:
            boutons[index].setAttribute("name", "favoris");
            break;
    }
    
    var traitNoir = document.querySelector(".trait-noir");
    var boutonSelectionne = boutons[index];
    var boutonSelectionnePosition = boutonSelectionne.offsetLeft;
    traitNoir.style.width = boutonSelectionne.offsetWidth + "px";
    traitNoir.style.transform = "translateX(" + boutonSelectionnePosition + "px)";
    var nomContenu = boutons[index].getAttribute("name");
    window.nomContenu = nomContenu;
}
