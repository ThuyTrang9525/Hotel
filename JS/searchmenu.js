const typePrice =document.querySelector('.typePrice');
const typeRoom = document.querySelector('.typeRoom');
const boxFilterPrice = document.getElementById('boxFilterPrice');
const boxFilterTypeRoom = document.getElementById('boxFilterTypeRoom');
typePrice.addEventListener('click',function(){
    if(boxFilterPrice.style.display==='none'){
        boxFilterPrice.style.display = "block"
        typePrice.style.backgroundColor= "rgb(143, 143, 143)"
    }else {
        boxFilterPrice.style.display = "none";
        typePrice.style.backgroundColor= ""
    }
})
typeRoom.addEventListener('click',function(){
    if(boxFilterTypeRoom.style.display==='none'){
        boxFilterTypeRoom.style.display = "block"
        typeRoom.style.backgroundColor= "rgb(143, 143, 143)"
    }else {
        boxFilterTypeRoom.style.display = "none";
        typeRoom.style.backgroundColor= ""
    }
})
var users =[
{
    id:"u1",
    fullname: "user1",
    phone: "000001",
    email: "user1@.com",
    gender: "male",
    dob: "not",
    address: "addressuser1",
    username: "user1isboy",
    password: "user1",
    lever: 'viewer',
    book:[],
    history:[],
    },
    {
    id:"u2",
    fullname: "user2",
    phone: "000001",
    email: "user2@.com",
    gender: "male",
    dob: "not",
    address: "addressuser2",
    username: "user2isboy",
    password: "user1",
    lever: 'viewer',
    book:[],
    history:[],
    },
    {
    id:"u3",
    fullname: "user3",
    phone: "000001",
    email: "user3@.com",
    gender: "male",
    dob: "not",
    address: "addressuser3",
    username: "user3isboy",
    password: "user3",
    lever: 'viewer',
    book:[],
    history:[],
    }
];
var rooms = [
{
    id:"r1",
    name:"phòng 1",
    price:300000,
    type: "Thường"
},
{
    id:"r2",
    name:"phòng 2",
    price:700000,
    type: "Thương gia"
},
{
    id:"r3",
    name:"phòng 3",
    price:1000000,
    type: "Tổng thống"
},
{
    id:"r4",
    name:"phòng 4",
    price:600000,
    type: "Thương gia"
},
];
//Hàm lấy lấy user chưa chỉnh sửa
function getProductsFromLocalStorage(){
    const products =JSON.parse(localStorage.getItem('users'));
    if(!products){
        return products =[];
    }
    else{
        return products;
    }
}
// Hàm tính ngày tự động 
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');
const rentalDaysInput = document.getElementById('rental-days');

function calculateRentalDays() {
    const checkInDate = new Date(checkInInput.value);
    const checkOutDate = new Date(checkOutInput.value);

    // Kiểm tra xem cả hai ngày có hợp lệ và ngày trả phòng lớn hơn ngày nhận phòng
    if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
        const timeDiff = checkOutDate - checkInDate; // Tính sự khác biệt giữa hai ngày
        const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Đổi từ mili giây sang ngày
        rentalDaysInput.value = dayDiff; // Hiển thị số ngày vào trường "Số ngày"
    } else {
        rentalDaysInput.value = 0; // Đặt lại giá trị nếu không hợp lệ
    }
}

// Lắng nghe sự kiện khi người dùng thay đổi giá trị của check-in hoặc check-out
checkInInput.addEventListener('change', calculateRentalDays);
checkOutInput.addEventListener('change', calculateRentalDays);
//Hàm lấy phòng từ locla chưa chỉnh
function getProductsFromLocalStorage(){
    const products =JSON.parse(localStorage.getItem('rooms'));
    if(!products){
        return products =[];
    }
    else{
        return products;
    }
}
//Hàm lấy url từ đường dẫn
function getQueryParam(param){
    var urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(param);
}
//Hàm tìm user với thuộc tính id từ URL
function findUser(id){
    const user= users.find( user => user.id === id);
    if (user){
        return user;
    }else{
        alert("Không có users")
    }
}
//Xac nhận filter trước khi hiện nội dung
var beFilter=getQueryParam('type');
// Xác nhận tài khoang người đang dùng
var user = findUser("u01");
console.log(user)
// xác nhận ngày dến và ngày đi(chưa hoàn thành)
var startDay1= "2024-10-13"
var endDay1="2024-10-16"
var startDayChance = new Date(startDay1);
var endDayChance = new Date (endDay1);
var startDay =changeTime(startDayChance)
var endDay = changeTime(endDayChance)
var numDay = (endDayChance-startDayChance)/(1000*24*60*60);
console.log(numDay)
document.getElementById('bookDateToHotel').innerHTML=startDay;
document.getElementById('bookDateBackHotel').innerHTML=endDay;
document.getElementById('bookNumDateHotel').innerHTML=numDay;

