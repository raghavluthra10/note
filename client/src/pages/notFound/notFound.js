import "../../index.css";
import "./notFound.css";

window.addEventListener("load", function () {
   const takeMeToGuestPage = document.getElementById("takeMeToGuestPage");

   takeMeToGuestPage.addEventListener("click", function () {
      window.location.replace("/guest.html");
   });
});
