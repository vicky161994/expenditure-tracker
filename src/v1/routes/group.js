const express = require("express");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();
const { GroupService } = require("../services");

router.post("/", verifyToken, GroupService.createGroup);
router.get("/", verifyToken, GroupService.getAllGroup);
router.get("/:groupId", verifyToken, GroupService.getGroupById);
router.delete("/:groupId", verifyToken, GroupService.deleteGroup);
router.post("/join-group", verifyToken, GroupService.joinGroup);

module.exports = router;
