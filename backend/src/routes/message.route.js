const express = require("express");
const { getUsersForSidebar, getMessages, sendMessage, deleteMessage } = require("../controllers/message.controller");
const { protectRoute } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/:id", protectRoute, deleteMessage);

module.exports = router;