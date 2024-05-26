document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const restaurantList = document.getElementById('restaurant-list');
    const restaurants = Array.from(restaurantList.children);

    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase();

        restaurants.forEach(restaurant => {
            const restaurantName = restaurant.querySelector('#rest_name').textContent.toLowerCase();
            if (restaurantName.includes(searchTerm)) {
                restaurant.style.display = '';
            } else {
                restaurant.style.display = 'none';
            }
        });
    });
});