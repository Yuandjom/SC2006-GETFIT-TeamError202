import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

//initialise the routing
const router = express.Router();

/**
 * .get (Read)
 * .post (create)
 * .delete (delete)
 * .put/.patch (update)
 */

/* READ */
// additional path, verifyToken(middleware), controller
router.get("/:id", verifyToken, getUser);
//router.get("/:id", getUser)
//http://localhost:3001/users/:id

router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
