document.addEventListener('DOMContentLoaded', function() {
    // Get all form elements
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
    
    // Get toggle password elements
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    // Get error message elements
    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('emailError');
    const dobError = document.getElementById('dobError');
    const genderError = document.getElementById('genderError');
    const termsError = document.getElementById('termsError');
    
    // Validation patterns
    const patterns = {
        phone: /^0\d{9}$/,
        password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16}$/,
        name: /^[A-Za-zÀ-ỹ\s]+$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        dob: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/
    };
    
    // Helper functions for showing/hiding error messages with animation
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
    
    // Toggle password visibility
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
    
    // Format date input
    dobInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 2) {
                value = value;
            } else if (value.length <= 4) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            } else {
                value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
            }
            e.target.value = value;
        }
    });
    
    // Real-time validation functions
    function validatePhone() {
        const value = phoneInput.value.trim();
        
        if (value === '') {
            showError(phoneInput, phoneError, 'Số điện thoại không được để trống');
            return false;
        } else if (!patterns.phone.test(value)) {
            showError(phoneInput, phoneError, 'Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số');
            return false;
        } else {
            hideError(phoneInput, phoneError);
            showSuccess(phoneInput);
            return true;
        }
    }
    
    function validatePassword() {
        const value = passwordInput.value.trim();
        
        if (value === '') {
            showError(passwordInput, passwordError, 'Mật khẩu không được để trống');
            return false;
        } else if (!patterns.password.test(value)) {
            showError(passwordInput, passwordError, 'Mật khẩu phải từ 8-16 ký tự, bao gồm chữ hoa, số, và ký tự đặc biệt');
            return false;
        } else {
            hideError(passwordInput, passwordError);
            showSuccess(passwordInput);
            return true;
        }
    }
    
    function validateConfirmPassword() {
        const value = confirmPasswordInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        
        if (value === '') {
            showError(confirmPasswordInput, confirmPasswordError, 'Vui lòng nhập lại mật khẩu');
            return false;
        } else if (value !== passwordValue) {
            showError(confirmPasswordInput, confirmPasswordError, 'Mật khẩu nhập lại không khớp');
            return false;
        } else {
            hideError(confirmPasswordInput, confirmPasswordError);
            showSuccess(confirmPasswordInput);
            return true;
        }
    }
    
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
    
    function validateDOB() {
        const value = dobInput.value.trim();
        
        if (value === '') {
            showError(dobInput, dobError, 'Ngày sinh không được để trống');
            return false;
        } else if (!patterns.dob.test(value)) {
            showError(dobInput, dobError, 'Ngày sinh phải có định dạng mm/dd/yyyy');
            return false;
        } else {
            hideError(dobInput, dobError);
            showSuccess(dobInput);
            return true;
        }
    }
    
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
    dobInput.addEventListener('change', function() {
        if (dobInput.classList.contains('input-error')) {
            validateDOB();
        }
    });
    
    maleRadio.addEventListener('change', validateGender);
    femaleRadio.addEventListener('change', validateGender);
    
    termsCheckbox.addEventListener('change', validateTerms);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isDOBValid = validateDOB();
        const isGenderValid = validateGender();
        const areTermsAccepted = validateTerms();
        
        // Submit form if all validations pass
        if (isPhoneValid && isPasswordValid && isConfirmPasswordValid && 
            isNameValid && isEmailValid && isDOBValid && 
            isGenderValid && areTermsAccepted) {
            
            // Show success message
            alert('Đăng ký thành công!');
            
            // You can submit the form here if needed
            // form.submit();
        }
    });
});