import "../../index.css";
import "./login.css";

import axios from "axios";

document.addEventListener("DOMContentLoaded", async function () {
   const loginForm = document.getElementById("loginForm");
   const email = document.getElementById("loginInput");
   const loginPassword = document.getElementById("loginPassword");

   const postUrl = "http://localhost:8000/signin";

   loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (!email.value || !loginPassword.value) {
         window.alert("Please add all login credentials!");
         return;
      }

      const formData = new FormData(loginForm).entries();
      const data = JSON.stringify(Object.fromEntries(formData));

      try {
         const response = await axios.post(
            "http://localhost:8000/signin",
            {
               data,
            },
            {
               withCredentials: true,
            }
         );
         console.log("new form => ", data);
         console.log("response =>", response);

         // redirect to index.html
         window.location.replace("/index.html");
      } catch (error) {
         console.log(error);
      }
   });
});

// encrpt password in query params
