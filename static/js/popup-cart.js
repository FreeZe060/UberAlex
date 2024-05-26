document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartPopup = document.getElementById('cart-popup');

    const showCartPopup = () => {
        const iconRect = cartIcon.getBoundingClientRect();
        let leftPosition = iconRect.left + window.scrollX;
        let topPosition = iconRect.bottom + window.scrollY;

        if (window.innerWidth > 600) {
            cartPopup.style.top = `110px`;
            cartPopup.style.right = `30px`;
            cartPopup.style.transform = 'translate(0%, 0%)';
        } else {
            cartPopup.style.top = '310px';
            cartPopup.style.transform = 'translate(-50%, -50%)';
        }
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
});