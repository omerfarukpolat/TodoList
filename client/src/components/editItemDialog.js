import React, { useEffect, useState } from "react";
import { Button, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";

const EditItemDialog = ({ isOpen, onConfirm, onClose, item }) => {
  const [thumbnailImage, setThumbnailImage] = useState(
    item.thumbnailImage
      ? item.thumbnailImage.data
        ? [item.thumbnailImage.data]
        : []
      : []
  );
  const [file, setFile] = useState(
    item.file ? (item.file.data ? [item.file.data] : []) : []
  );
  const [description, setDescription] = useState(item.text);

  useEffect(() => {
    setDescription(item.text);
    setThumbnailImage(
      item.thumbnailImage
        ? item.thumbnailImage.data
          ? [item.thumbnailImage.data]
          : []
        : []
    );
    setFile(item.file ? (item.file.data ? [item.file.data] : []) : []);
  }, [item]);

  const onChange = async ({ fileList: newFileList }) => {
    setThumbnailImage(newFileList);
  };
  const onInputChange = (e) => {
    setDescription(e.target.value);
    console.log("Change:", e.target.value);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Modal
      title="Add something"
      centered
      open={isOpen}
      onOk={() =>
        onConfirm({
          id: item._id,
          thumbnailImage: thumbnailImage,
          text: description,
          file: file,
        })
      }
      onCancel={() => onClose()}
    >
      <ImgCrop rotationSlider>
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={thumbnailImage}
          onChange={onChange}
          onPreview={onPreview}
        >
          {thumbnailImage.length < 1 && "+ Image"}
        </Upload>
      </ImgCrop>

      <TextArea
        defaultValue={description}
        showCount
        maxLength={100}
        style={{ height: 120, resize: "none" }}
        onChange={onInputChange}
        placeholder="Text"
      />
      <div style={{ marginTop: 25 }}>
        <Upload
          beforeUpload={(file) => {
            const reader = new FileReader();

            reader.onload = (e) => {
              console.log(e.target.result);
            };
            reader.readAsText(file);

            return false;
          }}
          accept={".txt"}
          onChange={(info) => {
            setFile(info.fileList);
          }}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
        </Upload>
      </div>
    </Modal>
  );
};

export default EditItemDialog;