//

//Hiện kết quả tìm kiếm
document.addEventListener('DOMContentLoaded',showResultRooms())
//SỰ KIỆN KHI LỌC KẾT QUẢ
const buttonFillter =document.getElementById('buttonFillter');
buttonFillter.addEventListener('click', function(){
    showResultRooms();
}) 
//Hàm chuyển đổi ngày tháng năm
function changeTime(date){
    let day = String(date.getDate()).padStart(2,'0');
    let month = String (date.getMonth()+1).padStart(2,'0');
    let year = date.getFullYear()
    return day+"/"+month+"/"+year;
}       
//Hàm hiện các phòng()
function showResultRooms(){
    //sắp xếp các pần tử trong danh sách
    let listRoom=rooms;
    listRoom=findRoomAcodingPriceRoom(listRoom);
    listRoom=findRoomAcodingTypeRoom(listRoom);
    listRoom=sortRoom(listRoom);
    //in ra trang web
    let add =document.getElementById('boxResult');
    add.innerHTML ="";
    listRoom.forEach(room =>{
        add.innerHTML+=
        `<div class="boxRoom">
                <div class="image">
                    <img src="/IMAGE/doubleBed1.webp" alt="image">
                </div>
                <div class="boxRoomNon">
                    <div class="boxRoomFlexNon">
                        <div class="roomNon"><p class="textTemplate textA">${room.name}</p></div>
                        <div class="roomNon"><p class="textTemplate text3"> <i class="fas fa-user-friends"></i>2 người</p></div>
                    </div>
                    <div class="boxRoomFlexNon">
                        <div class="roomNon"><p class="textTemplate textA textColor">${changeMoney(room.price)}</p></div>
                        <div class="roomNon"><button class="buttonChoseRoom" data-room-id="${room.id}" data-type="true">chọn</button></div>
                    </div>
                </div>
            </div> `
    })
    addEvetChoseButton() ; 
    showRoomInBasket(); 
}
//Hàm hiện các phòng ở giỏ hàng
function showRoomInBasket(){
    const roomInBasket =user.book;
    const container =document.getElementById('doingBook');
    container.innerHTML="";
    let i=1;
    roomInBasket.forEach(room => {
        const defiRoom = rooms.find(roo => roo.id == room.idRoom);
        container.innerHTML+=
        `
            <div class="containNonBook">
                <p class="numRoomChoseBook textTemplate text3 ">Phòng ${i} ${defiRoom.name}</p>
                <div class="boxFlex fieldButtonOfchose">
                    <p class="priceRoomChoseBook textTemplate text3 ">Giá ${defiRoom.price} vnđ/Ngày</p>
                    <button class="deleteBookRoom" onclick="buttonDeleteRoom('${room.idRoom}')">X Xóa</button>
                </div>
            </div>
        `
        i+=1;
    })
    showMoney();
}
//hàm xóa một phần tử ở giỏ hàng
function buttonDeleteRoom(id){
    user.book = user.book.filter(bo => bo.idRoom != id); 
    showResultRooms()
}
//Hàm hiện tổng tiền các đơn hàng ở giỏ hàng
function showMoney(){
    let total=0;
    user.book.forEach(room =>{
        total +=parseInt(room.price)
    })
    document.getElementById('notTotolBook').innerHTML=total;
}
//Hàm chọn phòng vào giỏ hàng
function addEvetChoseButton(){
    const buttonChoseRoom=document.querySelectorAll('.buttonChoseRoom');
    buttonChoseRoom.forEach(chose =>{
    const checked =user.book.filter( bo => bo.idRoom ==chose.dataset.roomId)
    if(!checked || checked==""){
        chose.dataset.type="true";
    }else{
        chose.dataset.type="false";
    }
    if(chose.dataset.type=="true"){
        chose.style.backgroundColor ="blue";
        chose.innerHTML="Chọn"
    }else{
        chose.style.backgroundColor ="red";
            chose.innerHTML="Bỏ chọn"
    }
    chose.addEventListener('click',function(){
        const room= rooms.find(room => room.id==chose.dataset.roomId);
        if(chose.dataset.type=="true"){
            if(user.book.length<3){
                const faker = {
                    idRoom:room.id,
                    dateTo:startDay1,
                    dataLeave:endDay1,
                    price: parseInt(room.price)*parseInt(numDay),
                }
                user.book.push(faker);
                chose.style.backgroundColor ="red";
                chose.innerHTML="Bỏ chọn"
                chose.dataset.type="false";
            }else{
                alert("Chỉ được chọn 3 phòng")
            }
        }else{
            user.book = user.book.filter(bo => bo.idRoom !== chose.dataset.roomId); 
            chose.style.backgroundColor ="blue";
            chose.innerHTML="Chọn"
            chose.dataset.type="true";
        }
        showRoomInBasket(); 
    })
})
}
//(1)hàm tìm các phòng theo giá (Đã hoàn thành)
function findRoomAcodingPriceRoom(list){
    let listRoom=[];
    let minPrice = document.getElementById('minPrice').value;
    let maxPrice =document.getElementById('maxPrice').value;
    if(!minPrice&&!maxPrice){
        listRoom=list;
    }else if(!minPrice&&maxPrice){
        listRoom=findRoomWithMaxPrice(list,parseInt(maxPrice));
    }else if(minPrice&&!maxPrice){
        listRoom=findRoomWithMinPrice(list,parseInt(minPrice));
    }else{
        listRoom=findRoomFromAtoB(list,parseInt(minPrice),parseInt(maxPrice));
    }
    return listRoom;
}

