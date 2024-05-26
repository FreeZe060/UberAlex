document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const restaurants = document.querySelectorAll('.structures__structure');
    const width = restaurants[0].offsetWidth;

    searchInput.addEventListener('input', function () {
        const searchQuery = searchInput.value.toLowerCase();

        restaurants.forEach(function (restaurant) {
            const restaurantName = restaurant.querySelector('.bu .bo').textContent.toLowerCase();

            const divImg = restaurant.querySelector('#divImg');
            const divDet = restaurant.querySelector('#divDet');

            if (restaurantName.includes(searchQuery)) {
                divImg.style.display = 'block';
                divDet.style.display = 'block';
                restaurant.style.width = width+'px';
            } else {
                divImg.style.display = 'none';
                divDet.style.display = 'none';
                restaurant.style.width = 0;
            }
        });
    });
});