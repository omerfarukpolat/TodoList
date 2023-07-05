import axios from "axios";

async function addItem(thumbnailImage, text, file) {
  try {
    const { data } = await axios.post(
      "/api/items/",
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

export default addItem;
