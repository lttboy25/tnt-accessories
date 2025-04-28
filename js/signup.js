document.addEventListener('DOMContentLoaded', function() {
    //Lấy các giá trị nhập vào
    const form = document.getElementById('registrationForm');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const nameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const dobInput = document.getElementById('dob');
    const termsCheckbox = document.getElementById('terms');
    const maleRadio = document.getElementById('male');
    const femaleRadio = document.getElementById('female');
    
    // 2 nút hiện mật khẩu
    const togglePassword = document.getElementById('hien-thi-mat-khau');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    // Các lỗi
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const dobError = document.getElementById('dobError');
    const genderError = document.getElementById('genderError');
    const termsError = document.getElementById('termsError');
    
    // biểu thức chính
    const patterns = {
        phone: /^0\d{9}$/,
        password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16}$/,
        name: /^[A-Za-zÀ-ỹ\s]+$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        dob: /^(0?[1-9]|[12][0-9]|3[01])[- /.](0?[1-9]|1[0-2])[- /.]((19|20)?\d{2})$/
    };
    
    function showError(input, errorElement, message) {
        input.classList.add('input-error');
        input.classList.remove('input-success');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    function hideError(input, errorElement) {
        input.classList.remove('input-error');
        errorElement.classList.remove('show');
    }
    
    function showSuccess(input) {
        input.classList.add('input-success');
        input.classList.remove('input-error');
    }
    
    // Nút hiện mật khẩu
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
        this.classList.toggle('bi-eye');
        this.classList.toggle('bi-eye-slash');
    });
    
    //format lại ngày tháng năm sinh
    dobInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, ''); //xóa tất cả kí tự khoong phải số
        if (value.length > 0) {
            if (value.length <= 2) {
                value = value;
            } else if (value.length <= 4) { //nếu nhập 3-4 số tự động chèn / vào
                value = value.slice(0, 2) + '/' + value.slice(2);
            } else {
                value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
            }
            e.target.value = value;
        }
    });
    // -----------Kiểm tra số ngày tháng năm sinh-----------
    function validateDOB() {
        const value = dobInput.value.trim();
        if (value === '') {
            showError(dobInput, dobError, 'Ngày sinh không được để trống');
            return false;
        } 
        else if (!patterns.dob.test(value)) {
            showError(dobInput, dobError, 'Ngày sinh phải có định dạng DD/MM/YY');
            return false;
        }
         else {
            const parts = value.split('/');
            const month = parseInt(parts[1], 10);
            const day = parseInt(parts[0], 10);
            const year = parseInt(parts[2], 10);
            const date = new Date(year, month - 1, day);
            if (
                date.getFullYear() !== year || 
                date.getMonth() !== month - 1 || 
                date.getDate() !== day
            ) {
                showError(dobInput, dobError, 'Ngày tháng năm không hợp lệ');
                return false;
            }
            
            hideError(dobInput, dobError);
            showSuccess(dobInput);
            return true;
        }
    }
    
    // -----------Kiểm tra số điện thoại-----------
