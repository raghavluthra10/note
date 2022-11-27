import "../../index.css";
import "./signUp.css";
import axios from "axios";

document.addEventListener("DOMContentLoaded", function () {
   const signUpForm = document.getElementById("signUpForm");

   const name = document.getElementById("signUpUserName");
   const email = document.getElementById("signUpEmail");
   const password = document.getElementById("signUpPassword");

   signUpForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!name.value || !email.value || !password.value) {
         window.alert("Please add all the credentials!");
         return;
      }
      const formData = new FormData(signUpForm).entries();
      const data = JSON.stringify(Object.fromEntries(formData));

      console.log("data =>", data);

      try {
         const response = await axios.post(
            `${window.location.protocol}//${window.location.hostname}:8000/signup`,
            {
               data,
            }
         );
         console.log("new form => ", data);
         console.log("response =>", response);

         // redirect to login page
         window.location.replace("/login.html");
      } catch (error) {
         console.log(error);
      }
   });
});
