const express = require('express');
const router = express.Router();
const blogCont = require('../controllers/blogControllers');

router.get('/', blogCont.blog_index);
router.post('/', blogCont.blog_create_post);
router.get('/create', blogCont.blog_create_get);
router.get('/:id', blogCont.blog_details);
router.delete('/:id', blogCont.blog_delete);

module.exports = router;