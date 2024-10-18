import { Router } from "express";
import { createPage, deletePage, getAllPages, getPage, updatePage } from "../Controllers/PageController.js";
const router = Router();

router.post('/create-new-page', createPage);
router.put('/update-page/:pageId', updatePage);
router.delete('/delete-page/:pageId', deletePage);
router.get('/get-page/:pageId', getPage);
router.get('/get-all-pages', getAllPages);


export default router;