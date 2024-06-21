const Comment = require("../model/Comments");

const CommentController = {
  getComment: async (req, res) => {
    try {
      const comment = await Comment.findAll();
      console.log("comment in get comment ===> ",comment)
      res.status(200).json(comment);
    } catch (err) {
      console.log("Error in fetching comment ", err);
      res.status(500).json({ err: "Failed to fetch comment" });
    }
  },
  createComment: async (req, res) => {
    const { comment,postId } = req.body;
    // console.log("Req.body in create comment ", req.body);
    try {
      const newComment = await Comment.create({
        comment,postId
      });
      res.status(201).json(newComment);
    } catch (err) {
      console.log("Error in creating comment ", err);
      res.status(500).json({ err: "Fail to Create comment" });
    }
  }
};
module.exports = CommentController;