function removeProduct(productId) {
    fetch('./remove-from-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: productId })
    })
        .then(response => {
            if (response.ok) {
                location.reload(); // Actualiser la page après la suppression du produit
            } else {
                console.error('Erreur lors de la suppression du produit du panier');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la suppression du produit du panier:', error);
        });
}