// Tìm kiếm và hiển thị tiện ích đã chọn khi nhấn tìm kiếm
    document.addEventListener("DOMContentLoaded", function() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const searchButton = document.querySelector('.btn-search');
        
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
//  HIỂN THỊ FORM ĐẶT

function openBookingForm(serviceName) {
    // Hiển thị dịch vụ được chọn
    document.getElementById('selectedService').textContent = "Dịch vụ: " + serviceName;

    // Hiển thị overlay và form đặt tiện ích
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('bookingForm').style.display = 'block';
}

// Hàm đóng form đặt tiện ích
function closeBookingForm() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('bookingForm').style.display = 'none';
}

// Hàm xác nhận đặt chỗ
function confirmBooking() {
    // Lấy thông tin dịch vụ đã chọn và thời gian sử dụng
    var serviceName = document.getElementById('selectedService').textContent;
    var usageTime = document.getElementById('usageTime').value;

    // Kiểm tra xem người dùng đã chọn thời gian chưa
    if (usageTime === "") {
        alert("Vui lòng chọn thời gian sử dụng.");
        return;
    }

    // Tạo đối tượng lưu thông tin đặt chỗ
    var booking = {
        service: serviceName,
        time: usageTime
    };

    // Lấy dữ liệu từ localStorage nếu đã có, hoặc tạo mảng mới nếu chưa có
    var bookingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];

    // Thêm đặt chỗ mới vào mảng lịch sử đặt chỗ
    bookingHistory.push(booking);

    // Lưu lại dữ liệu vào localStorage
    localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

    // Thông báo người dùng
    alert("Đặt chỗ thành công!");

    // Đóng form
    closeBookingForm();
}

function closeBookingForm() {
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}


document.querySelectorAll('.book-btn').forEach(button => {
    button.addEventListener('click', function() {
        const serviceName = this.getAttribute('data-service-name');
        openBookingForm(serviceName);
    });
});
