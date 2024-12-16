import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import getUserById from "../services/users/getUserById.js";
import deleteUserById from "../services/users/deleteUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import auth from "../middleware/auth.js";
import notFoundErrorHandler from '../middleware/notFoundErrorHandler.js';
import badRequestErrorHandler from "../middleware/badRequestErrorHandler.js";

const router = Router();

router.get("/", async (req, res) => {
  const { username, email } = req.query
  const users = await getUsers(username, email);
  res.json(users);
});

router.post("/", auth, async (req, res, next) => {
  try {
  const { username, password, name, email, phoneNumber, profilePicture } = req.body;
  const newUser = await createUser(username, password, name, email, phoneNumber, profilePicture);
  res.status(201).json(newUser);
} catch (error) {
  next(error) 
}
}, badRequestErrorHandler);


router.get("/:id", async (req, res, next) => {
  try {
  const { id } = req.params;
  const user = await getUserById(id);
  console.log(user);
  res.status(200).json(user);
} catch (error) {
  next(error) 
}
}, notFoundErrorHandler);

router.delete("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const user = await deleteUserById(id);
  res.status(200).send({
      message: `User with id ${id} successfully deleted`,
      user,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);

router.put("/:id", auth, async (req, res, next) => {
  try {
  const { id } = req.params;
  const { username, password, name, email, phoneNumber, profilePicture } = req.body;
  const user = await updateUserById(id, { username, password, name, email, phoneNumber, profilePicture });
  res.status(200).send({
      message: `User with id ${id} successfully updated`,
      user,
    });
  } catch (error) {
    next(error) 
  }
  }, notFoundErrorHandler);

export default router;
