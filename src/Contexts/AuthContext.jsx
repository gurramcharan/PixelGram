import { createContext, useState, useReducer, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authReducer } from "../reducers/AuthReducer";
import axios from "axios";
import { ReactToastify } from "../Utils/ReactToastify";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userCredentials, setUserCredentials] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
  });

  const curr_token = localStorage.getItem("data");
  const active_user = JSON.parse(localStorage.getItem("curr_user"));

  const authInitial = {
    isAuthLoading: false,
    user: active_user ? active_user : {},
    E_token: curr_token ? curr_token : "",
  };

  const [authState, authDispatch] = useReducer(authReducer, authInitial);


  //Logout
  const Logout = () => {
    authDispatch({ type: "set_token", payload: "" });
    authDispatch({ type: "set_user", payload: {} });
    localStorage.removeItem("data");
    localStorage.removeItem("curr_user");
    ReactToastify("Logged out", "error");
  };
  useEffect(() => {}, [authState]);

  //check login function
  const CheckLogin = () => {
    return localStorage.getItem("data") ? true : false;
  };

  //Login
  const Login = async (userdata) => {
    try {
      console.log(userdata);
      authDispatch({ type: "set_loading", payload: true });
      const response = await axios.post(`/api/auth/login`, {
        username: userdata.username,
        password: userdata.password,
      });

      console.log(response);

      if (response.status === 200) {
        authDispatch({ type: "set_user", payload: response.data?.foundUser });
        localStorage.setItem("data", response.data?.encodedToken);
        localStorage.setItem(
          "curr_user",
          JSON.stringify(response.data?.foundUser)
        );
        authDispatch({ type: "set_loading", payload: false });
        authDispatch({
          type: "set_token",
          payload: response.data?.encodedToken,
        });
        navigate(location?.state?.from?.pathname || "/home");
        ReactToastify(
          `welcome ${response.data?.foundUser.username}`,
          "success"
        );
      }
      if (response.status === 404) {
        response?.errors?.map((e) => ReactToastify(e, "error"));
      }
    } catch (error) {
      error?.response?.data?.errors?.map((e) => ReactToastify(e, "error"));
    }
  };

  //Signup
  const SignUp = async (SignUpData) => {
    try {
      authDispatch({ type: "set_loading", payload: true });
      const response = await axios.post(`/api/auth/signup`, {
        firstname: SignUpData.firstname,
        lastname: SignUpData.lastname,
        email: SignUpData.email,
        username: SignUpData.username,
        password: SignUpData.password,
      });
      console.log(response.data);
      if (response.status === 201) {
        authDispatch({ type: "set_loading", payload: false });
        authDispatch({
          type: "set_token",
          payload: response.data.encodedToken,
        });
        localStorage.setItem("data", response.data.encodedToken);
        localStorage.setItem(
          "curr_user",
          JSON.stringify(response.data?.createdUser)
        );
        authDispatch({ type: "set_user", payload: response.data?.createdUser });
        navigate(location?.state?.from?.pathname || "/home");
        ReactToastify(
          `welcome ${response.data?.createdUser.username}`,
          "success"
        );
      }
    } catch (error) {
      error?.response?.data?.errors?.map((e) => ReactToastify(e, "error"));
    }
  };

  //Follow
  const followUser = async (id) => {
    authDispatch({ type: "set_loading", payload: true });
    try {
      const response = await fetch(`/api/users/follow/${id}`, {
        method: "POST",
        headers: { authorization: curr_token },
      });
      const temp = await response.json();
      if (response.status === 200) {
        authDispatch({ type: "set_user", payload: temp.user });
        localStorage.setItem("curr_user", JSON.stringify(temp.user));
        authDispatch({ type: "set_loading", payload: false });
        ReactToastify(`followed ${temp.followUser.username}`, "info");
      }
      if (response.status === 400) {
        temp.errors.map((e) => ReactToastify(`${response.status} e `, "warn"));
      }
      if (response.status === 404) {
        temp.errors.map((e) => ReactToastify(`${response.status} e`, "warn"));
      }
    } catch (error) {
      console.log("error while following a user", error);
      error?.response?.data?.errors?.map((e) => ReactToastify(e, "error"));
    }
  };

  //Unfollow
  const UnfollowUser = async (id) => {
    authDispatch({ type: "set_loading", payload: true });

    try {
      const response = await fetch(`/api/users/unfollow/${id}`, {
        method: "POST",
        headers: { authorization: curr_token },
      });
      const temp = await response.json();
      if (response.status === 200) {
        authDispatch({ type: "set_user", payload: temp.user });
        localStorage.setItem("curr_user", JSON.stringify(temp.user));
        authDispatch({ type: "set_loading", payload: false });
        ReactToastify(`Unfollowed ${temp.followUser.username}`, "info");
      }
      if (response.status === 400) {
        temp.errors.map((e) => ReactToastify(e, "warn"));
      }
      if (response.status === 404) {
        temp.errors.map((e) => ReactToastify(e, "warn"));
      }
    } catch (error) {
      console.log("error while following a user", error);
      error?.response?.data?.errors?.map((e) => ReactToastify(e, "error"));
    }
  };
  

  return(
    <AuthContext.Provider value={{
      SignUp,
      userCredentials,
      setUserCredentials,
      Login,
      Logout,
      active_user,
      followUser,
      UnfollowUser,
      authState,
      curr_token,
      authDispatch,
      CheckLogin,}}>
      {children}
    </AuthContext.Provider>
  )
}