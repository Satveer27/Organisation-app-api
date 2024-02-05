import { userLoginController, userRegistrationController, getAllUserController, updateUserController, getUserByZone, deleteUserController, getSingleUser } from "../controller/userController.js";
import isAdmin from "../middleware/isAdmin.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
import express from "express";
import upload from "../config/fileUpload.js";

const userRouter = express.Router();

userRouter.post('/register', isLoggedIn , isAdmin, upload.single('file'),  userRegistrationController);
userRouter.post('/login', userLoginController);
userRouter.get('/zone', getUserByZone);
userRouter.get('/allUsers', isLoggedIn , isAdmin, getAllUserController);
userRouter.put('/:id/updateUsers', isLoggedIn , isAdmin, upload.single('file'), updateUserController);
userRouter.delete('/:id/delete', isLoggedIn , isAdmin, deleteUserController);
userRouter.get('/:id', isLoggedIn , isAdmin, getSingleUser);


export default userRouter;
