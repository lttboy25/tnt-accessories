document.addEventListener("DOMContentLoaded", function () {
    const loginbtn = document.querySelector('#login');
    const closebtn = document.querySelector('#close');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const cartbtn = document.querySelector('#bucket');

    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    if (loginbtn) {
        loginbtn.addEventListener("click", function () {
            const signIn = document.querySelector('.sign-in');
            if (signIn) {
                signIn.style.display = "flex";
            }
        });
    }
    if (closebtn) {
        closebtn.addEventListener("click", function () {
            const closeOut = document.querySelector('.sign-in');
            if (closeOut) {
                closeOut.style.display = "none";
            }
        });
    }


    const patterns = {
        phone: /^0\d{9}$/,
        password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16}$/,
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

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        
        // Submit form if all validations pass
        if (isPhoneValid && isPasswordValid && isConfirmPasswordValid && 
            isNameValid && isEmailValid && isDOBValid && 
            isGenderValid && areTermsAccepted) {
            
            // Show success message
            alert('Đăng nhập thành công!');
            
            // You can submit the form here if needed
            // form.submit();
        }
    });

    /* --------------GIỎ HÀNG------------------------*/
    

    // Hiện giỏ hàng
    if(cartbtn){
        cartbtn.addEventListener("click", function() {
            const cartContainer = document.querySelector('.cart-container');
            if(closeOut){
                closeOut.style.display = "none";
            }
        })
    }

});
document.addEventListener("click", function (e) {
    const modal = document.getElementById("cartModal");
    const cartIcon = document.getElementById("cart");
    const modalDialog = modal.querySelector(".modal-dialog");

    const clickedOutsideModal = !modalDialog.contains(e.target);
    const clickedIcon = cartIcon.contains(e.target);

    const isModalVisible = modal.classList.contains("show");

    if (isModalVisible && clickedOutsideModal && !clickedIcon) {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) {
            bsModal.hide();
        }
    }
});
function openModal() {
    document.getElementById("myModal").style.display = "block";
    }

    function closeWindow() {
    window.close();
}