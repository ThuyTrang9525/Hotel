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
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn biểu mẫu làm mới trang
  
    //Thu thập dữ liệu biểu mẫu
    let user = {
      fullname: document.getElementById('fullname').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      dob: document.getElementById('dob').value,
      address: document.getElementById('address').value,
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    };
  
 // Lưu dữ liệu vào localStorage dưới dạng đối tượng JSON
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  
    alert('Đăng ký thành công');
  });
  
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn việc gửi biểu mẫu mặc định

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

   // Kiểm tra xem mật khẩu có khớp không
    if (password !== confirmPassword) {
        alert("Mật khẩu và xác nhận mật khẩu không giống nhau. Vui lòng kiểm tra lại!");
        return; // Thoát khỏi chức năng
    }

    // Nếu chúng khớp nhau, tiến hành lưu dữ liệu người dùng
    const fullname = document.getElementById('fullname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const dob = document.getElementById('dob').value;
    const address = document.getElementById('address').value;
    const username = document.getElementById('username').value;

   // Lưu dữ liệu người dùng vào localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ fullname, phone, email, gender, dob, address, username, password });
    localStorage.setItem('users', JSON.stringify(users));

    alert("Đăng ký thành công!");
});

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
