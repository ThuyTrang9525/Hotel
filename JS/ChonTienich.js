
    document.addEventListener("DOMContentLoaded", function() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const searchButton = document.querySelector('.btn-dark');
        
        function filterAmenities() {
       
            const amenities = document.querySelectorAll('.col-md-6');

            let selectedFilters = [];

            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedFilters.push(checkbox.value);
                }
            });

            if (selectedFilters.length === 0) {
                amenities.forEach(amenity => {
                    amenity.style.display = 'block';
                });
                return;
            }

            amenities.forEach(amenity => {
                const amenityType = amenity.getAttribute('data-type');

                if (selectedFilters.includes(amenityType)) {
                    amenity.style.display = 'block'; // Show matching amenity
                } else {
                    amenity.style.display = 'none'; // Hide non-matching amenity
                }
            });
        }

        searchButton.addEventListener('click', filterAmenities);
    });
