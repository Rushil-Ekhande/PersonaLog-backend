import { Router } from "express";
import { createPage, deletePage, updatePage } from "../Controllers/PageController.js";
const router = Router();

router.post('/create-new-page', createPage);
router.put('/update-page', updatePage);
router.delete('/delete-page', deletePage);

export default router;