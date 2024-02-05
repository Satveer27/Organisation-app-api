import { userLoginController, userRegistrationController, getAllUserController, updateUserController, getUserByZone, deleteUserController } from "../controller/userController.js";
import isAdmin from "../middleware/isAdmin.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
import express from "express";
import upload from "../config/fileUpload.js";

const userRouter = express.Router();

userRouter.post('/register', isLoggedIn , isAdmin, upload.single('file'),  userRegistrationController);
userRouter.post('/login', userLoginController);
userRouter.get('/allUsers', isLoggedIn , isAdmin, getAllUserController);
userRouter.put('/:id/updateUsers', isLoggedIn , isAdmin, upload.single('file'), updateUserController);
userRouter.put('/:id/delete', isLoggedIn , isAdmin, deleteUserController);
userRouter.get('/zone',getUserByZone);

export default userRouter;
