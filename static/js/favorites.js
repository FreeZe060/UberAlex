document.addEventListener('DOMContentLoaded', () => {
    const favButtons = document.querySelectorAll('.structure_button-fav');

    favButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Vérifier que l'utilisateur est connecté
            const memberId = window.memberId;
            if (!memberId) {
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'warning',
                    title: 'Vous devez être connecté pour ajouter aux favoris',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
                return;
            }

            const restaurantId = this.getAttribute('data-restaurant-id');
            const isFavorited = this.classList.contains('favorited');

            try {
                let response;
                if (!isFavorited) {
                    // Envoi de la requête pour ajouter aux favoris
                    response = await fetch('/favorites/restaurant', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ memberId, restaurantId })
                    });
                } else {
                    // Envoi de la requête pour retirer le favori
                    response = await fetch('/favorites/restaurant', {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ memberId, restaurantId })
                    });
                }

                const result = await response.json();
                if (response.ok && result.success) {
                    // Bascule de la classe "favorited" sur le bouton
                    this.classList.toggle('favorited');

                    // Animation du bouton (scale)
                    this.animate([
                        { transform: 'scale(1.2)' },
                        { transform: 'scale(1)' }
                    ], {
                        duration: 300,
                        easing: 'ease-out'
                    });

                    // Affichage de l'alerte SweetAlert2 en bas à droite
                    Swal.fire({
                        position: 'bottom-end',
                        icon: 'success',
                        title: !isFavorited ? 'Restaurant ajouté aux favoris' : 'Restaurant retiré des favoris',
                        showConfirmButton: false,
                        timer: 1500,
                        toast: true
                    });
                } else {
                    Swal.fire({
                        position: 'bottom-end',
                        icon: 'error',
                        title: result.error || 'Erreur lors de la mise à jour des favoris',
                        showConfirmButton: false,
                        timer: 1500,
                        toast: true
                    });
                }
            } catch (err) {
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'error',
                    title: err.message,
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
            }
        });
    });
});
