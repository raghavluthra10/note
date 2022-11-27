import axios from "axios";

async function checkIfUserIsLoggedIn() {
   try {
      const response = await axios.get(
         `${window.location.protocol}//${window.location.hostname}:8000/isLoggedIn`,
         {
            withCredentials: true,
         }
      );
      console.log("response =>", response);
   } catch (error) {
      window.location.replace("/guest.html");
      console.log("error =>", error);
   }
}

export default checkIfUserIsLoggedIn;
