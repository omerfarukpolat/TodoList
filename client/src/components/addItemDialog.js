import React, { useState } from "react";
import ImgCrop from "antd-img-crop";
import { Button, Modal, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";

const AddItemDialog = ({ isOpen, onConfirm, onClose }) => {
  const [thumbnailImage, setThumbnailImage] = useState([]);
  const [file, setFile] = useState([]);
  const [description, setDescription] = useState("");

  const onChange = async ({ fileList: newFileList }) => {
    setThumbnailImage(newFileList);
  };
  const onInputChange = (e) => {
    setDescription(e.target.value);
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

            // Prevent upload
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

export default AddItemDialog;
