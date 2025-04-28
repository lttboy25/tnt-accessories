document.addEventListener("DOMContentLoaded", function () {
    const loginbtn = document.querySelector('#login');
    const closebtn = document.querySelector('#close');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    

    const phoneError = document.getElementById('phoneError');
    const passwordError = document.getElementById('passwordError');
    // ---------Sự kiện nhấn vào nút đăng nhập--------------
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


    // ---------------Điều kiện đăng nhập------------
    const patterns = {
        phone: /^0\d{9}$/,
        password: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16}$/
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

    // -----------Kiểm tra số điện thoại-----------
    function validatePhone() {
        const value = phoneInput.value.trim();
        console.log(value);
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

    // -------------Kiểm tra mật khẩu--------------

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

});


document.addEventListener("DOMContentLoaded", function() {
    const searchIcon = document.getElementById("search");
    const searchInput = document.querySelector('.search input');
    let isSearchVisible = false;
    if (searchIcon) {
        searchIcon.addEventListener("click", function(e) {
            e.preventDefault(); 
            
            if (searchInput) {
                if (isSearchVisible) {
                    searchInput.classList.remove('search-active');
                    searchInput.classList.add('search-inactive');
                    
                    setTimeout(() => {
                        searchInput.style.display = "none";
                    }, 300); 
                    
                    isSearchVisible = false;
                } else {
                    searchInput.style.display = "block";
                    
                    setTimeout(() => {
                        searchInput.classList.remove('search-inactive');
                        searchInput.classList.add('search-active');
                        searchInput.focus();
                    }, 10);
                    
                    isSearchVisible = true;
                }
            }
        });
    }
    
    // Xử lý sự kiện click bên ngoài để đóng khung tìm kiếm
    document.addEventListener("click", function(e) {
        // Kiểm tra xem đã click bên ngoài cả icon tìm kiếm và input tìm kiếm chưa
        if (searchInput && isSearchVisible && 
            !searchInput.contains(e.target) && 
            searchIcon && !searchIcon.contains(e.target)) {
            
            // Ẩn với hiệu ứng
            searchInput.classList.remove('search-active');
            searchInput.classList.add('search-inactive');
            
            setTimeout(() => {
                searchInput.style.display = "none";
            }, 300);
            
            isSearchVisible = false;
        }
    });
    
    // Xử lý sự kiện nhấn Enter để thực hiện tìm kiếm
    if (searchInput) {
        searchInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                // Thực hiện hành động tìm kiếm tại đây
                const searchQuery = searchInput.value.trim();
                if (searchQuery) {
                    console.log("Đang tìm kiếm:", searchQuery);
                    
                    // Ẩn input với hiệu ứng
                    searchInput.classList.remove('search-active');
                    searchInput.classList.add('search-inactive');
                    
                    setTimeout(() => {
                        searchInput.style.display = "none";
                    }, 300);
                    
                    isSearchVisible = false;
                }
            }
        });
    }
});