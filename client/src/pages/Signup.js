import React from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import signup from "../api/signup";

const SignUp = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    signup(values.username, values.email, values.password).then((response) => {
      if (response) {
        alert("Sign up successfully");
        console.log(response);
        navigate("/login");
      } else {
        alert("Invalid username or password");
      }
    });
  };

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
          name="signUpForm"
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
            Sign Up
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
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input
              style={{ height: "6vh", fontSize: 20 }}
              placeholder="Email"
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
              Sign Up
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              style={{
                height: "6vh",
                fontSize: 24,
                borderColor: "white",
                color: "white",
              }}
              type="secondary"
              htmlType="submit"
              block
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
