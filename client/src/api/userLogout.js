import axios from "axios";

async function userLogout(email, password) {
  try {
    const { data } = await axios.post("/api/users/logout", { email, password });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default userLogout;
