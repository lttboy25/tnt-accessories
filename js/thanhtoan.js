// Chờ trang tải xong
document.addEventListener('DOMContentLoaded', function() {
    // Form chính
    const orderForm = document.getElementById('orderForm');
    
    // Thêm event listener cho form submit
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateForm();
        });
    }
    
    // Thêm event listener cho các trường input khi blur (rời khỏi trường)
    document.getElementById('ho').addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('ho', 'Enter a HỌ *');
        }
    });
    
    document.getElementById('ten').addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('ten', 'Enter a tên *');
        }
    });
    
    document.getElementById('email').addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('email', 'Enter a email *');
        } else if (!isValidEmail(this.value.trim())) {
            showError('email', 'Email không hợp lệ');
        }
    });
    
    document.getElementById('sodienthoai').addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('sodienthoai', 'Enter a SỐ ĐIỆN THOẠI *');
        } else if (!isValidPhone(this.value.trim())) {
            showError('sodienthoai', 'Số điện thoại không hợp lệ');
        }
    });
    
    document.getElementById('diachi').addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('diachi', 'Enter a ĐỊA CHỈ *');
        }
    });
    
    document.getElementById('thanhpho').addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('thanhpho', 'Enter a TỈNH/THÀNH PHỐ *');
        }
    });
    
    // Xóa thông báo lỗi khi người dùng bắt đầu nhập
    const allInputs = document.querySelectorAll('.form-control');
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('invalid');
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement) {
                errorElement.classList.remove('show-error');
            }
        });
    });
});

function validateForm() {
    // Lấy giá trị từ các trường
    const ho = document.getElementById('ho').value.trim();
    const ten = document.getElementById('ten').value.trim();
    const email = document.getElementById('email').value.trim();
    const sodienthoai = document.getElementById('sodienthoai').value.trim();
    const diachi = document.getElementById('diachi').value.trim();
    const thanhpho = document.getElementById('thanhpho').value.trim();
    
    // Reset lỗi
    hideAllErrors();
    
    let isValid = true;
    
    // Xác thực từng trường
    if (ho === '') {
        showError('ho', 'Enter a HỌ *');
        isValid = false;
    }
    
    if (ten === '') {
        showError('ten', 'Enter a tên *');
        isValid = false;
    }
    
    if (email === '') {
        showError('email', 'Enter a email *');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Email không hợp lệ');
        isValid = false;
    }
    
    if (sodienthoai === '') {
        showError('sodienthoai', 'Enter a SỐ ĐIỆN THOẠI *');
        isValid = false;
    } else if (!isValidPhone(sodienthoai)) {
        showError('sodienthoai', 'Số điện thoại không hợp lệ');
        isValid = false;
    }
    
    if (diachi === '') {
        showError('diachi', 'Enter a ĐỊA CHỈ *');
        isValid = false;
    }
    
    if (thanhpho === '') {
        showError('thanhpho', 'Enter a TỈNH/THÀNH PHỐ *');
        isValid = false;
    }
    
    return isValid;
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    if (field && errorElement) {
        field.classList.add('invalid');
        errorElement.textContent = message;
        errorElement.classList.add('show-error');
    }
}

function hideAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.form-control');
    
    errorElements.forEach(element => {
        element.classList.remove('show-error');
    });
    
    inputElements.forEach(element => {
        element.classList.remove('invalid');
    });
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPhone(phone) {
    const regex = /^\d{10,11}$/;
    return regex.test(phone);
}