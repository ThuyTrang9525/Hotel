// Lấy ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

// Hàm lấy dữ liệu phòng từ localStorage
function getRoomsFromLocalStorage() {
    const products = JSON.parse(localStorage.getItem('rooms'));
    return products ? products : [];
}

// Lấy danh sách phòng
var rooms = getRoomsFromLocalStorage();
// Tìm phòng theo ID
var room = rooms.find(roo => roo.id == id);
console.log(rooms);
console.log(room);

// Hiển thị thông tin phòng lên HTML
if (room) {
    document.getElementById('room-image').getElementsByTagName('img')[0].src = room.image;
    document.getElementById('typeRoom').innerHTML = room.type;
    document.getElementById('nameRoom').innerHTML = room.name;
    document.getElementById('typeBed').innerHTML = room.bedType;
    document.getElementById('room-price').innerHTML = room.price + ' VND';
    document.getElementById('roomarea').innerHTML = room.area; // Diện tích
    document.getElementById('roomview').innerHTML = room.view; // Tầm nhìn
    
    // Xử lý tiện nghi
    const amenitiesString = room.amenities;
    const amenitiesArray = amenitiesString.split('+');
    var roomAmenities = document.getElementById('amenities-text');
    amenitiesArray.forEach(amenity => {
        roomAmenities.innerHTML += `<li class="amenity">${amenity}</li>`;
    });
} else {
    console.log('Phòng không tồn tại.');
}

// Hàm quay lại
function returnn() {
    history.back();
}



/*fetch(`http://localhost:3000/rooms?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);  
        for (const element of data) {
            var html = 
            `<div class="col-lg-6 col-md-8">
                <div class="card shadow-sm mb-4">
                    <img src="${element.image}" class="card-img-top" alt="Room Image">
                    <div class="card-body">
                        <h5 class="card-title text-center">Loại phòng: ${element.type}</h5> 
                        <p class="card-text">
                            <strong>Số người:</strong> ${element.occupancy}<br>
                            <strong>Loại giường:</strong> ${element.bed_type}<br>
                            <strong>Tiện nghi:</strong> ${element.amenities.join(', ')}<br> 
                            <strong>Giá phòng:</strong> ${element.price} VND<br>
                        </p>
                        <div class="d-grid gap-2">
                            <a href="#" class="btn btn-primary btn-block">Đặt phòng ngay</a>
                        </div>
                    </div>
                </div>
            </div>`;
        }
    document.getElementById('demo').innerHTML = html;
    });
*/