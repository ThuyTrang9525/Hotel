// Lấy ID từ URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);
//hàm tìm user
function findUser(id){
    const user= users.find( user => user.id === id);
    if (user){
        return user;
    }/*else{
        alert("Không có users")
    }*/
}
//hàm  lấy tam số url
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
var users=getUsersFromLocalStorage();
var user="";
if(users.length>0&&getQueryParam('userId')){
    user=findUser(getQueryParam('userId'))
}else{
    //Tạo một user giả
    user='';
}
// Hàm lấy dữ liệu phòng từ localStorage
function getRoomsFromLocalStorage() {
    const products = JSON.parse(localStorage.getItem('rooms'));
    return products ? products : [];
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
//
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
    document.getElementById('room-price').innerHTML = changeMoney(room.price) + ' VND';
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
//Hàm chuyển tiền
function changeMoney(money){
    let resultMoney=""
    const StringMoney= money+"";
    const num=StringMoney.length;
    const num1=num/3|0;
    if((num-num1*3)>0){
        for(let i=0;i<(num-num1*3);i++){
            if(i==(num-num1*3-1)){
                resultMoney+=StringMoney.charAt(i)+".";
            }else{
                resultMoney+=StringMoney.charAt(i);
            }
        }
    }
    for(let i =0;i<num1*3;i++){
        if((i+1)%3==0&&i!=(num1*3-1)){
            resultMoney+=StringMoney.charAt(i+(num-num1*3))+".";
        }else{
            resultMoney+=StringMoney.charAt(i+(num-num1*3));
        }
    }
    return resultMoney
}