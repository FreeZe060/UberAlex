var successPopup = document.getElementById('contact-info__popup');
const textPopup = successPopup.querySelector('#modif');

function showSuccessPopup(text) {
    textPopup.innerHTML = text;
    successPopup.style.top = '150px';
    setTimeout(hideSuccessPopup, 5000);
}

function hideSuccessPopup() {
    successPopup.style.top = '-100px';
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}