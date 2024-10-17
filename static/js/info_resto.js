document.addEventListener('DOMContentLoaded', function() {
    const quantityControls = document.querySelectorAll('.quantity-control');
    const item_cart = document.getElementById('item_cart')

    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.minus');
        const plusBtn = control.querySelector('.plus');
        const display = control.querySelector('.quantity-display');
        const displayValue = control.querySelector('p');
        const envoi = control.querySelector('.btn-add-to-cart');
        const inputQuantity = control.querySelector('#productQ');
        let quantity = 0;

        function updateDisplay() {
            inputQuantity.value = quantity;
            displayValue.textContent = quantity;

            if (quantity === 0) {
                minusBtn.style.display = 'none';
                plusBtn.style.display = 'none';
                displayValue.style.display = 'none';
                display.style.width = '30px';
                display.style.height = '30px';
                display.style.borderRadius = '50%';
                envoi.style.display = 'none';
            } else {
                displayValue.style.display = 'inline-block';
                minusBtn.style.display = 'inline-block';
                plusBtn.style.display = 'inline-block';
                envoi.style.display = 'flex';
                display.style.width = '0px';
                display.style.height = '0px';
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
    var boutons = document.querySelectorAll("#bouton .nav-links a");
    var traitNoir = document.createElement('div');
    var sections = document.querySelectorAll(".section");
    var isScrolling = false;
    
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

    var observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
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

    window.choisirOnglets = function(event, index) {
        event.preventDefault();
        isScrolling = true;
        updateSelection(index);

        var targetId = event.currentTarget.getAttribute("href");
        var targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });

        setTimeout(function() {
            isScrolling = false;
        }, 500);
    };
});

