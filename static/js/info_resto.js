document.addEventListener('DOMContentLoaded', function() {
    const quantityControls = document.querySelectorAll('.quantity-control');

    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const display = control.querySelector('.quantity-display');

        let quantity = 0;

        function updateDisplay() {
            document.getElementById('productQ').value = quantity;

            if (quantity === 0) {
                display.textContent = '+';
                minusBtn.style.display = 'none';
                plusBtn.style.display = 'none';
                display.style.width = '30px';
                display.style.height = '30px';
                display.style.borderRadius = '50%';
            } else {
                display.textContent = quantity;
                minusBtn.style.display = 'inline-block';
                plusBtn.style.display = 'inline-block';
                display.style.width = 'auto';
                display.style.height = 'auto';
                display.style.borderRadius = '0';
            }

            if (quantity === 9) {
                plusBtn.disabled = true;
            } else {
                plusBtn.disabled = false;
            }

            if (quantity > 0) {
                minusBtn.disabled = false;
            } else {
                minusBtn.disabled = true;
            }
        }

        display.addEventListener('click', () => {
            if (quantity === 0) {
                quantity = 1;
                updateDisplay();
            }
        });

        plusBtn.addEventListener('click', () => {
            if (quantity < 9) {
                quantity++;
                updateDisplay();
            }
        });

        minusBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                updateDisplay();
            } else if (quantity === 1) {
                quantity = 0;
                updateDisplay();
            }
        });

        updateDisplay();
    });

});

document.addEventListener("DOMContentLoaded", function() {
    var boutons = document.querySelectorAll("#boutons .nav-links a");
    var traitNoir = document.createElement('div');
    traitNoir.classList.add('trait-noir');
    document.querySelector('#boutons').appendChild(traitNoir);
    var sections = document.querySelectorAll(".section");
    var isScrolling = false;

    // Fonction pour mettre à jour la sélection du bouton
    function updateSelection(index) {
        for (var i = 0; i < boutons.length; i++) {
            boutons[i].classList.remove("selected");
        }
        boutons[index].classList.add("selected");

        var boutonSelectionne = boutons[index];
        var boutonSelectionneRect = boutonSelectionne.getBoundingClientRect();
        var parentRect = boutonSelectionne.parentElement.getBoundingClientRect();
        var boutonSelectionnePosition = boutonSelectionneRect.top - parentRect.top;

        console.log('Selected button position:', boutonSelectionnePosition); // Debug

        traitNoir.style.height = boutonSelectionne.offsetHeight + "px";
        traitNoir.style.transform = "translateY(" + boutonSelectionnePosition + "px)";
        traitNoir.style.opacity = "1";
    }

    // Initialiser la position du trait noir pour le premier élément sélectionné
    var boutonSelectionne = document.querySelector("#boutons .nav-links a.selected");
    if (boutonSelectionne) {
        var boutonSelectionneRect = boutonSelectionne.getBoundingClientRect();
        var parentRect = boutonSelectionne.parentElement.getBoundingClientRect();
        var boutonSelectionnePosition = boutonSelectionneRect.top - parentRect.top;
        console.log('Initial selected button position:', boutonSelectionnePosition); // Debug

        traitNoir.style.height = boutonSelectionne.offsetHeight + "px";
        traitNoir.style.transform = "translateY(" + boutonSelectionnePosition + "px)";
        traitNoir.style.opacity = "1";
    }

    // Intersection Observer pour les sections
    var observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5 // Ajustez selon vos besoins
    };

    var observer = new IntersectionObserver(function(entries, observer) {
        if (!isScrolling) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var index = Array.prototype.indexOf.call(sections, entry.target);
                    updateSelection(index);
                }
            });
        }
    }, observerOptions);

    sections.forEach(function(section) {
        observer.observe(section);
    });

    // Gestion des clics sur les boutons
    window.choisirOnglet = function(event, index) {
        event.preventDefault();
        isScrolling = true;
        updateSelection(index);

        var targetId = event.currentTarget.getAttribute("href");
        var targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });

        // Attendre que le défilement soit terminé avant de permettre l'observation
        setTimeout(function() {
            isScrolling = false;
        }, 500);
    };
});

