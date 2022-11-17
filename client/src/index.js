import "./index.css";
import "../assets/note_image.png";

window.addEventListener("load", () => {
   const randomButton = document.getElementById("randomButton");
   const randomDiv = document.getElementById("randomDiv");
   let counter = 0;
   randomButton.addEventListener("click", function () {
      counter = counter + 1;

      console.log("counter", counter);
      randomDiv.innerHTML = "Hi Hi Hi Hi";
      console.log("hfuehreiuh");
   });
});
