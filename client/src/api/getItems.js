import axios from "axios";

async function getItems() {
  try {
    const { data } = await axios.get("/api/items/", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default getItems;
