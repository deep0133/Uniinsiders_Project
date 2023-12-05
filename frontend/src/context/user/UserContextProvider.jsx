import { useState } from "react";
import { UserContext } from "../CreateContext";
import { PropTypes } from "prop-types";
import axios from "axios";
function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [userMsg, setUserMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const LoginRequest = async (formData) => {
    try {
      setLoading(true);

      const url = "http://localhost:2000/api/v1/login";

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
      setUserMsg("Login success");
    } catch (error) {
      setUserMsg("Login failed");
    } finally {
      setLoading(false);
    }
  };
  const RegisterRequest = async (formData) => {
    try {
      setLoading(true);

      const url = "http://localhost:2000/api/v1/register";

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setUserMsg("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const Profile = async () => {
    try {
      const token = await localStorage.getItem("token");
      setUser(null);
      if (!token) return;

      const url = "http://localhost:2000/api/v1/me";

      setLoading(true);

      const response = await axios.post(
        url,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const AllUser = async () => {
    try {
      const url = "http://localhost:2000/api/v1/allUser";

      setLoading(true);

      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setUserList(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        userMsg,
        user,
        setUser,
        userList,
        setUserList,
        RegisterRequest,
        LoginRequest,
        Profile,
        AllUser,
      }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default UserContextProvider;
