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
//hàm  lấy tam số url
function getQueryParam(param){
    var urlParam = new URLSearchParams(window.location.search);
    return urlParam.get(param);
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