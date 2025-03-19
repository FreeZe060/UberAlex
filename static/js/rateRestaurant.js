document.addEventListener('DOMContentLoaded', () => {
    const rateButtons = document.querySelectorAll('.btn_rate_restaurant');

    rateButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            const restaurantId = this.getAttribute('data-restaurant-id');
            const memberId = window.memberId;
            if (!memberId) {
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'warning',
                    title: 'Vous devez être connecté pour noter',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
                return;
            }
            Swal.fire({
                title: 'Noter votre commande',
                html: `
                    <div class="star-rating" data-rating="0">
                        <span class="star" data-value="1">&#9733;</span>
                        <span class="star" data-value="2">&#9733;</span>
                        <span class="star" data-value="3">&#9733;</span>
                        <span class="star" data-value="4">&#9733;</span>
                        <span class="star" data-value="5">&#9733;</span>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Valider',
                cancelButtonText: 'Annuler',
                preConfirm: () => {
                    const rating = Swal.getPopup().querySelector('.star-rating').getAttribute('data-rating');
                    if (!rating || rating === "0") {
                        Swal.showValidationMessage(`Veuillez sélectionner une note`);
                    }
                    return rating;
                },
                didOpen: () => {
                    const stars = Swal.getPopup().querySelectorAll('.star');
                    stars.forEach(star => {
                        star.addEventListener('click', function() {
                            const rating = this.getAttribute('data-value');
                            const container = Swal.getPopup().querySelector('.star-rating');
                            container.setAttribute('data-rating', rating);
                            stars.forEach(s => {
                                if (parseInt(s.getAttribute('data-value')) <= rating) {
                                    s.style.color = 'gold';
                                } else {
                                    s.style.color = 'gray';
                                }
                            });
                        });
                    });
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const ratingValue = parseFloat(result.value);
                    try {
                        const response = await fetch('/ratings/restaurant', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ memberId, restaurantId, rating: ratingValue })
                        });
                        const data = await response.json();
                        if (response.ok && data.success) {
                            Swal.fire({
                                position: 'bottom-end',
                                icon: 'success',
                                title: 'Note enregistrée',
                                showConfirmButton: false,
                                timer: 1500,
                                toast: true
                            });
                        } else {
                            Swal.fire({
                                position: 'bottom-end',
                                icon: 'error',
                                title: data.error || 'Erreur lors de l\'enregistrement de la note',
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
                }
            });
        });
    });
});
