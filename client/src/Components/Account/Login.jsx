import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { API } from "../service/api";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  widht: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
    text-align: center;
  }
`;
const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

const StyledErrorText = styled(Typography)`
  color: #ff6161;
  font-size: 10px;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const Login = () => {
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const signupIntialValue = {
    name: "",
    username: "",
    password: "",
  };

  const [Account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupIntialValue);
  const [error, setError] = useState("");

  const toggleSignup = () => {
    Account === "login" ? toggleAccount("signup") : toggleAccount("login");
  };
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log(signup);
  };

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        setError("");
        setSignup(signupIntialValue);
        toggleAccount("login");
      } else {
        console.error("Error Response:", response);
        setError("Something went wrong! Please try again later");
      }
    } catch (error) {
      console.error("Caught Error:", error);
      setError("An error occurred while signing up. Please try again later.");
    }
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="logoimg" />
        {Account === "login" ? (
          <Wrapper>
            <TextField variant="standard" label="Enter username" />
            <TextField variant="standard" label="Enter password" />

            {error && <StyledErrorText>{error}</StyledErrorText>}
            <LoginButton variant="contained">Login</LoginButton>
            <Text>OR</Text>
            <SignupButton onClick={() => toggleSignup()}>
              Create an Account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
            />
            {error && <StyledErrorText>{error}</StyledErrorText>}
            <SignupButton variant="contained" onClick={() => signupUser()}>
              Signup
            </SignupButton>
            <Text>OR</Text>
            <LoginButton onClick={() => toggleSignup()}>
              Already have an Account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
