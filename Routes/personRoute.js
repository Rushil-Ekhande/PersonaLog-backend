import { Router } from "express";
import { createPerson, deletePerson, updatePerson } from "../Controllers/PersonController.js";
const router = Router();

router.post('/create-new-person', createPerson);
router.put('/update-person', updatePerson);
router.delete('/delete-person/:personId', deletePerson);

export default router;