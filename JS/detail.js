const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);
function getRoomsFromLocalStorage(){
    const products =JSON.parse(localStorage.getItem('rooms'));
    if(!products){
        return [];
    }
    else{
        return products;
    }
}
var rooms=getRoomsFromLocalStorage()
var room=rooms.find(roo => roo.id==id)
console.log(rooms)
console.log(room)
document.getElementById('typeRoom').innerHTML=room.type;
document.getElementById('nameRoom').innerHTML=room.name;
document.getElementById('typeBed').innerHTML=room.bedType;
document.getElementById('room-price').innerHTML=room.price;
const amenitiesString =room.amenities;
const amenitiesArray=amenitiesString.split('+')
var roomAmenities=document.getElementById('room-amenities');
amenitiesArray.forEach(amenity=>{
    roomAmenities.innerHTML+=`
    <li class="amenity">${amenity}</li>
    `
})
function returnn(){
    history.back()
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