//(2)Hàm tìm các phòng theo loại(Đã hoàn thành)
function findRoomAcodingTypeRoom(list){
    if(beFilter=="1"){
        statusTypeRoom1.checked =true;
        beFilter="";
    }else if (beFilter=="2"){
        statusTypeRoom2.checked= true;
        beFilter="";
    }else if( beFilter=="3"){
        statusTypeRoom3.checked = true;
        beFilter="";
    }
    let type="";
    const statusTypeRoom1=document.getElementById('statusTypeRoom1');
    const statusTypeRoom2=document.getElementById('statusTypeRoom2');
    const statusTypeRoom3=document.getElementById('statusTypeRoom3');
    if(statusTypeRoom1.checked){
        type=statusTypeRoom1.value;
    }else if(statusTypeRoom2.checked){
        type=statusTypeRoom2.value;
    }else if (statusTypeRoom3.checked){
        type=statusTypeRoom3.value;
    }else{
        return list;
    }
    return findRoomAtType(list,type)
}
//(3)Sắp xếp(chưa hoàn thành)
function sortRoom(list){
    let status=""
    let statusSort= document.querySelectorAll('.sort');
    statusSort.forEach((sort) => {
        if(sort.checked){
            status=sort.value;
        }
    })
    if(status=="sort1"){
        return list.sort((a,b) => b.price - a.price);
    } else if(status=="sort2"){
        return list.sort((a,b) => a.price -b.price)
    }else{
        return list
    }
}

//(1)hàm tìm phòng với giá ít nhất là min
function findRoomWithMinPrice(list,min){
    let listRoom= list.filter(room => parseInt(room.price) >=min);
    if(listRoom.length>0){
        console.log(listRoom);
        return listRoom;
    }else{
        return [];
    }
}
//(1)Hàm tìm phòng với mức giá cao nhất
function findRoomWithMaxPrice(list,max){

    let listRoom =list.filter(room => parseInt(room.price) <= max);
    if(listRoom.length>0){
        return listRoom;
    }else{
        return [];
    }
}
//(1)Hàm tìm phòng với giá từ a dến b
function findRoomFromAtoB(list,min,max){
    let listRoom =list.filter(room => parseInt(room.price)>=min && parseInt(room.price)<=max);
    if(listRoom){
        return listRoom;
    }else{
        return [];
    }
}
//(2)Hàm tìm phòng với loại
function findRoomAtType(list,type){
    let listRoom=list.filter(room => room.type === type)
    if (listRoom){
        return listRoom;
    }else {
        return [];
    }
}