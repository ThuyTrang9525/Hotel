//Js cho phần chuyển slide
let next = document.querySelector('.next')
let prev = document.querySelector('.prev')
console.log(typeof(next));
next.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').appendChild(items[0])
})

prev.addEventListener('click', function(){
    let items = document.querySelectorAll('.item')
    document.querySelector('.slide').prepend(items[items.length - 1]) 
})
var userFake ={
    id:"",
    fullname: "",
    phone: "",
    email: "",
    gender: "",
    dob: "",
    address: "",
    username: "",
    password: "",
    lever: '',
    book:[],
    history:[],
    }
// Gioi han thoi gian cho
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
const dd = String(today.getDate()).padStart(2, '0');

// Đặt giá trị cho min là ngày hôm nay
const minDate = `${yyyy}-${mm}-${dd}`;
document.getElementById('check-in').setAttribute('min', minDate);
document.getElementById('check-out').setAttribute('min', minDate);

// Tính toán ngày max (ví dụ: 3 năm sau)
const maxDate = new Date();
maxDate.setFullYear(today.getFullYear() + 3); // Tăng thêm 3 năm
const maxYyyy = maxDate.getFullYear();
const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
const maxDd = String(maxDate.getDate()).padStart(2, '0');

// Đặt giá trị cho max
const maxDateString = `${maxYyyy}-${maxMm}-${maxDd}`;
document.getElementById('check-in').setAttribute('max', maxDateString);
document.getElementById('check-out').setAttribute('max', maxDateString);
console.log(document.getElementById('check-in').min)
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
}else{
    //Tạo một user giả
    user=userFake;
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
//const productId = getQueryParameter('id');
//Js cho phần model
var modal = document.getElementById("bookingModal");
var btn = document.getElementById("book-room");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    if(user&&user.id !=""){
        modal.style.display = "block";
    }else{
        alert('Bạn cần đăng nhập thực hiện chức năng này')
    }
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Lấy các phần tử input
const checkInInput = document.getElementById('check-in');
const checkOutInput = document.getElementById('check-out');
const rentalDaysInput = document.getElementById('rental-days');
var day=0;
// Lắng nghe sự kiện thay đổi cho các input
//Lấy ngày
checkInInput.addEventListener('change', calculateRentalDays);
checkOutInput.addEventListener('change', calculateRentalDays);
//Khi nhấn vào các loại phòng
var typeRoom =document.querySelectorAll('.col-md-4');
var keyTypeRoom =""
//biến lưu key và giả trị của nó để chuyển trang mà đổi sang loại phòng
typeRoom.forEach(type =>{
    type.addEventListener('click', function(){
        keyTypeRoom=type.dataset.type
        //keyTypeRoom=type.getAttribute('data-type')
        if(user&&user.id !=""){
            modal.style.display = "block";

        }else{
            alert('Bạn cần đăng nhập thực hiện chức năng này')
        }
    })
})

//Hàm chuyển đổi trang tìm kiếm bằng nhấn nút tìm kiếm.
const search =document.getElementById('search');
search.addEventListener('click', function(){
    const checkInDate = new Date(checkInInput.value);
    console.log(checkInDate)
    console.log(today)
    const checkOutDate = new Date(checkOutInput.value);
    if(today>checkInDate||checkInDate>checkOutDate){
        document.getElementById('addd').innerHTML="Nhập đúng ngày, chúng tôi chỉ hỗ trợ từ đây tới 3 năm"
    }else{
        if(day>0&&day<4){
            alert("Tìm kiếm");
            users.forEach(u => {
                if(u.id==user.id){
                    u.book=[];
                }
            })
            //kiểm tra xem có key có userId và có danh sách các users không
            if(getQueryParam('userId')&&users.length>0){
                alert("thành công")
                localStorage.setItem('users',JSON.stringify(users))
            }
            console.log(user)
            const beHaft ="HTML/search.html?userId="+user.id+"&day1="+checkInInput.value+"&day2="+checkOutInput.value+keyTypeRoom;
            const url = new URL (beHaft,window.location.origin);
            window.location.href=url.toString();
        }else{
            alert("Vui lòng điền đúng ngày")
        }
    }
    
})

// Tính số ngày giữa hai mốc thời gian
function calculateRentalDays() {
    // Kiểm tra xem cả hai mốc thời gian đã được nhập hay chưa
    if (checkInInput.value && checkOutInput.value) {
        const checkInDate = new Date(checkInInput.value);
        const checkOutDate = new Date(checkOutInput.value);
        // Tính số mili giây giữa hai mốc và chuyển đổi sang ngày
        const timeDifference = checkOutDate - checkInDate;
        const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // 1 ngày = 1000ms * 60s * 60p * 24h
        console.log(days)
        if(days>5||days<=0){
            document.getElementById('addd').innerHTML="Số ngày khả thi từ 1 đến 5 ngày"
        }else{
            document.getElementById('addd').innerHTML="";
        }
        // Kiểm tra nếu số ngày hợp lệ, nếu không đặt là 0
        rentalDaysInput.value = days > 0 ? days : 0;
        day=days;
    }
}


//vong lap de hien ra ngay
document.addEventListener("DOMContentLoaded", function() {
    function countdownTimer() {
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        const timeRemaining = endOfDay - now;

        const seconds = Math.floor((timeRemaining / 1000) % 60);
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        if (timeRemaining < 0) {
            document.getElementById('days').textContent = "00";
            document.getElementById('hours').textContent = "00";
            document.getElementById('minutes').textContent = "00";
            document.getElementById('seconds').textContent = "00";
            clearInterval(timerInterval);
        }
    }

    const timerInterval = setInterval(countdownTimer, 1000);
    countdownTimer();
});



//footer 
    function subscribe() {
        var email = document.getElementById('email').value;
        var message = document.getElementById('message');
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(email)) {
            message.textContent = 'Thank you for subscribing with email: ' + email;
            message.style.color = '#d4a017';
        } else {
            message.textContent = 'Please enter a valid email address.';
            message.style.color = 'red';
        }
    }
// Map
function openDirections() {
    window.open('https://www.google.com/maps/dir/?api=1&destination=16.061473787794288,108.2402975694859', '_blank');
}

function openInMaps() {
    window.open('https://www.google.com/maps/place/16.061473787794288,108.2402975694859', '_blank');
}

function shareLocation() {
    const url = `https://www.google.com/maps/place/16.061473787794288,108.2402975694859`;
    navigator.clipboard.writeText(url).then(() => {
        alert('Đường dẫn đã được sao chép vào clipboard!');
    });
}
