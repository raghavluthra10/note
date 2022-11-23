import "../../index.css";
import "../../../assets/note_image.png";
import "./index.css";

import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
   const logoutButton = document.getElementById("logoutButton");
   const todoForm = document.getElementById("todoForm");

   const tasksContainerSection = document.querySelector(
      ".tasksContainerSection"
   );

   let dataAndId;
   function loopOver(dataArray) {
      dataAndId = dataArray.map(function (t) {
         return {
            todoId: t.id,
            todoToBePrinted: ` <div class="taskContainer" >
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
               <button class="standardButton buttonWidthHundredPercent deleteButton" >
                  delete
               </button>
            </section>
      </div>
         `,
         };
      });
      const extractTodo = dataAndId.map((todo) => todo.todoToBePrinted);

      tasksContainerSection.innerHTML = extractTodo.join("");
      console.log("get all todos =>", dataAndId);
   }

   async function getAllTodosAndShow() {
      try {
         const response = await axios.get("http://localhost:8000/todos", {
            withCredentials: true,
         });

         const data = response.data;
         console.log(data);
         loopOver(data);

         // const dataAndId = data.map(function (t) {
         //    return {
         //       todoId: t.id,
         //       todoToBePrinted: ` <div class="taskContainer" >
         //          <section class="taskContainerLeft">
         //             <input
         //                type="checkbox"
         //                class="taskContainerCheckbox inputCheckbox"
         //                ${t.completed && "checked"}

         //             />
         //             <div class="subDivtaskContainerLeft">
         //                <span class="taskContainerTitle"> ${t.title} </span>
         //                <div class="taskContainerDesc">
         //                   ${t.description ? t.description : "No Description"}
         //                </div>
         //             </div>
         //          </section>
         //          <section class="taskContainerRight">
         //             <button
         //                class="standardButton buttonWidthHundredPercent editButton"
         //             >
         //                edit
         //             </button>
         //             <button class="standardButton buttonWidthHundredPercent deleteButton" >
         //                delete
         //             </button>
         //          </section>
         //    </div>
         //       `,
         //    };
         // });

         // const extractTodo = dataAndId.map((todo) => todo.todoToBePrinted);

         // tasksContainerSection.innerHTML = extractTodo.join("");
         // console.log("get all todos =>", extractTodo);
         const inputCheckbox = document.querySelectorAll(".inputCheckbox");

         // change task to completed or incomplete

         for (let i = 0; i < inputCheckbox.length; i++) {
            inputCheckbox[i].addEventListener("click", async function (e, key) {
               const indexOfTodo = i;
               const todo = inputCheckbox[indexOfTodo];

               // find id of todo by refering it to the index from dataAndId array
               const todoId = dataAndId[indexOfTodo].todoId;
               console.log(todoId, todo.checked);
               const changeCompletedStatus = { completed: todo.checked };
               try {
                  const response = await axios.put(
                     `http://localhost:8000/todo/${todoId}`,
                     { data: JSON.stringify(changeCompletedStatus) },
                     { withCredentials: true }
                  );

                  const updatedTodos = response.data;
                  loopOver(updatedTodos);
                  console.log(updatedTodos);
               } catch (error) {
                  console.log(error);
                  window.alert(error.message);
               }

               // show todos again
            });
         }

         // delete todo
         const deleteButton = document.querySelectorAll(".deleteButton");
         for (let i = 0; i < deleteButton.length; i++) {
            const indexOfTodo = i;
            const todo = deleteButton[indexOfTodo];

            // find id of todo by refering it to the index from dataAndId array
            const todoId = dataAndId[indexOfTodo].todoId;
            todo.addEventListener("click", async function () {
               console.log(todoId, todo);
               try {
                  const response = await axios.delete(
                     `http://localhost:8000/todo/${todoId}`,
                     { withCredentials: true }
                  );

                  const data = response.data;
                  console.log(data);
                  loopOver(data);
               } catch (error) {
                  console.log(error);
                  window.alert(error.message);
               }
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
