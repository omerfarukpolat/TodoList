import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Form, Input, Button, Row } from "antd";
import userLogin from "../api/userLogin";
import { setCurrentUser } from "../redux/dataSlice";

export default function LoginPage() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const isLoading = false;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values) => {
    userLogin(values.username, values.password).then((data) => {
      if (data.accessToken) {
        dispatch(setCurrentUser(data));
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("username", data.username);
        navigate("/");
      } else {
        alert("Invalid username or password");
      }
    });
  };

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    }
  }, [username]);

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ width: 600, border: "1px solid white", padding: 24 }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: 24,
              color: "white",
              fontFamily: "Courier",
            }}
          >
            Login
          </h1>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              style={{ height: "6vh", fontSize: 20 }}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              style={{ height: "6vh", fontSize: 20 }}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              style={{ height: "5vh", fontSize: 24 }}
              type="primary"
              htmlType="submit"
              block
            >
              Log in
            </Button>
          </Form.Item>
          <p style={{ fontSize: 18, color: "White" }}>
            Don't have an account? <RouterLink to="/signup">Sign up</RouterLink>
          </p>
        </Form>
      </div>
    </div>
  );
}
