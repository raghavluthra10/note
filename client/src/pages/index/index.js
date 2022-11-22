import "../../index.css";
import "../../../assets/note_image.png";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
   const standardButton = document.getElementById("standardButton");
   const logoutButton = document.getElementById("logoutButton");

   let counter = 0;
   standardButton.addEventListener("click", function () {
      counter = counter + 1;

      console.log("counter", counter);
   });

   logoutButton.addEventListener("click", function () {
      // remove the cookie
      const cookies = document.cookie;
      const extractCookie = cookies.split("=");
      const name = extractCookie[0];
      const cookieValue = extractCookie[1];

      // logout user by removing auth-token cookie from browser
      document.cookie = `${name}=null`;
      window.location.replace("/guest.html");
   });
});
