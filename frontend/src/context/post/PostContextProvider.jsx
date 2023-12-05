import { useState } from "react";
import { PostContext } from "../CreateContext";
import { PropTypes } from "prop-types";
import axios from "axios";
function PostContextProvider({ children }) {
  const [post, setPost] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  const [addPopUp, setAddPopUp] = useState(false);

  const AllPosts = async () => {
    try {
      const url = "http://localhost:2000/post/v1/allPost";
      const token = localStorage.getItem("token");

      setPostLoading(true);

      const response = await axios.post(
        url,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setPost(response.data.post);
    } catch (error) {
      console.log(error);
    } finally {
      setPostLoading(false);
    }
  };

  const AddPost = async (data) => {
    try {
      const url = "http://localhost:2000/post/v1/addPost";

      setPostLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (response.data.success) {
        AllPosts();
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        post,
        setPost,
        postLoading,
        AllPosts,
        addPopUp,
        setAddPopUp,
        AddPost,
      }}>
      {children}
    </PostContext.Provider>
  );
}

PostContextProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default PostContextProvider;
