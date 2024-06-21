import React, { useContext, useState } from "react";
import SocialMedia from "../store/context";
export default function CreatePost() {

const {addPost} = useContext(SocialMedia)

  const [name, setName] = useState("");
  const [postLink, setPostLink] = useState("");
  const [postDesc, setPostDesc] = useState("");

  const obj = {
    name:name,postLink:postLink,description:postDesc,postId:Math.floor(Math.random()*69+98)
  }
  const submitHandler = (e)=>{
    e.preventDefault();
    console.log("obj inside submit handler ",obj);
    addPost(obj)
  }

  return (
    <div className="flex justify-center items-start min-h-2 bg-stone-200 py-4">
      <section className="bg-gray-300 rounded-lg shadow-lg p-6 w-full  max-w-lg">
        <div className="py-4 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-800">
            Create a Post
          </h2>

          <form onSubmit={submitHandler} className="space-y-6  ">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-xl font-medium text-gray-900"
              >
                Username:
              </label>
              <input
                type="text"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
              <label
                htmlFor="postLink"
                className="block mb-2 text-xl font-medium text-gray-900"
              >
                Post Link:
              </label>
              <input
                type="url"
                id="postLink"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                value={postLink}
                onChange={(e)=>setPostLink(e.target.value)}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="postDescription"
                className="block mb-2 text-xl font-medium text-gray-900"
              >
                Post Description
              </label>
              <textarea
                id="postDescription"
                rows="6"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                value={postDesc}
                onChange={e => setPostDesc(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-blue-950 rounded-lg bg-yellow-300 sm:w-fit hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-primary-300"
            >
              Create Post
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
