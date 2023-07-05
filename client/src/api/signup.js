import axios from "axios";

async function signup(username, email, password) {
  try {
    const { data } = await axios.post("/api/users/register", {
      username,
      email,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default signup;
