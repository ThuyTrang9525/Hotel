document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
  
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.username == username && user.password == password);
    console.log(user)
  
    if (user) {
    alert("Đăng nhập thành công");
    const beHaft ="HTML/home.html?userId="+user.id;
    const url = new URL (beHaft,window.location.origin);
    window.location.href=url.toString();

    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  });
  
function register(event) {
    event.preventDefault(); // Prevent the default form submission
    alert("đang ký tài khoản")
    const beHaft ="HTML/register.html"
    const url = new URL (beHaft,window.location.origin);
    window.location.href=url.toString();
}