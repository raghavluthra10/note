import "../../index.css";
import "./guest.css";

window.addEventListener("load", function () {
   // get cookie
   // if cookie is true
   // take to todo page,
   // else keep here

   const loginButton = document.getElementById("loginButton");

   loginButton.addEventListener("click", function () {
      window.location.replace("/login.html");
      //   document.cookie = "id=1;";
      //   console.log(document.cookie.id);
      //   console.log("take me to login page");
   });
});
