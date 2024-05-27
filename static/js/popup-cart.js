document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartPopup = document.getElementById('cart-popup');

    const updateCartPopupPosition = () => {
        if (window.innerWidth > 600) {
            cartPopup.style.top = `110px`;
            cartPopup.style.right = `30px`;
            cartPopup.style.transform = 'translate(0%, 0%)';
        } else {
            cartPopup.style.top = '250px';
            cartPopup.style.transform = 'translate(-50%, -50%)';
        }
    };

    const showCartPopup = () => {
        updateCartPopupPosition();
        cartPopup.style.display = 'block';
    };

    const hideCartPopup = () => {
        cartPopup.style.display = 'none';
    };

    cartIcon.addEventListener('click', () => {
        if (cartPopup.style.display === 'none' || cartPopup.style.display === '') {
            showCartPopup();
        } else {
            hideCartPopup();
        }
    });

    document.addEventListener('click', (event) => {
        if (!cartIcon.contains(event.target) && !cartPopup.contains(event.target)) {
            hideCartPopup();
        }
    });

    window.addEventListener('resize', updateCartPopupPosition);
});
