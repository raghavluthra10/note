import "../../index.css";
import "../../../assets/note_image.png";
import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
   const standardButton = document.getElementById("standardButton");

   let counter = 0;
   standardButton.addEventListener("click", function () {
      counter = counter + 1;

      console.log("counter", counter);
   });
});
