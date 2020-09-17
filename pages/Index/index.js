
let showSignUp=document.getElementById('showSignUpForm');
let showLogin=document.getElementById('showLoginForm');

let formArea=document.getElementById('signupForm');
let loginArea=document.getElementById('loginForm');
showSignUp.addEventListener('click',()=>{
    formArea.style.display="block";
    showSignUp.style.display="none";
    loginArea.style.display="none";
})
showLogin.addEventListener('click', ()=>{
    formArea.style.display="none";
    showSignUp.style.display="inline";
    loginArea.style.display="block";
})