import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createPost, updatePost, deletePost, getPost, getAllPosts } from '../controller/post-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
import { loginUser, singupUser, logoutUser } from '../controller/user-controller.js';
import { authenticateToken, createNewToken } from '../controller/jwt-controller.js';

import upload from '../utils/upload.js';

const router = express.Router();
//router.use(express.static('./public'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, "../public");
router.use(express.static(staticPath));
router.get('/testroute',async(req,res)=>{
    var response={}
    response.error = false;
    response.code = 0;
    response.message="test route";
    res.writeHead(200, {'content-type': 'application/json'});
    res.write(JSON.stringify(response));
    res.end();
})
router.post('/login', loginUser);
router.post('/signup', singupUser);
router.post('/logout', logoutUser);

router.post('/token', createNewToken);

router.post('/create', authenticateToken, createPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);

router.get('/post/:id', authenticateToken, getPost);
router.get('/posts', authenticateToken, getAllPosts);

router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;