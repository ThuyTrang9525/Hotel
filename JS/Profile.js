const daySelect = document.getElementById('day');
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');
// Thêm các ngày
for (let i = 1; i <= 31; i++) {
    let iAfter=i+"";
    const option = document.createElement('option');
    option.value = String(iAfter.padStart(2,'0'));
    option.textContent = String(iAfter.padStart(2,'0'));;
    daySelect.appendChild(option);
}
// Thêm các tháng
for (let i = 1; i <= 12; i++) {
    let iAfter=i+"";
    const option = document.createElement('option');
    option.value = String(iAfter.padStart(2,'0'));
    option.textContent = String(iAfter.padStart(2,'0'));;
    monthSelect.appendChild(option);
}
// Thêm các năm (giả sử từ 1900 đến năm hiện tại)
const currentYear = new Date().getFullYear();
for (let i = 1950; i <= currentYear; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
}
// Hàm khi bấm vào nút "Chỉnh sửa"
function enableEdit() {
    // Hiển thị nút "Lưu Thông Tin"
    const saveButton = document.getElementById("saveButton");
    saveButton.classList.remove("hidden");
}
  // Hàm để xử lý sự kiện lưu thông tin
  function saveUserInfo() {
    alert('Thông tin đã được lưu!');
  }
//lấy dữ liệu
//Hàm lấy lấy user chưa chỉnh sửa
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
function getUsersFromLocalStorage(){
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
//tìm user dựa id
function findUser(id){
    const user= users.find( user => user.id === id);
    if (user){
        return user;
    }else{
        alert("Bạn chưa đăng nhập")
    }
}
var users=getUsersFromLocalStorage();
var user=""
console.log(getQueryParam('userId'))
if(!getQueryParam('userId')||getQueryParam('userId')==""){
    user=userFake
    alert("bạn chưa đăng nhập")
}else{
    user=findUser(getQueryParam('userId'));
    showInforUser();
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
var buttonSave= document.getElementById('saveButton');
function enableEdit(){
    //hiện nút xác nhận thay đổi lên và cho phép ngươi dùng chỉnh sửa
    buttonSave.style.display="inline-block";
    const buttonInputs=document.querySelectorAll('.input');
    buttonInputs.forEach(inpu => {
        inpu.readOnly =false;
    })
    showInforUser();
    let listSelect=document.querySelectorAll('.input2');
    listSelect.forEach(ele=>{
        ele.disabled=false;
    })
}
//Hàm đăng xuất
function logout(){
    if(getQueryParam('userId')&&user!=""){
        user=userFake;
        let beHaft ="HTML/Profile.html";
        beHaft=beHaft+"?userId="
        const url = new URL (beHaft,window.location.origin);
        window.location.href=url.toString();
    }
}
//Hàm khi xác nhận lưu
function saveUserInfo(){
    user.fullname=document.getElementById('name').value ;
    user.email =document.getElementById('prf-email').value ;
    user.password =document.getElementById('prf-password').value ;
    user.phone=document.getElementById('prf-phone').value ;
    user.address=document.getElementById('address').value ;
    if(document.getElementById('pfr-male').checked == true){
        user.gender="male";
    }else{
        user.gender="female"
    }
    let dayBob=document.getElementById('day').value;
    let month =document.getElementById('month').value;
    let year=document.getElementById('year').value;
    let date=year+"-"+month+"-"+dayBob;
    console.log(date)
    user.dob=date
    const buttonInputs=document.querySelectorAll('.input');
    buttonInputs.forEach(inpu => {
        inpu.readOnly =true;
    })
    users.forEach(u=> {
        if(u.id==user.id){
            u=user
        }
    })
    localStorage.setItem('users',JSON.stringify(users));
    //ẩn nút xác nhận thay đổi lên và khhoong cho phép ngươi dùng chỉnh sửa
    buttonSave.style.display="none";
    showInforUser()
}
//hàm hiện user
function showInforUser(){
    document.getElementById('prf-username').value= user.username ;
    document.getElementById('name').value= user.fullname ;
    document.getElementById('prf-email').value= user.email ;
    document.getElementById('prf-password').value= user.password ;
    document.getElementById('prf-phone').value= user.phone ;
    document.getElementById('address').value= user.address ;
    const checkGender = user.gender;
    if(checkGender=="male"||checkGender=="Male"){
        document.getElementById('pfr-male').checked = true;
        document.getElementById('pfr-female').checked = false;
    }else{
        document.getElementById('pfr-male').checked = false;
        document.getElementById('pfr-female').checked = true;
    }
    //thiếu ngày sinh
    let dob=user.dob;
    console.log(dob)
    let changeDob= new Date(dob);
    console.log(changeDob)
    console.log(changeDob.getFullYear())
    let yearDob = changeDob.getFullYear();
    let monthDob = String(changeDob.getMonth() + 1).padStart(2, '0');
    let dateDob = String(changeDob.getDate()).padStart(2, '0');
    document.getElementById('day').value=dateDob;
    document.getElementById('month').value=monthDob;
    document.getElementById('year').value=yearDob;
    let listSelect=document.querySelectorAll('.input2');
    listSelect.forEach(ele=>{
        ele.disabled=true;
    })
    //
}
document.addEventListener('DOMContentLoaded',hienAnMenu())