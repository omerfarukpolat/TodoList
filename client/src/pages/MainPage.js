import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Avatar, Button, Input, Menu, Select } from "antd";
import React from "react";
import { LogoutOutlined, PlusCircleOutlined } from "@ant-design/icons";
import AddItemDialog from "../components/addItemDialog";
import TodoList from "../components/todoList";
import addItem from "../api/addItem";
import getItems from "../api/getItems";
import { setUserItemsData } from "../redux/dataSlice";
import EditItemDialog from "../components/editItemDialog";
import TextArea from "antd/es/input/TextArea";
import deleteItem from "../api/deleteItem";

const Search = Input.Search;

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filteredData, setfilteredData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [isRemoveConfirmed, setIsRemoveConfirmed] = useState(false);
  const [uniqueTags, setUniqueTags] = useState([]);
  const user = useSelector((state) => state.data.currentUser);
  const data = useSelector((state) => state.data.userItemsData);
  const [userName, setUserName] = useState("");
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);

  const handleChange = (value) => {
    if (value.length === 0) {
      setfilteredData(initialData);
    } else {
      let tempFilteredData = [];
      initialData.forEach((item) => {
        value.forEach((tag) => {
          if (item.tags.includes(tag)) {
            tempFilteredData.push(item);
          }
        });
      });
      setfilteredData(tempFilteredData);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem("accessToken")) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    //fetch unique tags
    let tags = [];
    initialData.forEach((item) => {
      item.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
    setUniqueTags(tags);
  }, [initialData]);

  useEffect(() => {
    if (!isAddItemDialogOpen) {
      getItems().then((response) => {
        setfilteredData(response);
        setInitialData(response);
      });
    }
  }, [isAddItemDialogOpen]);

  useEffect(() => {
    if (isRemoveConfirmed) {
      getItems().then((response) => {
        setfilteredData(response);
        setIsRemoveConfirmed(false);
      });
    }
  }, [isRemoveConfirmed]);

  useEffect(() => {
    getItems().then((response) => {
      setfilteredData(response);
    });
  }, [data]);

  const handleSearch = (value) => {
    if (value === "") {
      setfilteredData(initialData);
    } else {
      setfilteredData(
        filteredData.filter((item) => {
          return item.text.toLowerCase().includes(value.toLowerCase());
        })
      );
    }
  };

  const handleOnDelete = (id) => {
    deleteItem(id).then((response) => {
      if (response) {
        dispatch(setUserItemsData(getItems()));
        setIsRemoveConfirmed(true);
      } else {
        alert("Invalid username or password");
      }
    });
    alert("Remove item successfully");
  };

  const handleOnConfirm = (item) => {
    addItem(item.thumbnailImage, item.text, item.file, item.tags).then(
      (response) => {
        if (response) {
          alert("Add item successfully");
        } else {
          alert("Invalid username or password");
        }
      }
    );
    setIsAddItemDialogOpen(false);
  };
  const handleOnClose = () => {
    setIsAddItemDialogOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    navigate("/login");
  };

  const onInputChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <div>
      <Menu
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
        mode="horizontal"
        theme={"dark"}
        items={[
          {
            key: "0",
            label: (
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontFamily: "Courier" }}>
                  {sessionStorage.getItem("username")}
                </p>
                <Avatar
                  style={{ marginLeft: 24 }}
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              </div>
            ),
          },
          {
            key: "1",
            label: (
              <Button
                style={{ marginRight: 24, marginTop: 23 }}
                type={"primary"}
                icon={<LogoutOutlined />}
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            ),
          },
        ]}
      />
      <div
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "white", fontFamily: "Courier" }}>My Todo List</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Search
              style={{
                marginBottom: 24,
                width: 180,
              }}
              size={"large"}
              placeholder="Search"
              onChange={(event) => handleSearch(event.target.value)}
              onSearch={(value) => handleSearch(value)}
            />
            <Select
              style={{
                marginBottom: 24,
                width: 290,
              }}
              mode="multiple"
              placeholder="Filter Tags"
              size={"large"}
              onChange={handleChange}
              options={uniqueTags.map((tag) => {
                return { value: tag };
              })}
            />
            <Button
              style={{
                marginBottom: 24,
                width: 180,
                alignSelf: "flex-end",
              }}
              ghost={true}
              type="dashed"
              shape="round"
              icon={<PlusCircleOutlined />}
              size={"large"}
              onClick={() => {
                setIsAddItemDialogOpen(true);
              }}
            >
              Add new
            </Button>
          </div>
          <TodoList
            data={filteredData}
            onDeleteConfirm={(id) => handleOnDelete(id)}
          />
        </div>
        <AddItemDialog
          isOpen={isAddItemDialogOpen}
          onConfirm={handleOnConfirm}
          onClose={handleOnClose}
          onDelete={handleOnDelete}
        />
      </div>
    </div>
  );
};

export default MainPage;
