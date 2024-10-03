document.querySelector('#loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
  
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.username === username && user.password === password);
  
    if (user) {
      alert("Đăng nhập thành công");
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không đúng");
    }
  });
  
function login(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Fetch user data from localStorage or JSON file
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert("Login successful");
        // Redirect or perform any other action
    } else {
        alert("Invalid username or password");
    }
}