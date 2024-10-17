/*const nodemailer = require('nodemailer');
//Tạo transporter với thông tin SMTP
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nguyenthong0855@gmail.com',
        pass: 'mk'
    },
});
//Thiết lập tùy chọn email. TK người gửi, tK người nhận, tiêu dề, nội dung
let mailOptions ={
    from: 'nguyenthong0855@gmail.com',
    to:'nguoinhan@gmail.com',
    subject:'Tiêu đê',
    text:'Nội dung',
};
//Gửi mail
transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log("lỗi",error);
    }else{
        console.log("Email đã gửi"+info.response)
    }
})*/
var users =[
{
    id:"u01",
    fullname: "user1",
    phone: "000001",
    email: "user1@.com",
    gender: "male",
    dob: "not",
    address: "addressuser1",
    username: "user1isboy",
    password: "user1",
    lever: 'viewer',
    book:[
    {idRoom: 'r1', dateTo: '2024-10-13', dataLeave: '2024-10-16', price: 900000},
    {idRoom: 'r2', dateTo: '2024-10-13', dataLeave: '2024-10-16', price: 2100000}, 
    {idRoom: 'r3', dateTo: '2024-10-13', dataLeave: '2024-10-16', price: 3000000},
    ],
    history:[],
    },
    {
    id:"u02",
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
    id:"u03",
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
    type: "Thường",
    isbook:false,
    time:[],
},
{
    id:"r2",
    name:"phòng 2",
    price:700000,
    type: "Thương gia",
    isbook:false,
    time:[],
},
{
    id:"r3",
    name:"phòng 3",
    price:1000000,
    type: "Tổng thống",
    isbook:false,
    time:[],
},
{
    id:"r4",
    name:"phòng 4",
    price:600000,
    type: "Thương gia",
    isbook:false,
    time:[],
},
];
//Hàm lấy phòng từ locla chưa chỉnh
function getProductsFromLocalStorage(){
    const products =JSON.parse(localStorage.getItem('rooms'));
    if(!products){
        return [];
    }
    else{
        return products;
    }
}
//Hàm lấy lấy user chưa chỉnh sửa
function getProductsFromLocalStorage(){
    const products =JSON.parse(localStorage.getItem('users'));
    if(!products){
        return [];
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
// Xác nhận tài khoang người đang dùng
var user = findUser(getQueryParam('userId'));
console.log(user)
pushInHistory();
// hàm đẩy thông tin các phòng đã đặt từ giỏ hàng vào trang tanh toán
function pushInHistory(){
    document.getElementById('nameCus').value = user.fullname;
    document.getElementById('phoneCus').value =user.phone;
    document.getElementById('addressCus').value = user.address;
    for(let i=0;i<user.book.length;i++){
        let room=rooms.find(ro => ro.id  == user.book[i].idRoom);
        if(i==(user.book.length-1)){
            document.getElementById('nameRoom').innerHTML += room.name + "."
        }else{
            document.getElementById('nameRoom').innerHTML += room.name + ", "
        }
    }
    document.getElementById('dateGiveRoom').innerHTML = user.book[0].dateTo;
    document.getElementById('datePayRoom').innerHTML = user.book[0].dataLeave;
    let total=0;
    let payMoney =document.getElementById('thanhToan');
    user.book.forEach(room =>{
        total+=room.price;
        let room1=rooms.find(ro => ro.id  == room.idRoom);
        payMoney.innerHTML+=`
            <div class="boxServiceNon distance2">
                <p>${room1.name}</p>
                <p class="paraResultServicePrice">${room.price} </p>
            </div>
        `
    })
    document.getElementById('totalPay').innerHTML= total;
}
//hàm khi nhấn button
function thanhtoan(){
    user.history=user.history.concat(user.book);
    user.book.forEach(bo => {
        rooms.forEach(room => {
            if(room.id==bo.idRoom){
                //room.isbook=true;
                //đảy thời gian
                room.time=room.time.concat(tachThoiGian(bo.dateTo,bo.dataLeave))
                sortDate(room.time)
            }
        });
    });
    user.book=[];
    alert("đã thanh toán");
    //email(chưa thanh toán)
    console.log(user)
    console.log(rooms)

}
//hàm tách thời gian
function tachThoiGian(a,b){
    let listTime=[];
    let time1= new Date(a);
    let time2 = new Date(b);
    var timeAf=""
    const date = Math.ceil((time2 - time1) / (1000 * 60 * 60 * 24));
    for(let i=0;i<=(date);i++){
        timeAf=time1.toISOString().split('T')[0];
        listTime.push(timeAf);
        time1.setDate(time1.getDate() +1 );
    }
    return listTime
}
console.log("hi",tachThoiGian('2024-10-01','2024-10-04'));
var lister=tachThoiGian('2024-10-01','2024-10-04').concat('2024-11-15')
console.log(sortDate(lister))
//Hàm xắp xếp ngày từ bé đến lớn
function sortDate(list){
    return list.sort((a, b) => new Date(a) - new Date(b));
}