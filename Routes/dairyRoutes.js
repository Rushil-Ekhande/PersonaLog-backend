import express from "express";
import { createDiary, deleteDiary, updateDiary } from "../Controllers/DiaryController.js";
const router = express.Router();

router.post('/create-new-diary', createDiary);
router.put('/update-diary', updateDiary);
router.delete('/delete-diary', deleteDiary); 

export default router;