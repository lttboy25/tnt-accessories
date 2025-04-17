document.addEventListener("DOMContentLoaded", function () {
    const loginbtn = document.querySelector('#login');
    const closebtn = document.querySelector('#close');
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
    
});