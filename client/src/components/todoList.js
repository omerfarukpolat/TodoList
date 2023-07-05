import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, List, Popconfirm, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  DeleteOutlined,
  DeleteTwoTone,
  EditOutlined,
  EditTwoTone,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import EditItemDialog from "./editItemDialog";
import editItem from "../api/editItem";
import getItems from "../api/getItems";
import { setUserItemsData } from "../redux/dataSlice";
import deleteItem from "../api/deleteItem";

const TodoList = ({ data, onDeleteConfirm }) => {
  const dispatch = useDispatch();
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleOnConfirm = (item) => {
    editItem(
      item.id,
      item.thumbnailImage,
      item.text,
      item.file,
      item.tags
    ).then((response) => {
      if (response) {
        alert("Edit item successfully");
        dispatch(setUserItemsData(getItems()));
      } else {
        alert("Invalid username or password");
      }
    });
    setIsEditItemDialogOpen(false);
  };

  const handleOnClose = () => {
    setIsEditItemDialogOpen(false);
  };
  return (
    <div
      style={{
        height: "55vh",
        overflow: "auto",
        width: 650,
        backgroundColor: "white",
        border: "1px solid white",
        borderRadius: 10,
        padding: 24,
      }}
    >
      <List
        pagination={["bottom", "center"]}
        dataSource={[...data]}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Button
                type="secondary"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsEditItemDialogOpen(true);
                  setSelectedItem(item);
                }}
              />,
              <Popconfirm
                placement="top"
                title={"Are you sure want to delete this item?"}
                onConfirm={() => onDeleteConfirm(item._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="secondary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={
                item.thumbnailImage ? (
                  <Avatar
                    src={
                      item.thumbnailImage
                        ? item.thumbnailImage.data
                          ? item.thumbnailImage.data.thumbUrl
                          : ""
                        : ""
                    }
                  />
                ) : null
              }
              title={<a href="https://ant.design">{item.text}</a>}
            />
          </List.Item>
        )}
      />
      {selectedItem && (
        <EditItemDialog
          isOpen={isEditItemDialogOpen}
          onConfirm={handleOnConfirm}
          onClose={handleOnClose}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default TodoList;
