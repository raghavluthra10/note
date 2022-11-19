import "../../index.css";
import "./signUp.css";

document.addEventListener("DOMContentLoaded", function () {
   const signUpForm = document.getElementById("signUpForm");

   const username = document.getElementById("signUpUserName");
   const email = document.getElementById("signUpEmail");
   const password = document.getElementById("signUpPassword");

   signUpForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!username.value || !email.value || !password.value) {
         window.alert("Please add all the credentials!");
         return;
      }

      console.log("signup form", email.value, password.value, username.value);
   });
});
