import React, { useContext, useState } from "react";
import SocialMedia from "../store/context";

export default function Posts() {
  const [toggledCardId, setToggledCardId] = useState(null);
  const [com, setCom] = useState("");
  const { addComment: addComm, post, comment } = useContext(SocialMedia);

  const addComment = (e) => {
    e.preventDefault();
    console.log("inside add comment");
    addComm({ postId: toggledCardId, comment: com });
    setCom("");
    setToggledCardId(null);
  };

  return (
    <div className="min-h-screen bg-stone-200 flex justify-center items-start py-4">
      <div className="grid grid-cols-1 p-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {post?.map((card) => (
          <div
            key={card.postId}
            className="max-w-xs bg-gray-300 rounded-2xl shadow-lg border border-gray-400 dark:bg-neutral-700 dark:border-neutral-600"
          >
            <img
              className="hover:opacity-95 p-1 btn shadow-[0_2px_0_rgb(0,0,0)] hover:shadow-[0_2px_0px_rgb(0,0,0)] text-black ease-in hover:translate-x-1 transition-all rounded-2xl"
              src={card.postLink}
              alt=""
            />

            <div className="p-4">
              <h5 className="mb-2 text-lg font-semibold leading-tight text-neutral-800 dark:text-neutral-50">
                {card.name}
              </h5>
              <p className="mb-4 text-lg text-neutral-800 dark:text-neutral-200">
                {card.description}
              </p>

              {toggledCardId !== card.postId ? (
                <button
                  type="button"
                  className="py-3 px-10 text-sm font-semibold font-serif ml-[18%] text-center text-blue-950 rounded-lg bg-yellow-300 sm:w-fit hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-primary-300"
                  onClick={() => setToggledCardId(card.postId)}
                >
                  ✉ Comment
                </button>
              ) : (
                <form onSubmit={addComment}>
                  <input
                    type="text"
                    placeholder="Add Comment"
                    value={com}
                    onChange={(e) => setCom(e.target.value)}
                    className="py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-2 hover:bg-yellow-200 ml-2 bg-amber-200 rounded-md"
                  >
                    Send
                  </button>
                  <ul>
                    {comment.map((elm) => {
                      {/* console.log("Comment:", elm); */}
                      if (elm.postId === card.postId) {
                        return (
                          <li key={elm.id + Math.floor(Math.random()*88 +10)}>
                            Anonymous - {elm.comment}
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
