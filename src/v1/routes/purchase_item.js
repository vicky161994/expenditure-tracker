const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { PurchaseItemService } = require("../services");
const router = express.Router();

router.post("/", verifyToken, PurchaseItemService.createPurchaseItem);
router.get("/", verifyToken, PurchaseItemService.getAllPurchaseItem);
router.get("/:itemId", verifyToken, PurchaseItemService.getPurchaseItemById);
router.post("/:itemId", verifyToken, PurchaseItemService.updatePuchaseItem);
router.delete("/:itemId", verifyToken, PurchaseItemService.deletePurchaseItem);

module.exports = router;
