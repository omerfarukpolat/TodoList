import axios from "axios";

async function userLogin(email, password) {
  try {
    const { data } = await axios.post("/api/users/login", { email, password });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default userLogin;
