import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
const SocialMedia = createContext();

export const SocialMediaProvider = ({ children }) => {
  const url = `http://localhost:3002`;
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);

  const addPost = (data) => {
    axios
      .post(`${url}/post/createpost`, data)
      .then((response) => {
        setPost((prevData) => [data, ...prevData]);

        console.log("Data Posted in addpost", response.data);
      })
      .catch((error) => console.error("Error in posting slots:", error));
  };

  //   console.log("Post state is ", post);
  const addComment = (data) => {
    axios
      .post(`${url}/comment/addcomment`, data)
      .then((response) => {
        setComment((prevComment) => [data, ...prevComment]);

        console.log("comment Posted in addcomment", response.data);
      })
      .catch((error) => console.error("Error in posting comment:", error));
  };

  async function getPost() {
    axios
      .get(`${url}/post/getpost`)
      .then((response) => {
        setPost(response.data);
        console.log("Data get in getPost", response.data);
      })
      .catch((error) => console.error("Error in getting post:", error));
  }

  async function getComment() {
    try {
      const response = await axios.get(`${url}/comment/getcomment`);
      setComment(response.data);
      console.log("Data in getComment", response.data);
    } catch (error) {
      console.error("Error in getting comment:=>", error);
    }
  }

  useEffect(() => {
    getPost();
    getComment();
  }, []);

  return (
    <SocialMedia.Provider value={{ addPost, addComment, post, comment }}>
      {children}
    </SocialMedia.Provider>
  );
};
export default SocialMedia;
