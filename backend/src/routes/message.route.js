const express = require("express");
const { getUsersForSidebar, getMessages, sendMessage } = require("../controllers/message.controller");
const { protectRoute } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);


module.exports = router;