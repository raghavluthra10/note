import "../../index.css";
import "./login.css";

document.addEventListener("DOMContentLoaded", function () {
   // const random = document.getElementById("random");
   // random.addEventListener("click", function () {
   //    console.log("random from login.js");
   // });
   const loginForm = document.getElementById("loginForm");
   const email = document.getElementById("loginInput");
   const loginPassword = document.getElementById("loginPassword");
   const remove = document.getElementById("remove");

   loginForm.addEventListener("submit", function (e) {
      console.log("post form control", e);
      if (!email.value || !loginPassword.value) {
         e.preventDefault();
         window.alert("Please add all login credentials!");
         return;
      }
   });
});

// encrpt password in query params
