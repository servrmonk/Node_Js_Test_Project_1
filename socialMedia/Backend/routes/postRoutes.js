const express = require('express')
const {createPost,getPost,deletePost} = require('../controllers/CreatePostControllers')
const router = express.Router();

router.get('/getpost',getPost)
router.post('/createpost',createPost)
router.delete('/deletepost',deletePost)

module.exports = router