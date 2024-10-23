//Hàm lấy lấy user chưa chỉnh sửa
function getUsersFromLocalStorage(){
    const products =JSON.parse(localStorage.getItem('users'));
    if(!products){
        return [];
    }
    else{
        return products;
    }
}
//Hàm lấy phòng từ locla chưa chỉnh
function getRoomsFromLocalStorage(){
    const products =JSON.parse(localStorage.getItem('rooms'));
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
//tìm user dựa id
function findUser(id){
    const user= users.find( user => user.id === id);
    if (user){
        return user;
    }else{
        alert("Không có users")
    }
}
var users=getUsersFromLocalStorage();
var rooms=getRoomsFromLocalStorage();
var user=""
console.log(getQueryParam('userId'))
if(!getQueryParam('userId')){
    document.getElementById('history').innerHTML = "<h4>Bạn chưa đăng nhập</h4>"
}else{
    user=findUser(getQueryParam('userId'));
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
console.log("đây")
console.log(user.history)
var historyCard=document.getElementById('history');
if(user.history.length>0){
    user.history.forEach(element=>{
        var room=rooms.find(ro => ro.id==element.idRoom)
        historyCard.innerHTML +=`
            <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 mb-3">
                      <p><strong class="me-3">Tên Khách Hàng:</strong><span class="customer-name">${user.fullname}</span></p>
                      <p><a href="#" class="text-decoration-none me-3" style="color:black;font-weight: bold;">Tên Phòng:</a><span class="room-name">${room.name}</span></p>
                      <p><strong class="me-3">Tổng tiền:</strong><span class="total-pay">${changeMoney(element.price)} VNĐ</span></p>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-12 mb-3">
                    <p><strong class="me-3">Hình thức thanh toán:</strong><span class="service-name">${element.typePay}</span></p>
                    <p><strong class="me-3">Thời gian đặt phòng:</strong><span class="booking-time">${element.dateTo}&nbsp;đến&nbsp;${element.dataLeave}</span></p>
                  </div>
              </div>
        `
    })
}else{
    document.getElementById('history').innerHTML="<h4>Bạn Không có lịch sử đặt phòng nào</h4>"
}
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