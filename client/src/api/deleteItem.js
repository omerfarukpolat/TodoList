import axios from "axios";

async function deleteItem(id) {
  try {
    const { data } = await axios.delete(`/api/items/${id}`, {
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

export default deleteItem;
