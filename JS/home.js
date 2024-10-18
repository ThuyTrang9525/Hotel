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

function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const productId = getQueryParameter('id');
console.log(productId);
//Js cho phần model
var modal = document.getElementById("bookingModal");
        var btn = document.getElementById("book-room");
        var span = document.getElementsByClassName("close")[0];
        btn.onclick = function() {
            modal.style.display = "block";
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
    
        // Tính số ngày giữa hai mốc thời gian
        function calculateRentalDays() {
            const checkInDate = new Date(checkInInput.value);
            const checkOutDate = new Date(checkOutInput.value);
    
            // Kiểm tra xem cả hai mốc thời gian đã được nhập hay chưa
            if (checkInInput.value && checkOutInput.value) {
                // Tính số mili giây giữa hai mốc và chuyển đổi sang ngày
                const timeDifference = checkOutDate - checkInDate;
                const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // 1 ngày = 1000ms * 60s * 60p * 24h
    
                // Kiểm tra nếu số ngày hợp lệ, nếu không đặt là 0
                rentalDaysInput.value = days > 0 ? days : 0;
            }
        }
    
        // Lắng nghe sự kiện thay đổi cho các input
        checkInInput.addEventListener('change', calculateRentalDays);
        checkOutInput.addEventListener('change', calculateRentalDays);