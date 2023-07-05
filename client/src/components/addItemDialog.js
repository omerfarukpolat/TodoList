import React, { useState, useRef, useEffect } from "react";
import ImgCrop from "antd-img-crop";
import { Button, Modal, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Space, Tag, Tooltip, theme } from "antd";
const AddItemDialog = ({ isOpen, onConfirm, onClose }) => {
  const [thumbnailImage, setThumbnailImage] = useState([]);
  const [file, setFile] = useState([]);
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    setTags([]);
    setThumbnailImage([]);
    setFile([]);
    setDescription("");
  }, [isOpen]);
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

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };
  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
  };
  const tagInputStyle = {
    width: 78,
    verticalAlign: "top",
  };
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <Modal
      title="Add something"
      centered
      open={isOpen}
      onOk={() => {
        onConfirm({
          thumbnailImage: thumbnailImage,
          text: description,
          file: file,
          tags: tags,
        });
        setDescription("");
        setThumbnailImage([]);
        setFile([]);
      }}
      onCancel={() => onClose()}
    >
      <ImgCrop rotationSlider>
        <Upload
          beforeUpload={(file) => {
            const isPNG =
              file.type === "image/png" || file.type === "image/jpeg";
            if (!isPNG) {
              message.error(`${file.name} is not a png/jpeg file`);
            }
            return isPNG || Upload.LIST_IGNORE;
          }}
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p style={{ fontSize: "24", marginRight: 10 }}>
          <b>Tags:</b>
        </p>
        <Space size={[0, 8]} wrap>
          <Space size={[0, 8]} wrap>
            {tags.map((tag, index) => {
              if (editInputIndex === index) {
                return (
                  <Input
                    ref={editInputRef}
                    key={tag}
                    size="small"
                    style={tagInputStyle}
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputConfirm}
                    onPressEnter={handleEditInputConfirm}
                  />
                );
              }
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag
                  key={tag}
                  closable={index !== 0}
                  style={{
                    userSelect: "none",
                  }}
                  onClose={() => handleClose(tag)}
                >
                  <span
                    onDoubleClick={(e) => {
                      if (index !== 0) {
                        setEditInputIndex(index);
                        setEditInputValue(tag);
                        e.preventDefault();
                      }
                    }}
                  >
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </span>
                </Tag>
              );
              return isLongTag ? (
                <Tooltip title={tag} key={tag}>
                  {tagElem}
                </Tooltip>
              ) : (
                tagElem
              );
            })}
          </Space>
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={tagInputStyle}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Tag style={tagPlusStyle} onClick={showInput}>
              <PlusOutlined /> New Tag
            </Tag>
          )}
        </Space>
      </div>
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
