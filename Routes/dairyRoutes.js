import { Router } from "express";
import { createDiary, deleteDiary, updateDiary } from "../Controllers/DiaryController.js";
import { getAuthToken } from "../Middlewares/getAuthTokenMiddleware.js";
const router = Router();

router.post('/create-new-diary', getAuthToken ,createDiary);
router.put('/update-diary/:diaryId', updateDiary);
router.delete('/delete-diary/:diaryId', deleteDiary);

export default router;