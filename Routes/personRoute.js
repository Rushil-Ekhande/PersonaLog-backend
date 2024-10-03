import { Router } from "express";
import { createPerson, deletePerson, updatePerson } from "../Controllers/PersonController.js";
import { getAuthToken } from "../Middlewares/getAuthTokenMiddleware.js";
const router = Router();

router.post('/create-new-person', getAuthToken ,createPerson);
router.put('/update-person/:personId', updatePerson);
router.delete('/delete-person/:personId', deletePerson);

export default router;