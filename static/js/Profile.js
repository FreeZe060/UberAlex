window.onload = function() {
    choisirOnglet(0);
}

function choisirOnglet(index) {
    var info = document.getElementById("info");
    var commande = document.getElementById("commande");
    var favoris = document.getElementById("favoris");
    var boutons = document.getElementsByClassName("bouton-onglet");
    for (var i = 0; i < boutons.length; i++) {
        boutons[i].classList.remove("selected");
    }
    boutons[index].classList.add("selected");

    switch(index) {
        case 0:
            info.style.display = "block";
            commande.style.display = "none";
            favoris.style.display = "none";
            break;
        case 1:
            info.style.display = "none";
            commande.style.display = "block";
            favoris.style.display = "none";
            break;
        case 2:
            info.style.display = "none";
            commande.style.display = "none";
            favoris.style.display = "block";
            break;
        default:
            info.style.display = "block";
            commande.style.display = "none";
            favoris.style.display = "none";
            break;
    }
    
    var traitNoir = document.querySelector(".trait-noir");
    var boutonSelectionne = boutons[index];
    var boutonSelectionnePosition = boutonSelectionne.offsetLeft;
    traitNoir.style.width = boutonSelectionne.offsetWidth + "px";
    traitNoir.style.transform = "translateX(" + boutonSelectionnePosition + "px)";
}