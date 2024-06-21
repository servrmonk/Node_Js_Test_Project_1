const CreatePost = require("../model/CreatePostModel");

const PostControllers = {
  getPost: async (req, res) => {
    try {
      const post = await CreatePost.findAll();
      res.status(200).json(post);
    } catch (err) {
      console.log("Error in fetching post ", err);
      res.status(500).json({ err: "Failed to fetch posts" });
    }
  },
  createPost: async (req, res) => {
    const { name, description, postLink, postId } = req.body;
    console.log("Req.body in create post ", req.body);
    try {
      const newPost = await CreatePost.create({
        name,
        description,
        postLink,
        postId,
      });
      res.status(201).json(newPost);
    } catch (err) {
      console.log("Error in creating post ", err);
      res.status(500).json({ err: "Fail to Create post" });
    }
  },
  deletePost:async (req,res)=>{
    const {id} = req.params;
    console.log("id in req.params ",id);
    try{
        const postToDelete = await CreatePost.findByPk(id);
        if(!postToDelete){
            return res.status(404).json({error:"Post not found"})
        }
        await postToDelete.destroy();
        res.status(200).json({message:"Post deleted successfully"})
    }catch(err){
        console.log("Error in deleting post ",err);
        res.status(500).json({err:"Fail to delete post"})
    }
  }
};
module.exports = PostControllers;