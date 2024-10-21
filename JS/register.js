function togglePassword(fieldId) {
    const passwordField = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(`eye-icon-${fieldId}`);
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.setAttribute("name", "eye-off-outline");
    } else {
        passwordField.type = "password";
        eyeIcon.setAttribute("name", "eye-outline");
    }
} 
// lấy users từ local
var users = JSON.parse(localStorage.getItem('users')) || [];
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu mặc định
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    var num=0;
    if(users.length==0){
        num=1;
    }else{
        num=findNum();
    }
    // Kiểm tra xem mật khẩu có khớp không
    if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không giống nhau. Vui lòng kiểm tra lại!");
        return; // Thoát khỏi chức năng
    }else{
        // Nếu chúng khớp nhau, tiến hành lưu dữ liệu người dùng
        //Nhưng phải kiểm tra tài khoảng, nếu tên tài khoảng trùng với trước đó thì yêu cầu nhập lại tài khoảng
        const fullname = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const dob = document.getElementById('dob').value;
        const address = document.getElementById('address').value;
        const username = document.getElementById('username').value;
        // biến tìm phần tử có tài khoảng như các tài khoảng trước
        const passAccount= users.find(user => user.username==username);
        // Kiểm tra xem phần tử đó có khoảng trống không
        if(!username.includes(" ")){
            if(passAccount){
                alert("Tài khoản đã tồn tại. Vui lòng thay đổi")
                document.getElementById('username').style.border ="1px solid red"
            }else{
                let user = {
                    id:"u"+num,
                    fullname: document.getElementById('fullname').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    gender: document.querySelector('input[name="gender"]:checked').value,
                    dob: document.getElementById('dob').value,
                    address: document.getElementById('address').value,
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value,
                    history:[],
                    book:[],
                    };
                // Lưu dữ liệu người dùng vào localStorage
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
                document.getElementById('username').style.border ="none"
                alert("Đăng ký thành công!");
                window.location.href = '/HTML/login.html'; // Đường dẫn đến trang đăng nhập của bạn
            }
        }else{
            alert("tên tài khoảng không được có khỏng trống giữa các dòng");
            document.getElementById('username').style.border ="1px solid none"
        }
    }
});
//Tìm số id
function findNum(){
    //vd users[0].id="u1",users[1].id="u2"
    let idUser=users[(users.length-1)].id;
    let numString = idUser.substring(1);
    let nu=parseInt(numString);
    nu=nu+1;
    return nu
}
/*
// Hàm để chuyển hướng đến trang đăng nhập
function redirectToLogin() {
    window.location.href = '/HTML/login.html'; // Đường dẫn đến trang đăng nhập của bạn
}
// Thêm sự kiện submit cho form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm'); // Lấy form theo id
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn không cho form gửi mặc định
        // Ở đây bạn có thể thực hiện các xử lý để đăng ký tài khoản (kiểm tra, gửi dữ liệu đến server, v.v.)
        // Nếu đăng ký thành công, thực hiện chuyển hướng
        redirectToLogin();
    });
});
*/