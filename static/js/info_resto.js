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

function choisirOnglet(event, index) {
    event.preventDefault();

    var boutons = document.querySelectorAll("#boutons .nav-links a");
    var traitNoir = document.querySelector(".trait-noir");

    for (var i = 0; i < boutons.length; i++) {
        boutons[i].classList.remove("selected");
    }
    boutons[index].classList.add("selected");

    var boutonSelectionne = boutons[index];
    var boutonSelectionnePosition = boutonSelectionne.offsetTop;
    traitNoir.style.height = boutonSelectionne.offsetHeight + "px";
    traitNoir.style.transform = "translateY(" + boutonSelectionnePosition + "px)";

    var targetId = boutonSelectionne.getAttribute("href");
    var targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' });
}
