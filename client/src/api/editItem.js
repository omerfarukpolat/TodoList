import axios from "axios";

async function editItem(id, thumbnailImage, text, file) {
  try {
    const { data } = await axios.put(
      `/api/items/${id}`,
      {
        thumbnailImage,
        text,
        file,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default editItem;
