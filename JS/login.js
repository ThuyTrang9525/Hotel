//Hiện và ẩn phần trên menu
document.getElementById('c-logIn').classList.remove('d-none');
document.getElementById('c-register').classList.remove('d-none');
document.getElementById('c-profile').classList.add('d-none');  
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
  
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(user => user.username == username && user.password == password);
    console.log(user)
    if (user) {
      //chuyển trang. Liểm tra use có thuộc tính rule không. nếu cso với rule =1 thhif admin, rule=2 thì home
      if('rule' in user){
        if(user.rule==1){
          alert("Đăng nhập thành công");
          const beHaft ="HTML/admin.html";
          const url = new URL (beHaft,window.location.origin);
          window.location.href=url.toString();
        }else{
          alert("Đăng nhập thành công");
          const beHaft ="HTML/home.html?userId="+user.id;
          const url = new URL (beHaft,window.location.origin);
          window.location.href=url.toString();
        }
      }else{
        alert("Đăng nhập thành công");
        const beHaft ="HTML/home.html?userId="+user.id;
        const url = new URL (beHaft,window.location.origin);
        //window.location.href=url.toString();
      }
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