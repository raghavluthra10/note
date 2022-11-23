import "../../index.css";
import "../../../assets/note_image.png";
import "./index.css";

import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
   const logoutButton = document.getElementById("logoutButton");
   const todoForm = document.getElementById("todoForm");
   // const inputCheckbox = document.querySelectorAll(".inputCheckbox");

   const tasksContainerSection = document.querySelector(
      ".tasksContainerSection"
   );

   async function getAllTodosAndShow() {
      try {
         const response = await axios.get("http://localhost:8000/todos", {
            withCredentials: true,
         });

         const data = response.data;

         const newArr = data.map(function (t, key) {
            return `
            <div class="taskContainer" ${(key = t.id)} >
               <section class="taskContainerLeft">
                  <input
                     type="checkbox"
                     class="taskContainerCheckbox inputCheckbox"
                     ${t.completed && "checked"}
                     
                  />
                  <div class="subDivtaskContainerLeft">
                     <span class="taskContainerTitle"> ${t.title} </span>
                     <div class="taskContainerDesc">
                        ${t.description ? t.description : "No Description"}
                     </div>
                  </div>
               </section>
               <section class="taskContainerRight">
                  <button
                     class="standardButton buttonWidthHundredPercent editButton"
                  >
                     edit
                  </button>
                  <button class="standardButton buttonWidthHundredPercent">
                     delete
                  </button>
               </section>
         </div>
            `;
         });

         tasksContainerSection.innerHTML = newArr.join("");
         console.log("get all todos =>", data);
         const taskContainer = document.querySelectorAll(".taskContainer");
         // const inputCheckbox = document.querySelectorAll(".inputCheckbox");

         // change task to completed or incomplete
         for (let i = 0; i < taskContainer.length; i++) {
            taskContainer[i].addEventListener("click", async function (e, key) {
               const indexOfTodo = i;
               const todo = taskContainer[indexOfTodo];

               console.log("completed != incomplete", indexOfTodo, todo);
            });
         }
      } catch (error) {
         console.log(error);
      }
   }

   getAllTodosAndShow();

   todoForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(todoForm).entries();
      const data = JSON.stringify(Object.fromEntries(formData));

      const titleInput = document.getElementById("titleInput");
      const descriptionInput = document.getElementById("descriptionInput");

      try {
         const postTodo = await axios.post(
            "http://localhost:8000/todo",
            { data },
            { withCredentials: true }
         );

         // empty the input values
         titleInput.value = "";
         descriptionInput.value = "";

         getAllTodosAndShow();

         console.log(postTodo);
      } catch (error) {
         console.log(error);
         window.alert(error.message);
      }

      console.log("todo form", data);
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
