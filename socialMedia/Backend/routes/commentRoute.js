const express = require('express')
const router = express.Router()
const {createComment,getComment} = require('../controllers/CommentController')

router.post('/addcomment',createComment)
router.get('/getcomment',getComment)

module.exports = router