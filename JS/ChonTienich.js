function getQueryParam(param){
    var urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(param);
}
//hàm lấy từ cục nộ hay đặt một users
function getUsersFromLocalStorage(){
    const products =JSON.parse(localStorage.getItem('users'));
    if(!products){
        alert("ko có users nào")
        return [];
    }
    else{
        return products;
    }
}
//hàm tìm user
function findUser(id){
    const user= users.find( user => user.id === id);
    if (user){
        return user;
    }/*else{
        alert("Không có users")
    }*/
}
var users=getUsersFromLocalStorage();
var user="";
if(users.length>0&&getQueryParam('userId')){
    user=findUser(getQueryParam('userId'))
}
//Hiện và ẩn phần trên menu
hienAnMenu();
function hienAnMenu(){
    if(user.id!=""&&user.id){
        document.getElementById('c-logIn').classList.add('d-none')
        document.getElementById('c-register').classList.add('d-none')
        document.getElementById('c-profile').classList.remove('d-none');
    }else{
        document.getElementById('c-logIn').classList.remove('d-none');
        document.getElementById('c-register').classList.remove('d-none');
        document.getElementById('c-profile').classList.add('d-none');
    }
}
//Gắn key userId vào link các đường dẫn được chọn
var listAHrefChange=document.querySelectorAll('.aHref');
listAHrefChange.forEach(hreff=> {
    const hrefAfter=hreff.getAttribute('href')+addUserIdOnmenu()
    hreff.setAttribute('href',hrefAfter)
})
function addUserIdOnmenu(){
    const beHaft ="?userId="+user.id;
    return beHaft;
}

// Tìm kiếm và hiển thị tiện ích đã chọn khi nhấn tìm kiếm
document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const searchButton = document.querySelector('.btn-search');
    const selectAllCheckbox = document.getElementById('all');

    function filterAmenities() {
        const amenities = document.querySelectorAll('.col-md-6');
        let selectedFilters = [];

        // Kiểm tra nếu chọn tất cả
        if (selectAllCheckbox.checked) {
            amenities.forEach(amenity => {
                amenity.style.display = 'block'; // Show all amenities
            });
            return;
        }

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

// // HIỂN THỊ FORM ĐẶT
// let selectedPrice = 0; // Biến toàn cục lưu trữ giá dịch vụ

// function openBookingForm(serviceName, price) {
//     // Hiển thị dịch vụ được chọn và giá
//     document.getElementById('selectedService').textContent = "Dịch vụ: " + serviceName;
//     document.getElementById('servicePrice').textContent = "Giá: " + price; // Hiển thị giá trong form

//     selectedPrice = price; // Lưu giá vào biến toàn cục
//     document.getElementById('bookingForm').style.display = 'block';
// }

// // Hàm đóng form đặt tiện ích
// function closeBookingForm() {   
//     document.getElementById('bookingForm').style.display = 'none';
// }

// // Hàm xác nhận đặt chỗ
// function confirmBooking() {
//     // Lấy thông tin dịch vụ đã chọn và thời gian sử dụng
//     var serviceName = document.getElementById('selectedService').textContent.replace("Dịch vụ: ", "").trim();
//     var usageDate= document.getElementById('usageDate').value;
//     var usageTime = document.getElementById('usageTime').value;

//     // Kiểm tra xem người dùng đã chọn thời gian chưa
//     if (usageTime === "" || usageDate === "") {
//         alert("Vui lòng chọn thời gian sử dụng.");
//         return;
//     }

//     // Tạo đối tượng lưu thông tin đặt chỗ
//     var booking = {
//         service: serviceName,
//         date: usageDate,
//         time: usageTime,
//         price: selectedPrice // Sử dụng giá đã lưu
//     };

//     // Lấy dữ liệu từ localStorage nếu đã có, hoặc tạo mảng mới nếu chưa có
//     var bookingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];

//     // Thêm đặt chỗ mới vào mảng lịch sử đặt chỗ
//     bookingHistory.push(booking);

//     // Lưu lại dữ liệu vào localStorage
//     localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

//     // Thông báo người dùng
//     alert("Đặt chỗ thành công!");
    
//     // Đóng form sau khi đặt chỗ thành công
//     closeBookingForm();
// }

// // Gán sự kiện cho nút đặt tiện ích
// document.querySelectorAll('.book-btn').forEach(button => {
//     button.addEventListener('click', function() {
//         const serviceName = this.getAttribute('data-service-name');
//         const price = this.getAttribute('data-price');
//         openBookingForm(serviceName, price); // Gọi hàm mở form và truyền tên dịch vụ và giá
//     });
// });
