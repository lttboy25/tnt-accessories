// Chờ cho DOM được tải hoàn toàn
document.addEventListener('DOMContentLoaded', function() {
    // Lấy form từ DOM
    const orderForm = document.getElementById('orderForm');
    
    // Danh sách các trường bắt buộc và thông báo lỗi tương ứng
    const requiredFields = [
        { id: 'ho', error: 'hoError', message: 'Vui lòng nhập họ của bạn' },
        { id: 'ten', error: 'tenError', message: 'Vui lòng nhập tên của bạn' },
        { id: 'email', error: 'emailError', message: 'Vui lòng nhập email hợp lệ' },
        { id: 'sodienthoai', error: 'sodienthoaiError', message: 'Vui lòng nhập số điện thoại hợp lệ' },
        { id: 'diachi', error: 'diachiError', message: 'Vui lòng nhập địa chỉ của bạn' },
        { id: 'thanhpho', error: 'thanhphoError', message: 'Vui lòng nhập tỉnh/thành phố của bạn' }
    ];
    
    // Thêm sự kiện submit cho form
    orderForm.addEventListener('submit', function(event) {
        // Ngăn chặn hành vi mặc định của form
        event.preventDefault();
        
        // Biến kiểm tra form có hợp lệ không
        let isValid = true;
        
        // Kiểm tra từng trường bắt buộc
        requiredFields.forEach(field => {
            const input = document.getElementById(field.id);
            const errorElement = document.getElementById(field.error);
            
            // Ẩn thông báo lỗi trước khi kiểm tra
            errorElement.style.display = 'none';
            
            // Kiểm tra trường rỗng
            if (!input.value.trim()) {
                errorElement.textContent = field.message;
                errorElement.style.display = 'block';
                isValid = false;
            }
        });
        
        // Kiểm tra định dạng email
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Email không hợp lệ';
            emailError.style.display = 'block';
            isValid = false;
        }
        
        // Kiểm tra định dạng số điện thoại
        const phoneInput = document.getElementById('sodienthoai');
        const phoneError = document.getElementById('sodienthoaiError');
        const phoneRegex = /^[0-9]{10,11}$/;
        
        if (phoneInput.value.trim() && !phoneRegex.test(phoneInput.value.trim())) {
            phoneError.textContent = 'Số điện thoại không hợp lệ (cần 10-11 chữ số)';
            phoneError.style.display = 'block';
            isValid = false;
        }
        
        // Nếu form hợp lệ, chuyển hướng đến trang tiếp theo
        if (isValid) {
            window.location.href = './phuongphap.html';
        }
    });
    
    // Sửa lại nút tiếp tục để không chuyển hướng tự động bằng thẻ a
    const continueButton = document.querySelector('.continue');
    if (continueButton) {
        // Xóa thẻ a trong nút nếu có
        const linkInButton = continueButton.querySelector('a');
        if (linkInButton) {
            continueButton.textContent = linkInButton.textContent;
        }
        
        // Gán type submit cho nút để kích hoạt sự kiện submit của form
        continueButton.type = 'submit';
    }
    
    // Thêm sự kiện blur cho các input để kiểm tra khi người dùng rời khỏi trường
    requiredFields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(field.error);
        
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                errorElement.textContent = field.message;
                errorElement.style.display = 'block';
            } else {
                errorElement.style.display = 'none';
            }
        });
        
        // Xóa thông báo lỗi khi người dùng bắt đầu nhập
        input.addEventListener('input', function() {
            errorElement.style.display = 'none';
        });
    });
    
    // Thêm xử lý đặc biệt cho email và số điện thoại
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', function() {
        const emailError = document.getElementById('emailError');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (this.value.trim() && !emailRegex.test(this.value.trim())) {
            emailError.textContent = 'Email không hợp lệ';
            emailError.style.display = 'block';
        }
    });
    
    const phoneInput = document.getElementById('sodienthoai');
    phoneInput.addEventListener('blur', function() {
        const phoneError = document.getElementById('sodienthoaiError');
        const phoneRegex = /^[0-9]{10,11}$/;
        
        if (this.value.trim() && !phoneRegex.test(this.value.trim())) {
            phoneError.textContent = 'Số điện thoại không hợp lệ (cần 10-11 chữ số)';
            phoneError.style.display = 'block';
        }
    });
    
    // Thêm xử lý cho nút hủy
    const cancelButton = document.querySelector('.cancle');
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            // Có thể chuyển về trang giỏ hàng hoặc trang chính
            window.history.back();
        });
    }
});