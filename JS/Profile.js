document.addEventListener('DOMContentLoaded', function() {
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');

    // Thêm các ngày
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    // Thêm các tháng
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
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
});

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
