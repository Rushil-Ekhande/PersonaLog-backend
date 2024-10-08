import { Router } from "express";
import { login, register, updateUser } from "../Controllers/UserController.js";
import { getAuthToken } from "../Middlewares/getAuthTokenMiddleware.js";
const router = Router();

router.post('/register-user', register);
router.put('/update-user', getAuthToken ,updateUser);
router.post('/login-user', login);

export default router;