import axios from "axios";

async function editItem(id, thumbnailImage, text, file, tags) {
  try {
    const { data } = await axios.put(
      `/api/items/${id}`,
      {
        thumbnailImage,
        text,
        file,
        tags,
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
