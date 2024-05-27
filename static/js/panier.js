function removeProduct(productId) {
    fetch('/user/remove-from-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: productId })
    })
        .then(response => {
            if (response.ok) {
                location.reload();
            } else {
                console.error('Erreur lors de la suppression du produit du panier');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la suppression du produit du panier:', error);
        });
}

function continuerVersLePaiement() {
    var opCarte = document.getElementById('opCarte');
    var opBalance = document.getElementById('opBalance');
    
    if (!opCarte.checked && !opBalance.checked) {
        alert('Vous devez sélectionner un moyen de paiement.');
    } else if (opCarte.checked) {
        var modal = document.getElementById('myModal');
        modal.style.display = 'flex';
    } else if (opBalance.checked) {
        var modal2 = document.getElementById('myModal2');
        modal2.style.display = 'flex';
    }
}

function closeModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

function closeModal2() {
    var modal2 = document.getElementById('myModal2');
    modal2.style.display = 'none';
}

function submitPayment() {
    var cardNumber = document.getElementById('cardNumber')?.value;
    var expDate = document.getElementById('expDate')?.value;
    var cvv = document.getElementById('cvv')?.value;
    var country = document.getElementById('country')?.value;

    if (cardNumber && expDate && cvv && country && validateCardDetails(cardNumber, expDate, cvv, country)) {
        alert('Commande passée');
        window.location.href = '/';
    } else {
        alert('Veuillez vérifier les informations de votre carte.');
    }
}

function validerPaiement() {
    var montantCommande = parseFloat(document.getElementById('montantCommande').textContent);
    var idRestaurant = document.getElementById('restaurant').getAttribute("id_restaurant");

    fetch('/user/payment-balance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            totalOrder: montantCommande,
            idRestaurant
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Erreur lors de la validation du paiement.');
            }
        })
        .then(data => {
            if (data.success) {
                window.location.href = '/';
            } else {
                alert('Erreur lors de la validation du paiement : ' + data.message);
            }
        })
        .catch(error => {
            console.error('Erreur lors de la validation du paiement:', error);
            alert('Une erreur s\'est produite lors de la validation du paiement. Veuillez réessayer.');
        });
}


function validateCardDetails(cardNumber, expDate, cvv, country) {
    if (cardNumber.length < 16 || expDate.length < 5 || cvv.length < 3 || country === '') {
        return false;
    }
    return true;
}

var span = document.getElementsByClassName('close')[0];
span.onclick = function() {
    closeModal();
}

window.onclick = function(event) {
    var modal = document.getElementById('myModal');
    if (event.target === modal) {
        closeModal();
    }
}

var span2 = document.getElementsByClassName('close')[1];
span2.onclick = function() {
    closeModal2();
}

window.addEventListener('click', function (event) {
    var modal2 = document.getElementById('myModal2');
    var modalContent = document.querySelector('.modal-content');

    if (event.target === modal2 && !modalContent.contains(event.target)) {
        closeModal2();
    }
});