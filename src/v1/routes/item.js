const express = require("express");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();
const { ItemService } = require("../services");

router.post("/", verifyToken, ItemService.createItem);
router.get("/", verifyToken, ItemService.getAllItem);
router.get("/:itemId", verifyToken, ItemService.getItemById);
router.post("/:itemId", verifyToken, ItemService.updateItem);
router.delete("/:itemId", verifyToken, ItemService.deleteItem);

module.exports = router;