function validatePhone() {
    const value = phoneInput.value.trim();
    
    // Hiển thị thông báo lỗi và thêm viền đỏ nếu số điện thoại không hợp lệ
    if (value === '') {
        document.getElementById("hien-loi-dien-thoai").innerHTML = "Số điện thoại không được để trống";
        phoneInput.classList.add('input-error');  // Thêm viền đỏ
        return false;
    } else if (!patterns.phone.test(value)) {
        document.getElementById("hien-loi-dien-thoai").innerHTML = "Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số";
        phoneInput.classList.add('input-error');  // Thêm viền đỏ
        return false;
    } else {
        // Xóa viền đỏ và thông báo lỗi nếu số điện thoại hợp lệ
        hideError(phoneInput, phoneError);
        showSuccess(phoneInput);
        document.getElementById("hien-loi-dien-thoai").innerHTML = "";
        phoneInput.classList.remove('input-error');  // Xóa viền đỏ
        return true;
    }
}
    
    // -----------Kiểm tra mật khẩu-----------
    function validatePassword() {
        const value = passwordInput.value.trim();        
        // Hiển thị thông báo lỗi và thêm viền đỏ nếu mật khẩu không hợp lệ
        if (value === '') {
            document.getElementById("hien-loi").innerHTML = "Mật khẩu không được để trống";
            passwordInput.classList.add('input-error');  // Thêm viền đỏ
            return false;
        } else if (!patterns.password.test(value)) {
            document.getElementById("hien-loi").innerHTML = "Mật khẩu phải từ 8-16 ký tự, bao gồm chữ hoa, số và ký tự đặc biệt";
            passwordInput.classList.add('input-error');  // Thêm viền đỏ
            return false;
        } else {
            // Xóa viền đỏ và thông báo lỗi nếu mật khẩu hợp lệ
            hideError(passwordInput, passwordError);
            showSuccess(passwordInput);
            document.getElementById("hien-loi").innerHTML = "";
            passwordInput.classList.remove('input-error');  // Xóa viền đỏ
            return true;
        }
    }
    
        // -----------Kiểm tra xác nhận lại mật khẩu----------
    function validateConfirmPassword() {
        const value = confirmPasswordInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        
        if (value === '') {
            showError(confirmPasswordInput, confirmPasswordError, 'Vui lòng nhập lại mật khẩu');
            return false;
        } else if (passwordValue !== '' && value !== passwordValue) {
            showError(confirmPasswordInput, confirmPasswordError, 'Mật khẩu nhập lại không khớp');
            return false;
        } else {
            hideError(confirmPasswordInput, confirmPasswordError);
            showSuccess(confirmPasswordInput);
            return true;
        }
    }
    
        // -----------Kiểm tra tên----------
    function validateName() {
        const value = nameInput.value.trim();
        
        if (value === '') {
            showError(nameInput, fullNameError, 'Họ tên không được để trống');
            return false;
        } else if (!patterns.name.test(value)) {
            showError(nameInput, fullNameError, 'Họ tên không được chứa số hoặc ký tự đặc biệt');
            return false;
        } else {
            hideError(nameInput, fullNameError);
            showSuccess(nameInput);
            return true;
        }
    }
    
        // -----------Kiểm tra email-----------
    function validateEmail() {
        const value = emailInput.value.trim();
        
        if (value === '') {
            showError(emailInput, emailError, 'Email không được để trống');
            return false;
        } else if (!patterns.email.test(value)) {
            showError(emailInput, emailError, 'Email không đúng định dạng');
            return false;
        } else {
            hideError(emailInput, emailError);
            showSuccess(emailInput);
            return true;
        }
    }
    
    // Phải chọn giới tính
    function validateGender() {
        if (!maleRadio.checked && !femaleRadio.checked) {
            genderError.textContent = 'Vui lòng chọn giới tính';
            genderError.classList.add('show');
            return false;
        } else {
            genderError.classList.remove('show');
            return true;
        }
    }
    // Phải tích vào ô xác nhận điều khoản
    function validateTerms() {
        if (!termsCheckbox.checked) {
            termsError.textContent = 'Vui lòng chấp nhận điều khoản sử dụng';
            termsError.classList.add('show');
            return false;
        } else {
            termsError.classList.remove('show');
            return true;
        }
    }
    
    // Add event listeners for real-time validation
    phoneInput.addEventListener('blur', validatePhone);
    phoneInput.addEventListener('input', function() {
        if (phoneInput.classList.contains('input-error')) {
            validatePhone();
        }
    });
    
    passwordInput.addEventListener('blur', validatePassword);
    passwordInput.addEventListener('input', function() {
        if (passwordInput.classList.contains('input-error')) {
            validatePassword();
        }
        if (confirmPasswordInput.value.trim() !== '') {
            validateConfirmPassword();
        }
    });
    
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    confirmPasswordInput.addEventListener('input', function() {
        if (confirmPasswordInput.classList.contains('input-error')) {
            validateConfirmPassword();
        }
    });
    
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', function() {
        if (nameInput.classList.contains('input-error')) {
            validateName();
        }
    });
    
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function() {
        if (emailInput.classList.contains('input-error')) {
            validateEmail();
        }
    });
    
    dobInput.addEventListener('blur', validateDOB);
    dobInput.addEventListener('input', function() {
        if (dobInput.classList.contains('input-error')) {
            validateDOB();
        }
    });
    
    maleRadio.addEventListener('change', validateGender);
    femaleRadio.addEventListener('change', validateGender);
    
    termsCheckbox.addEventListener('change', validateTerms);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Nếu thỏa mãn hết điều kiện
        if (validatePhone() && validatePassword() && validateConfirmPassword() && 
        validateName() && validateEmail() && validateDOB() && 
        validateGender() && validateTerms()) {
            
            // Đăng ký thành công
            alert('Đăng ký thành công!');
            window.location.href = '../index.html';
        }
    });
});
